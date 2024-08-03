import config from "../../../config";

export function checkAuth(to, from, next) {
    const role = localStorage.getItem(config.role_name);
    const token = localStorage.getItem(config.token_name);
    if (!token) {
        next('login');
    } else {
        if (role === 'admin' || role === 'teacher') {
            next();
        } else if (role === 'user') {
            next('user-index');
        } else {
            next('login');
        }
    }
}