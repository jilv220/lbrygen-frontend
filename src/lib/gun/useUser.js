/**
 * Basic user management
 * @module useUser
 * */

import { useGun } from "./useGun"

const gun = useGun()
const user = gun.user()

function useUser() {
    return user
}

function _initUser() {
    gun.get(`~${pubKey}`).put({'subscriptions': {}})
}

function isLoggedIn() {
    return user.is !== undefined
}

function userLogOut() {
    user.leave()
}

function userRecall(userStore) {
    user.recall({ sessionStorage }, () => {
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
    userLogOut,
    userRecall
}
