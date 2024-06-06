const smCrypto = require("sm-crypto");

const keyValue = "2c82e0ac0ef94b523c2aa0d14d052c92";

module.exports = {
  // 解密
  decode(textValue) {
    try {
      return smCrypto.sm4.decrypt(textValue, keyValue, { mode: "ecb" });
    } catch {
      return "";
    }
  },
  // 加密
  encode(textValue) {
    return smCrypto.sm4.encrypt(textValue, keyValue, { mode: "ecb" });
  },
};
