import { defineStore } from 'pinia'

interface userModel {
    pub: string
}

const userModel : userModel = {
    pub: ''
}

export const useUserStore = defineStore (
    'user', 
    {
        state: () => ({
            user: userModel
        }),
        getters: {
            getUserPubkey: (state) => state.user.pub
        },
        actions: {
            storeUser(user: userModel) {
                this.user = user
            },
            isUserLoggedIn() : boolean {
                return this.user.pub != ''
            },
            resetUser() {
                this.user.pub = ''
            }
        }
    }
)