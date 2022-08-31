<template>
    <div id="content" class="h-full">
        <div class="flex flex-col justify-center items-center">
            <div class="flex flex-col pt-10 w-1/3 md:w-11/12" id="form-group">

                <label class="label pb-4">
                    <span class="label-text text-xl font-bold">
                        Log in to LBRYgen
                    </span>
                </label>

                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="email" placeholder="some@example.com" v-model="userInfo.email"/>

                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input type="password" v-model="userInfo.password"/>
               
                <button class="btn btn-accent mr-4 mt-2 mb-4 w-full text-white" @click="handleSignin">
                    Log in
                </button>

                <label class="label">
                    <span class="label-text-alt"> 
                        Don't have an account? <router-link :to="{name: 'signup'}">Sign up</router-link>
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useUser, userLogIn } from '@/lib/gun/useUser'
import { useUserStore } from '@/stores/UserStore'

const userInfo = reactive({
    email: "",
    password: "",
})
const router = useRouter()
const userStore = useUserStore()

const user = useUser().recall({sessionStorage: true})
function handleSignin() {
    userLogIn(userInfo.email, userInfo.password, userStore)
    router.push({name: 'home'})
}
</script>

<style lang="scss">
#form-group {

    input {
        @apply input focus:outline-green mb-4 bg-secondary
    }
}
</style>