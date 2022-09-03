<template>
  <div>
    <!-- Navbar -->
    <div id="navbar" class="navbar fixed justify-between shadow z-50 bg-neutral">
      <div class="navbar-start">
        <label for="my-drawer" class="mr-6" id="sidebar-menu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <div id="lbry-logo" class="pr-4 h-6" @click="navigateTo('home')">
          <img class="h-full w-full" alt="Lbry logo" src="./assets/lbry_logo.svg" />
        </div>
      </div>

      <div class="flex justify-between w-1/3">

        <div class="flex-1 md:hidden">
          <SearchBar></SearchBar>
        </div>

        <div class="flex">
          <div id="search-modal-wrapper" class="lg:hidden">
            <SearchModal></SearchModal>
          </div>

          <div class="pr-5 md:pr-4 md:pl-4">
            <FilterModal></FilterModal>
          </div>
        </div>

      </div>

      <div v-if="!userStore.$state.status" class="h-10">
        <label class="label mx-4 p-0 text-green">
          <router-link :to="{name: 'signin'}">Log In</router-link>
        </label>

        <router-link :to="{name: 'signup'}" class="btn btn-accent min-h-0 h-10 mr-2 text-white">
          Sign Up
        </router-link>
      </div>

      <div v-else class="dropdown dropdown-end">

        <div tabindex="0" class="avatar cursor-pointer">
          <div class="rounded-full h-10 w-10">
            <img class="h-full w-full" alt="User avatar" src="./assets/spaceman.png" />
          </div>
        </div>

        <ul tabindex="0" class="menu dropdown-content p-2 shadow bg-neutral rounded-box w-52 mt-4">
          <li>
            <div @click="userLogOut(this.userStore)" class="h-12">
              <span v-html="signOutIcon"></span>
              Sign out
            </div>
          </li>
        </ul>

      </div>
    </div>

    <!-- Drawer -->
    <div class="drawer h-auto">
      <input id="my-drawer" class="drawer-toggle" type="checkbox" />
      <div class="drawer-content overflow-hidden">
        <!-- Page content -->

        <!-- Router -->
        <router-view v-slot="{ Component }">
          <KeepAlive :include="['CategoryView']">
            <component :is="Component" :key="$route.fullPath" />
          </KeepAlive>
        </router-view>

      </div>

      <!-- Drawer Content -->
      <div class="drawer-side h-full">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul id="drawer-sidebar" class="bg-neutral">
          <SideBar></SideBar>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import SideBar from "@/components/SideBar.vue";
import SearchModal from "./components/SearchModal.vue";
import FilterModal from "./components/FilterModal.vue";
import { useUserStore } from '@/stores/UserStore'
import { userLogOut, userRecall } from '@/lib/gun/useUser'
import { signOutIcon } from '@/constants/svgs'

export default {
  name: "App",
  components: {
    SearchBar,
    SearchModal,
    SideBar,
    FilterModal,
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      checked: this.$theme,
      signOutIcon: signOutIcon
    };
  },
  beforeCreate() {
    if (window.localStorage.getItem("theme") == "dark") {
      this.$theme = 1;
      document.documentElement.setAttribute("data-theme", "mydark");
      window.localStorage.setItem("theme", "dark");
    } else if (window.localStorage.getItem("theme") == "light") {
      this.$theme = 0;
      document.documentElement.setAttribute("data-theme", "mylight");
      window.localStorage.setItem("theme", "light");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$theme = 1;
      document.documentElement.setAttribute("data-theme", "mydark");
    }
  },
  mounted() {
    userRecall(this.userStore)
  },
  methods: {
    switchTheme() {
      this.$theme = !this.$theme;
      //console.log(this.$theme);

      if (this.$theme) {
        document.documentElement.setAttribute("data-theme", "mydark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "mylight");
        window.localStorage.setItem("theme", "light");
      }
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    userLogOut
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  --plyr-color-main: #2f9176;

  @apply text-primary;
}

.fancy-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
}

.fancy-spinner div {
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.fancy-spinner div.ring {
  border-width: 0.5rem;
  border-style: solid;
  border-color: transparent;
  box-shadow: none;
  -webkit-animation: 2s fancy infinite alternate;
  animation: 2s fancy infinite alternate;
}

.fancy-spinner div.ring:nth-child(1) {
  border-left-color: #979fd0;
  border-right-color: #979fd0;
}

.fancy-spinner div.ring:nth-child(2) {
  border-top-color: #979fd0;
  border-bottom-color: #979fd0;
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}

.fancy-spinner div.dot {
  width: 1rem;
  height: 1rem;
  background: #979fd0;
}

@-webkit-keyframes fancy {
  to {
    transform: rotate(360deg) scale(0.5);
  }
}

@keyframes fancy {
  to {
    transform: rotate(360deg) scale(0.5);
  }
}

#lbry-logo {
  cursor: pointer;
  width: 112px;
  height: 40px;
}

#sidebar-menu {
  cursor: pointer;
}

#drawer-sidebar {
  @apply 
  menu fixed text-base-content 
  w-72 h-screen pt-4-25 px-2 pb-2 sm:w-56;

  div > li > div {
    @apply active:bg-green h-11
  }
}

/* small screen */
@media (max-width: 890px) {
  .splash-logo {
    padding-top: 180px;
    padding-bottom: 20px;
  }
}

@media (min-width: 890px) {
  .splash-logo {
    max-width: 65%;
    padding: 40px 20px;
  }
}
</style>
