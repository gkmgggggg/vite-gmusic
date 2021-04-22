interface UrlDictType {
  [key: string]: {
    [key: string]: string;
  };
}

const urlDict: UrlDictType = {
  Basic: {
    AuthLogin: 'userDomain/admin/v1/user/login', // 登录
    getBanner: 'api/banner'
  }
}

export default urlDict
