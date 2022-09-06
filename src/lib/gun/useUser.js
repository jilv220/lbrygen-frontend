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

export {
    useUser,
}
