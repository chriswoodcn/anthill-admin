import dayjs from 'dayjs';
import configuration from "../configuration.mjs"
const basePath = configuration.BasePath
import CryptoJS from 'crypto-js';

export const withBasePath = (path: string) => path.startsWith("/") ? `${basePath}${path}` : `${basePath}/${path}`

const KEY_SIZE = 128;
const fillKey = (key: string) => {
  const filledKey = Buffer.alloc(KEY_SIZE / 8);
  const keys = Buffer.from(key);
  if (keys.length < filledKey.length) {
    filledKey.map((b, i) => filledKey[i] = keys[i]);
  }

  return filledKey.toString();
}
const KEY_AES = CryptoJS.enc.Utf8.parse(fillKey(configuration.AppName));
const aes_encrypt = (data: string, key: CryptoJS.lib.WordArray) => {
  /**
   * CipherOption, 加密的一些选项:
   *   mode: 加密模式, 可取值(CBC, CFB, CTR, CTRGladman, OFB, ECB), 都在 CryptoJS.mode 对象下
   *   padding: 填充方式, 可取值(Pkcs7, AnsiX923, Iso10126, Iso97971, ZeroPadding, NoPadding), 都在 CryptoJS.pad 对象下
   *   iv: 偏移量, mode === ECB 时, 不需要 iv
   * 返回的是一个加密对象
   */
  const cipher = CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    iv: undefined,
  });
  // 将加密后的数据转换成 Base64
  const base64Cipher = cipher.ciphertext.toString(CryptoJS.enc.Base64);
  // 处理 Android 某些低版的BUG
  const resultCipher = base64Cipher.replace(/\+/g, '-').replace(/\//g, '_');
  // 返回加密后的经过处理的 Base64
  return resultCipher;
}
const aes_decrypt = (encrypted: string, key: CryptoJS.lib.WordArray) => {
  // 先将 Base64 还原一下, 因为加密的时候做了一些字符的替换
  const restoreBase64 = encrypted.replace(/\-/g, '+').replace(/_/g, '/');
  // 这里 mode, padding, iv 一定要跟加密的时候完全一样
  // 返回的是一个解密后的对象
  const decipher = CryptoJS.AES.decrypt(restoreBase64, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    iv: undefined,
  });
  // 将解密对象转换成 UTF8 的字符串
  const resultDecipher = CryptoJS.enc.Utf8.stringify(decipher);
  // 返回解密结果
  return resultDecipher;
}


export const aesEncrypt = (data: string) => {
  return aes_encrypt(data, KEY_AES)
}
export const aesDecrypt = (encrypted: string) => {
  return aes_decrypt(encrypted, KEY_AES)
}
export const isBrowser = () => typeof window !== "undefined"

export const dictVal2Label = (source: any[], val?: string, defaultLabel: any = '--') => {
  if (!val) return defaultLabel;
  const find = source.find(s => s.value == val)
  return find ? find.label : defaultLabel
}
export const formatDate = (timeStamp: number) => {
  if (!timeStamp) return '--'
  return dayjs(timeStamp).format("YYYY-MM-DD")
}
export const formatDateTime = (timeStamp: number) => {
  if (!timeStamp) return '--'
  return dayjs(timeStamp).format("YYYY-MM-DD hh:mm:ss")
}
