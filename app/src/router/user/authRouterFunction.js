import config from '../../../config';

export const checkAuth = (to, from, next) => {
  const token = localStorage.getItem(config.token_name);
  if (!token) {
    next('/login');
  } else {
    next();
  }
};