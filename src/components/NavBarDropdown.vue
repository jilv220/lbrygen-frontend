<script setup lang="ts">
import disconnectWallet from '@/lib/walletConnect/connect/disconnectWallet';

import { userLogOut } from '@/lib/gun/useUser'
import { useUserStore } from '@/stores/UserStore'
import { signOutIcon } from '@/constants/svgs'

const userStore = useUserStore()

const disconnectUser = async () => {
    await disconnectWallet()
    userLogOut(userStore)
};

</script>

<template>
    <div class="dropdown dropdown-end">
        <div tabindex="0" class="avatar cursor-pointer">
          <div class="rounded-full h-10 w-10">
            <img class="h-full w-full" alt="User avatar" src="../assets/spaceman.png" />
          </div>
        </div>

        <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4">
          <li>
            <div @click="disconnectUser()" class="h-12">
              <span v-html="signOutIcon"></span>
              Disconnect
            </div>
          </li>
        </ul>
    </div>
</template>