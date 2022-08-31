<template>
    <div id="content" class="h-full">
        <div class="flex flex-col justify-center items-center">
            <div class="flex flex-col pt-10 w-1/3 md:w-11/12" id="form-group">

                <label class="label pb-4">
                    <span class="label-text text-xl font-bold">Join</span>
                </label>

                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="email" placeholder="some@example.com" v-model="newUser.email"/>

                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input type="password" v-model="newUser.password"/>
               
                <button class="btn btn-accent mr-4 mt-2 mb-4 w-full text-white" @click="handleSignup">Sign Up</button>

                <label class="label">
                    <span class="label-text-alt"> 
                        Already have an account? <router-link :to="{name: 'signin'}">Log In</router-link>
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { gun } from '@/lib/gun/useGun'
import { useUserStore } from '@/stores/UserStore'

const newUser = reactive({
    email: "",
    password: "",
})
const router = useRouter()
const userStore = useUserStore()
const user = gun.user().recall({sessionStorage: true})

function handleSignup() {

    // Need to enforce user uniqueness since gun won't handle it
    gun.get(`~@${newUser.email}`).once((data: any) => {

        if (data !== undefined) {
            // if user exist, route to sign in page
            router.push({name: 'signin'})
        } else {
            user.create(newUser.email, newUser.password, (status: any) => {
                
                userStore.storeUser({pub: status.pub })
                router.push({name: "home"})
            })
        }

    })
}
</script>

<style lang="scss">
#form-group {

    input {
        @apply input focus:outline-green mb-4 bg-secondary
    }
}
</style>