import { reactive } from "vue"

const defaultState = {
    userpair: {
        pub: '',
        epub: '',
        priv: '',
        epriv: ''
    },
    status: false,
    actions: {
        isUserLoggedIn: isUserLoggedIn,
        getUserPubkey: getUserPubkey,
        resetState: resetState
    }
}

const userState = reactive({...defaultState})

function isUserLoggedIn() {
    return userState.status
}

function getUserPubkey() {
    return userState.userpair
}

function resetState() {
    Object.assign(userState, defaultState)
}

export default userState