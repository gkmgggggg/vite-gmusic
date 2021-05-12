interface UrlDictType {
  [key: string]: {
    [key: string]: string;
  };
}

const urlDict: UrlDictType = {
  Basic: {
    getBanner: '/banner', // 获取轮播图数据
    search: '/search'
  },
  User: {
    authLogin: '/user/login',
    authRegister: '/user/register',
    getUserInfo: '/user/info',
    getUserSong: '/user/collectSong',
    getUserPlaylist: '/user/collectPlaylist',
    collectSong: '/user/collect/song',
    collectPlaylist: '/user/collect/playlist',
    deleteSong: '/user/delete/song',
    deletePlaylist: '/user/delete/playlist',
    postComment: '/user/postComment',
    postPlaylist: '/user/postPlaylist'
  },
  Singer: {
    getSinger: '/singer/list',
    getSingerDetail: '/singer/detail',
    getRecommendSinger: '/singer/recommend', // 获取首页推荐歌手
    getSingerSong: '/singer/song',
    getSingerAlbum: '/singer/album'
  },
  Playlist: {
    getPlayList: '/playlist',
    getPlaylistDetail: '/playlist/detail',
    getSongDetail: '',
    getRecommendPlaylist: '/playlist/recommend', // 获取首页推荐歌单
    getRank: '/playlist/rank',
    getTag: '/playlist/tag',
    getComment: '/playlist/comment',
    addSong: '/playlist/addSong',
    getCreatePlaylist: '/playlist/created'
  },
  Song: {
    getRecommendSong: '/song/recommend', // 获取首页推荐歌曲
    getSongDetail: '/song/detail'
  }
}

export default urlDict
