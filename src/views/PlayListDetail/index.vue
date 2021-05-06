<template>
  <div class="playlist-detail container">
    <div class="left shadow">
      <div class="top">
        <div class="avatar">
          <img :src="detail.coverImgUrl + '?param=200y200'" alt="" />
        </div>
        <div class="info">
          <div class="title flex-between">
            <span>{{ detail.name }}</span>
            <div></div>
          </div>
          <!-- <div class="user flex-row">
            <div class="avatar" @click="toUser(creator.userId)">
              <img :src="state.creator.avatarUrl + '?param=100y100'" alt="" />
            </div>
            <p class="nickname" @click="toUser(creator.userId)">
              {{ state.creator.nickname }}
            </p>
            <p class="createTime" v-if="state.detail.createTime">
              {{ utils.dateFormat(state.detail.createTime, "YYYY-MM-DD") }}创建
            </p>
          </div> -->
          <div
            class="tag flex-row"
            v-if="detail.tags && detail.tags.length > 0"
          >
            标签：<a
              v-for="item of detail.tags"
              :key="item"
              @click="tag(item)"
              >{{ item }}</a
            >
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span
              @click="openDesc(detail.name, detail.description)"
              class="flex-row"
              v-if="txtLength(detail.description) > 50"
              >全部<i
                class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"
              ></i
            ></span>
          </div>
        </div>
      </div>
      <div class="content">
        <ArtistList :songs="songs" :isPerson="false" />
      </div>
    </div>
    <div class="right">
      <div class="like module shadow">
        <div class="card-header flex-row">
          <span>喜欢这个歌单的人</span>
        </div>
        <ul v-if="subscribers.length > 0">
          <li v-for="item of subscribers" :key="item.userId">
            <div class="avatar" @click="toUser(item.userId)">
              <img
                :src="item.coverImgUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px">
          还没有人喜欢
        </p>
      </div>
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li
            v-for="item of relatedList"
            :key="item.id"
            @click="toDetail(item.id)"
          >
            <div class="avatar">
              <img
                :src="item.coverImgUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
            <div class="info">
              <h2 class="ellipsis" :title="item.name">{{ item.name }}</h2>
              <p class="small">By. {{ item.creator.nickname }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment module shadow">
        <div class="card-header flex-row">
          <span>发表评论</span>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
          v-model="comment"
        >
        </el-input>
        <el-button
          type="danger"
          plain
          size="mini"
          style="margin-top: 5px"
          @click="submitComment(this.$router.query.id)"
          >提交评论</el-button
        >
        <!-- <button class="submit_btn">提交评论</button> -->
      </div>
      <div class="comment module shadow">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul v-if="comments.length > 0">
          <li class="item" v-for="item of comments" :key="item.time">
            <!-- <div class="avatar" @click="toUser(item.user.userId)">
              <img
                :src="item.user.avatarUrl + '?param=150y150'"
                :alt="item.user.nickname"
                :title="item.user.nickname"
              />
            </div> -->
            <div class="info">
              <h2 @click="toUser(item.user.userId)">
                {{ item.user.nickname
                }}<small> · {{ utils.formatMsgTime(item.time) }}</small>
              </h2>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px">
          还没有人评论
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, toRefs } from 'vue'
import utils from '@/utils/utils'
import ArtistList from '@/components/ArtistList/index.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    ArtistList
  },
  computed: {
    txtLength () {
      return function (txt:string) {
        if (txt) {
          return txt.length
        }
      }
    }
  },
  // 这个地方要改
  // watch: {
  //   $route (newId) {
  //     if (newId.name === 'playlistdetail') {
  //       const id = this.$route.query.id || this.singer.id
  //       if (id) {
  //         this.initialize(id)
  //       }
  //     }
  //   }
  // },
  mounted () {
    const id = this.$route.query.id
    this.artistId = id as string
    if (id) {
      this.initialize(id as string)
    }
  },
  setup () {
    const textarea2 = ref('')
    const state = reactive({
      // 歌单详情
      detail: {},
      // 歌单创建者信息
      creator: {},
      // 收藏这个歌单的人
      subscribers: [],
      // 相关歌单
      relatedList: [],
      // 相似歌单
      simiList: [],
      // 评论
      comments: [],
      // 歌曲列表
      songs: [],
      // 收藏这个歌单的人数量
      comment: '',
      s: 32,
      artistId: '',
      loading: false
    })
    const store = useStore()
    const router = useRouter()
    const loginStatu = computed(() => store.getters.loginStatu)
    const userInfo = computed(() => store.getters.userInfo)
    // 标签跳转
    function tag (cat:string) {
      router.push({
        name: 'playlist',
        query: {
          cat
        }
      })
    }
    // 获取歌单详情
    async function getPlayListDetail (id:string) {
      // const res = await ctx.$api.getPlayListDetail(id)
      // if (res.res.description !== null) {
      //   res.res.description = res.res.description.replace(
      //     /(\r\n|\n|\r)/gm,
      //     '<br />'
      //   )
      // }
      // state.detail = res.res
      // const str = res.res.songList.join(',')
      // const result = await ctx.$api.getSonglist(str)
      // state.songs = result.res
    }
    // 获取相关歌单推荐
    async function getRelatedPlaylist (id:string) {
      // const res = await ctx.$api.getRelatedPlaylist(id)
      // if (res.code === 200) {
      //   state.relatedList = res.playlists
      // }
    }
    // 获取歌单收藏者
    async function getSubscribersPlaylist (id:string) {
      // const params = {
      //   id,
      //   limit: 28,
      //   offset: 0
      // }
      // const res = await ctx.$api.getSubscribersPlaylist(params)
      // if (res.code === 200) {
      //   state.subscribers = res.subscribers
      // }
    }
    // 获取评论
    async function getCommentPlaylist (id:string) {
      // const params = {
      //   id,
      //   limit: 28,
      //   offset: 0
      // }
      // const res = await ctx.$api.getCommentPlaylist(params)
      // if (res.code === 200) {
      //   if (res.hotComments.length > 0) {
      //     state.comments = res.hotComments
      //   } else {
      //     state.comments = res.comments
      //   }
      // }
    }
    // 打开歌单介绍详情
    function openDesc (title:string, content:string) {
      console.log(title, content)
    }
    // 相关推荐详情
    function toDetail (id:string) {
      router.push({
        name: 'playlistdetail',
        query: {
          id
        }
      })
    }
    // 歌手详情
    function toUser (id:string) {
      console.log(id)
      // this.$router.push({
      //   name: "personal",
      //   query: {
      //     id,
      //   },
      // });
    }
    // 初始化
    function initialize (id:string) {
      getPlayListDetail(id)
      // getRelatedPlaylist(id);
      // getSubscribersPlaylist(id);
      // getCommentPlaylist(id);
    }

    function submitComment (id:string) {
      console.log(userInfo)
      console.log(id)
      console.log(state.comment)
    }
    return {
      ...toRefs(state),
      utils,
      tag,
      getPlayListDetail,
      getSubscribersPlaylist,
      getCommentPlaylist,
      openDesc,
      toDetail,
      toUser,
      initialize,
      getRelatedPlaylist,
      loginStatu,
      userInfo,
      submitComment,
      textarea2
    }
  }
})
</script>

<style lang="scss" scoped>
$color-theme: #fa2800;
.playlist-detail {
  display: flex;
  align-items: flex-start;

  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;

    .top {
      display: flex;

      > .avatar {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;

        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }

        &::before {
          content: "";
          width: 95%;
          height: 95%;
          background: rgba(0, 0, 0, 0.2);
          display: block;
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 0;
          border-radius: 8px;
        }
      }

      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title {
          width: 100%;
          font-size: 24px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
          margin-top: 10px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        .tag {
          // margin-top: 15px;
          // margin-bottom: 15px;
          a {
            color: #fff;
            background: $color-theme;
            margin-right: 15px;
            font-size: 12px;
            cursor: pointer;
            padding: 4px 12px;
            border-radius: 15px;

            // &::after {
            //   // content: '，'
            // }

            &:last-child {
              &::after {
                content: "";
              }
            }
          }
        }

        .user {
          margin-bottom: 15px;

          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            margin-right: 15px;
            cursor: pointer;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              position: relative;
            }
          }

          .nickname {
            font-size: 14px;
            margin-right: 30px;
            cursor: pointer;

            &:hover {
              color: $color-theme;
            }
          }

          .createTime {
            font-size: 14px;
            color: #808080;
          }
        }

        .desc {
          display: flex;
          flex-direction: column;
          line-height: 1.6;
          margin-top: 15px;

          span {
            width: fit-content;
            flex-shrink: 0;
            color: $color-theme;
            cursor: pointer;
          }

          p {
            line-height: 1.6;
            font-weight: 400;
            flex: 1;
            font-size: 14px;
          }
        }
      }
    }

    .content {
      margin-top: 20px;
    }
  }

  .right {
    width: 350px;
    flex-shrink: 0;

    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .like {
      padding-bottom: 5px;

      ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;

        li {
          flex: 0 0 14.285714285714%;
          max-width: 14.285714285714%;
          padding: 0 5px 10px;

          .avatar {
            width: 100%;
            border-radius: 3px;

            img {
              width: 100%;
              border-radius: 3px;
            }
          }
        }
      }
    }

    .related {
      padding-bottom: 5px;

      ul {
        li {
          display: flex;
          margin-bottom: 15px;
          cursor: pointer;

          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 3px;
            margin-right: 15px;
            flex-shrink: 0;

            img {
              width: 100%;
              border-radius: 3px;
            }
          }

          .info {
            height: 50px;
            width: calc(100% - 60px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            .small {
              text-align: left;
              font-size: 5px;
              text-align: left;
              font-size: 12px;
              color: #a5a5c1;
              font-weight: 200;
            }
            h2 {
              font-weight: bold;
              text-align: left;
              font-size: 14px;
              margin-bottom: 10px;
              width: 100%;
            }

            span {
              font-size: 12px;
              color: #a5a5c1;
            }

            &:hover {
              h2 {
                color: $color-theme;
              }
            }
          }
        }
      }
    }

    .comment {
      ul {
        li {
          padding: 10px 0;
          width: 100%;
          display: flex;

          .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            cursor: pointer;

            img {
              width: 100%;
              border-radius: 50%;
            }
          }

          .info {
            flex: 1;
            h2 {
              text-align: left;
              font-size: 15px;
              margin-right: 5px;
              margin-bottom: 10px;
              cursor: pointer;

              small {
                text-align: left;
                font-size: 5px;
                text-align: left;
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }

            p {
              // border: 1px solid red;
              text-align: left;
              width: 100%;
              font-size: 12px;
              color: #666666;
              line-height: 1.6;
              padding: 5px 10px;
              background: #f5f5f5;
              margin-top: 5px;
              border-radius: 3px;
            }
          }
        }
      }
    }

    .card-header {
      border-left: 3px solid $color-theme;
      height: 20px;
      padding-left: 1rem;
      margin-bottom: 15px;
      font-weight: bold;

      .icon-like {
        font-size: 20px;
      }
    }
  }
}
</style>
