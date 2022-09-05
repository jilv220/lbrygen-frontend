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

function userCreate(alias, password, userStore) {
    user.create(alias, password, (status) => {

        if (status.pub) {
            userLogIn(alias, password, userStore)
        }
    })
}

function isUserLoggedIn() {
    return user.is !== undefined
}

function userLogIn(alias, password, userStore) {
    user.auth(alias, password, (status)=> {
        if (status.err) {
            logger.log('login failed')
        } else {
            const userPair = status.sea
            userStore.$patch({
                pair: userPair,
                status: true
            })
            localStorage.setItem('userPair', JSON.stringify(userPair))
        }
    })
}

function userLogOut(userStore) {
    user.leave()
    userStore.$reset()
    localStorage.removeItem('userPair')
}

function userRecall(userStore) {

    const pair = JSON.parse(localStorage.getItem('userPair'))
    logger.log(pair)

    if(!pair) { return }

    user.auth(pair, (status) => {
        if (status.err) {
            logger.log('login failed')
        } else {
            const userPair = status.sea
            userStore.$patch({
                pair: userPair,
                status: true
            })
        }
    })
}

export {
    useUser,
    userCreate,
    isUserLoggedIn,
    userLogIn,
    userLogOut,
    userRecall,
}
