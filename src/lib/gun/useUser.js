/**
 * Basic user management
 * @module useUser
 * */

import { useGun } from "./useGun"
import Logger from "@/utils/Logger"

const gun = useGun()
const user = gun.user()
const logger = new Logger('useGun')

function useUser() {
    return user
}

function _initUser() {
    gun.get(`~${pubKey}`).put({'subscriptions': {}})
}

function isLoggedIn() {
    return user.is !== undefined
}

function userLogIn(alias, password, userStore) {
    user.auth(alias, password, (status)=> {
        if (status.err) {
            logger.log('login failed')
        } else {
            const userPair = status.sea
            userStore.storeUser({pub: status.put.pub })
            localStorage.setItem('userPair', JSON.stringify(userPair))
        }
    })
}

function userLogOut() {
    user.leave()
    localStorage.removeItem('userPair')
}

function userRecall(userStore) {

    const pair = JSON.parse(localStorage.getItem('userPair'))
    logger.log(pair)
    user.auth(pair, () => {
        let currUser
        if (user.is?.pub) {
          currUser = { pub: user.is.pub }
          userStore.storeUser(currUser)
        }
    })
}

function channelSubscribe() {
    
}

export {
    useUser,
    isLoggedIn,
    userLogIn,
    userLogOut,
    userRecall
}
