import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '账户',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: '登录',
        path: 'login',
      },
      {
        name: '注册',
        path: 'register',
      },
      {
        name: '注册结果',
        path: 'register-result',
      },
    ],
  },
  {
    name: '考试',
    icon: 'dashboard',
    path: 'exam',
    authority: 'user',
  },
];

function replaceParams(path, params) {
  let newPath = path;
  const keys = Object.keys(params)
  if (keys.length) {
    keys.forEach(key => {
      if (path.includes(`:${key}`)) {
        newPath = newPath.replace(`:${key}`, params[key]);
      }
    })
  }
  return newPath;
}

function formatter(data, parentPath = '/', parentAuthority, params = {}) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    path = replaceParams(path, params);
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority, params);
    }
    return result;
  });
}

export const getMenuData = (params) => formatter(menuData, '/', null, params);
