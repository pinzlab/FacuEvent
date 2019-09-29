import Crypto from 'crypto-js'

export default {
    encrypt: function (key: string, msg: string) {
        var encrypted = Crypto.AES.encrypt(msg, key);
        return encrypted
    },

    decrypt: function (key: string, encrypted: any) {
        var bytes = Crypto.AES.decrypt(encrypted, key);
        var unencrypted = bytes.toString(Crypto.enc.Utf8);
        return unencrypted;
    }
}