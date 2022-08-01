export default class PlatformUtils {

    _os: string = ''
    _mobileOS: string[] = ['iOS', 'Android']

    getOS() : string {
        const userAgent = window.navigator.userAgent,
            platform = window.navigator?.userAgentData?.platform ?? window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod']
    
        if (macosPlatforms.indexOf(platform) !== -1) {
            this._os = 'Mac OS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            this._os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            this._os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            this._os = 'Android';
        } else if (!this._os && /Linux/.test(platform)) {
            this._os = 'Linux';
        }
    
        return this._os;
    }

    isMobilePlatform() : boolean {
        const os = this.getOS()
        const res = this._mobileOS.includes(os)
        
        return res 
    }
}