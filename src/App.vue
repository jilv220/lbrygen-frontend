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

      <div class="flex justify-between w-2/5">

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

          <div>
            <RelayModal></RelayModal>
          </div>
        </div>

      </div>

      <div v-if="!userStore.isUserLoggedIn()" class="h-10">
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
            <div @click="logout()">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                clip-rule="evenodd" />
              </svg>
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
          <SideBarItemList></SideBarItemList>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import SideBarItemList from "@/components/SideBarItemList.vue";
import SearchModal from "./components/SearchModal.vue";
import FilterModal from "./components/FilterModal.vue";
import RelayModal from "./components/RelayModal.vue";
import { useUserStore } from '@/stores/UserStore'
import { userLogOut, isLoggedIn, userRecall } from '@/lib/gun/useUser'

export default {
  name: "App",
  components: {
    SearchBar,
    SearchModal,
    SideBarItemList,
    FilterModal,
    RelayModal,
},
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      checked: this.$theme,
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
    logout() {
      userLogOut()
      if (!isLoggedIn()) {
        this.userStore.resetUser()
      }
    }
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
