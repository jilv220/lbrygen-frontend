import { defineStore } from 'pinia'
import { IUserPair } from '@/constants/interfaces'

interface userModel {
    pair?: IUserPair
    status: boolean
}

const userState : userModel = {
    pair: undefined,
    status: false
}

export const useUserStore = defineStore (
    'user', 
    {
        state: () => {
            return {...userState}
        },
        actions: {
            storeUser(user: userModel) {
                this.$state = user
            },
            isUserLoggedIn() {
                return this.$state.status
            }
        }
    }
)