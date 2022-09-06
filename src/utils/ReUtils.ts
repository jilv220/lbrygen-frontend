import { buffer } from "rxjs";

export function linkify (str : string) {
    /* eslint-disable no-useless-escape */
    const re = /(?![^<]*>|[^<>]*<\/)((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi
    const res = str.replace(re, '<a href="$1" target="_blank">$1</a>')

    return res
}

/**
 * From Iris-messenger [https://github.com/irislib/iris-messenger/blob/master/src/js/Session.js]
 */
export const isHex = (maybeHex) =>
maybeHex.length !== 0 && maybeHex.length % 2 === 0 && !/[^a-fA-F0-9]/u.test(maybeHex);

export const hexToUint8Array = (hexString) => {
    if (!isHex(hexString)) {
      throw new Error('Not a hex string');
    }
    return Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}

export function arrayToBase64Url(array) {
  return btoa(String.fromCharCode.apply(null, array)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}