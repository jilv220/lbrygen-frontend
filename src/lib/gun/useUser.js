/**
 * Basic user management
 * @module useUser
 * */

import { useGun } from "./useGun";

const gun = useGun()
const user = gun.user()

function useUser() {
    return user
}

function isLoggedIn() {
    return user.is !== undefined
}

function userLogOut() {
    user.leave()
}

export {
    useUser,
    isLoggedIn,
    userLogOut
}
