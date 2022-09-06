<script setup lang="ts">
import Session from '@/services/Session'
import { signOutIcon } from '@/constants/svgs'

const disconnectUser = async () => {
    await Session.logout()
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