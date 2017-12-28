const host = 'http://10.213.59.25:10020';
//const host = 'http://127.0.0.1:10020';
const supportLocalStorage = window.Storage && window.localStorage && window.localStorage instanceof Storage;

var uid = '';
var env = supportLocalStorage ? (localStorage.getItem("env") === 'uat' ? 'uat' : 'sit') : 'sit';
var apiEnv = {
    'sit': 'http://api.sit.ffan.com',
    'uat': 'http://api.uat.ffan.com'
};
var h5Env = {
    'sit': 'http://h5.sit.ffan.com',
    'uat': 'http://h5.uat.ffan.com'
};

export default {
    host,
    uid,
    supportLocalStorage,
    env,
    apiEnv,
    h5Env
};