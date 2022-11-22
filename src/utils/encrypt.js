const CryptoJS = require('crypto-js');
const { PASS_KEY } = require('../config');

module.exports = {
  encrypt: (password) => CryptoJS.AES.encrypt(password, PASS_KEY).toString(),
  decrypt: (password) => CryptoJS.AES.decrypt(password, PASS_KEY).toString(CryptoJS.enc.Utf8),
};
