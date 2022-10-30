import Plyr from 'plyr'
import PlatformUtils from "@/utils/PlatformUtils"
import { isProduction } from '@/constants/env'
import { Observable, fromEvent, Subscription } from 'rxjs';

const _platformUtils = new PlatformUtils()
const _isFakeMobile = isProduction ? false : true

function initPlyr(): Plyr {
    const config = {
        debug: true,
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

    (player as any).eventListeners!.forEach( 
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

let tooltipSubscription: Subscription
let clickSubscription: Subscription
function _bindNewDblClickListeners(player: Plyr, 
    selector: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | string 
) {
    const plyrWrapper = queryPlyrWrapper()
    const plyrWidth = queryPlyrWidth(selector)
    const plyrHeight = queryPlyrHeight(selector)

    if (plyrWrapper && plyrWidth && plyrHeight) {

        const rewindThres = 0.3 * plyrWidth
        const forwardThres = 0.7 * plyrWidth
        plyrWrapper.addEventListener('dblclick', (e) => {

            const pointerEvent = e as PointerEvent
            const offsetX = pointerEvent.offsetX

            if (forwardThres < offsetX) {
                player.forward(10)
            } else if (offsetX < rewindThres) {
                player.rewind(10)
            }
        })

        const topThres = 0.3 * plyrHeight
        const bottomThres = 0.7 * plyrHeight

        const tooltipListener = addTooltipListener()
        const clickListener = fromEvent(plyrWrapper, 'click')

        let isPlyrTooltipShown: any
        tooltipSubscription = tooltipListener.subscribe(value => {
            isPlyrTooltipShown = value
        })

        clickSubscription = clickListener.subscribe((e) => {
            const pointerEvent = e as PointerEvent
            const offsetX = pointerEvent.offsetX
            const offsetY = pointerEvent.offsetY

            const isXInRange = (offsetX >= rewindThres && offsetX <= forwardThres)
            const isYInRange = (offsetY >= topThres && offsetY <= bottomThres)
            // console.log(`offsetY: ${offsetY}, topThres: ${topThres}. bottomThres: ${bottomThres}`)

            if (isXInRange
                && isYInRange
                && isPlyrTooltipShown) {

                console.log(isPlyrTooltipShown)
                player.togglePlay()
            }
        })
    }
}

function destroy() {
    tooltipSubscription?.unsubscribe()
    clickSubscription?.unsubscribe()
}

function addTooltipListener() {
    return new Observable(
        function subscribe (subscriber) {
            const id = setInterval(() => {
                subscriber.next(isPlyrTooltipShown())
            }, 750)
            return function unsubscribe() {
                clearInterval(id)
            }
        }
    )
}

function queryPlyrWidth(selector: 
    keyof HTMLElementTagNameMap | 
    keyof SVGElementTagNameMap  |
    string 
) {
    const plyrWidth = document.querySelector(selector)?.getBoundingClientRect().width
    return plyrWidth
}

function queryPlyrHeight(selector: 
    keyof HTMLElementTagNameMap | 
    keyof SVGElementTagNameMap  |
    string 
) {
    const plyrHeight = document.querySelector(selector)?.getBoundingClientRect().height
    return plyrHeight
}

function queryPlyrWrapper() : HTMLElement{
    const plyrWrapper = document.querySelector('.plyr__video-wrapper')
    return plyrWrapper as HTMLElement
}

function isPlyrTooltipShown() {
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
    destroy,
    plyrEnableDblClickSeek,
}