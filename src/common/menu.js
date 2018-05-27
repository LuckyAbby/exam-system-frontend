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
    name: '考试配置管理',
    icon: 'dashboard',
    path: 'exam',
    authority: 'admin',
    children: [
      {
        name: '考试配置信息',
        path: ':id/config',
      },
    ],
  },
  {
    name: '试题管理',
    icon: 'question-circle-o',
    path: 'exam/:id/question',
    authority: 'admin',
    children: [
      {
        name: '试题列表',
        path: 'list',
      },
      {
        name: '添加试题',
        path: 'add',
      },
      {
        name: '编辑试题',
        path: 'edit/:question_id',
      },
    ],
  },
  {
    name: '试卷管理',
    icon: 'file-text',
    path: 'exam/:id/paper',
    authority: 'admin',
    children: [
      {
        name: '试卷列表',
        path: 'list',
      },
      {
        name: '添加试卷',
        path: 'add',
      },
    ],
  },
  {
    name: '考生管理',
    icon: 'team',
    path: 'exam/:id/examinee',
    authority: 'admin',
    children: [
      {
        name: '考生列表',
        path: 'list',
      },
    ],
  },
  {
    name: '阅卷管理',
    icon: 'team',
    path: 'exam/:id/checkPaper',
    authority: 'admin',
    children: [
      {
        name: '试卷列表',
        path: 'list',
      },
    ],
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
