export const API_PROD = 'https://lbrygen.xyz/api'
export const API_BASE = 'https://lbrygen.xyz/'
export const STREAM_IP = 'http://127.0.0.1:5280/'

export const THUMBNAIL_OPTIMIZE = 'https://thumbnails.odycdn.com/optimize/s:390:220/quality:85/plain/'
export const AVATAR_OPTIMIZE = 'https://thumbnails.odycdn.com/optimize/s:100:0/quality:85/plain/'

export const IS_DEV = process.env.NODE_ENV !== 'production'
export const isProduction = process.env.NODE_ENV === 'production'

export const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg']
export const AUDIO_TYPES = ['audio/mp3', 'audio/wav', 'audio/ogg']