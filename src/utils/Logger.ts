/* eslint-disable no-console */

import {isProduction} from '@/constants/env'

export default class Logger {

    _context: string
    _isTrace: boolean
    
    constructor(context: string, isTrace: boolean = false) {
        this._context = `[${context}] :`
        this._isTrace = isTrace
    }

    _objPrettyPrint(message: any) : string {
        return JSON.stringify(message, null, 2)
    }

    log (message: any) {
        if (!isProduction) console.log(`${this._context}`, this._objPrettyPrint(message))
        if (this._isTrace) console.trace()
    }
    
    error (err : any) {
        if (!isProduction) console.error(`${this._context}`, this._objPrettyPrint(err))
        if (this._isTrace) console.trace()
    }
}
