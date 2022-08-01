export function linkify (str : string) {
    /* eslint-disable no-useless-escape */
    const re = /(?![^<]*>|[^<>]*<\/)((https?:)\/\/[a-z0-9&#=.\/\-?_]+)/gi
    const res = str.replace(re, '<a href="$1" target="_blank">$1</a>')

    return res
}