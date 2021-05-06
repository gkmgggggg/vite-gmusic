interface UrlDictType {
  [key: string]: {
    [key: string]: string;
  };
}

const urlDict: UrlDictType = {
  Basic: {
    getBanner: '/banner' // 获取轮播图数据
    // getTag: '/tag' // 获取
  },
  User: {
    authLogin: '/login',
    authRegister: '/register',
    getUserInfo: '/user',
    getUserSong: '/user/collectSong',
    getUserPlaylist: '/user/collectPlaylist'
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
    getTag: '/playlist/tag'
  },
  Song: {
    getRecommendSong: '/song/recommend', // 获取首页推荐歌曲
    getSongDetail: '/song/detail'
  }
}

export default urlDict
