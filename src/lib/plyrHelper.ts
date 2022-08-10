import Plyr from 'plyr'
import PlatformUtils from "@/utils/PlatformUtils"

const _platformUtils = new PlatformUtils()
const _isFakeMobile = true

function initPlyr(): Plyr {
    const config = {
        debug: false,
        keyboard: {
            global: true
        },
        tooltips: {
            controls: true,
            seek: true
        },
        fullscreen: {
            enabled: true,
            fallback: true
        },
        clickToPlay: !_platformUtils.isMobilePlatform(_isFakeMobile),
        autoplay: true,
        ratio: '16:9',
        disableContextMenu: false,
        invertTime: false
    }

    return new Plyr('#player', config)
}

function _removeDblClickListeners(player: Plyr) {

    /** 
     * Remove EventListeners from Plyr 
     * Have to cast as any due to missing type for eventListeners
    */

    (player as any).eventListeners.forEach( 
        function(eventListener: any) {
            if(eventListener.type === 'dblclick') {
                eventListener.element
                    .removeEventListener(
                        eventListener.type, 
                        eventListener.callback, 
                        eventListener.options);
            }
        }
    )
}

function _bindNewDblClickListeners(player: Plyr, 
    selector: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | string 
) {
    const plyrWrapper = queryPlyrWrapper()
    const plyrWidth = queryPlyrWidth(selector)

    if (plyrWrapper && plyrWidth) {

        const forwardThres = 0.7 * plyrWidth
        const rewindThres = 0.3 * plyrWidth
        plyrWrapper.addEventListener('dblclick', (e) => {

            const offsetX = (e as MouseEvent).offsetX

            if (forwardThres < offsetX) {
                player.forward(10)
            } else if (offsetX < rewindThres) {
                player.rewind(10)
            }
        })

        plyrWrapper.addEventListener('click', (e) => {

            const offsetX = (e as MouseEvent).offsetX

            if (offsetX >= rewindThres
            && offsetX <= forwardThres
            && isPlyrTooltipsShown()) {
                player.togglePlay()
            }
        })
    }
}

function queryPlyrWidth(selector: 
    keyof HTMLElementTagNameMap | 
    keyof SVGElementTagNameMap  |
    string 
) {
    const plyrWidth = document.querySelector(selector)?.getBoundingClientRect().width
    return plyrWidth
}

function queryPlyrWrapper() {
    const plyrWrapper = document.querySelector('.plyr__video-wrapper')
    return plyrWrapper
}

function isPlyrTooltipsShown() {
    // if null => Tooltips are shown
    return !document.querySelector('.plyr--hide-controls')
}

function plyrEnableDblClickSeek(player: Plyr, 
    selector: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | string 
) {
    if (_platformUtils.isMobilePlatform(_isFakeMobile)) {
        _removeDblClickListeners(player)
        _bindNewDblClickListeners(player, selector)
    }
}

// Need to wrap export default in an object to do function exports !!
export default {
    initPlyr,
    plyrEnableDblClickSeek,
}