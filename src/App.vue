<template>
  <div>
    <!-- drawer -->
    <div class="drawer h-auto">
      <input id="my-drawer" class="drawer-toggle" type="checkbox" />
      <div class="drawer-content overflow-hidden">
        <!-- Page content here -->
        <div id="navbar" class="navbar fixed shadow z-50">
          <div class="navbar-start">
            <label for="my-drawer" class="mr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>

          <div class="flex-1">
            <div class="pr-4 h-6">
              <img
                class="lbry-logo"
                alt="Lbry logo"
                src="./assets/lbry_logo.svg"
              />
            </div>

            <div class="flex-1 md:hidden">
              <SearchBar></SearchBar>
            </div>
            <div id="search-modal-wrapper" class="lg:hidden">
              <SearchModal></SearchModal>
            </div>

            <div class="pr-6 md:pr-10 md:pl-4">
              <FilterModal></FilterModal>
            </div>
          </div>

          <div class="navbar-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              />
            </svg>
            <input
              type="checkbox"
              class="toggle mx-3"
              @click="switchTheme()"
              v-model="this.checked"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 
                  0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0
                  4 4 0 018 0zm-.464 4.95l.707.707a1 
                  1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 
                  1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 
                  0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 
                  11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 
                  1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 
                  0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 
                  8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 
                  0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- Router -->
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.fullPath" />
          </keep-alive>
        </router-view>
      </div>

      <!-- Drawer Content -->
      <div class="drawer-side h-screen">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul
          id="drawer-sidebar"
          class="menu p-4 overflow-y-auto w-80 text-base-content sm:w-56"
        >
          <!-- Sidebar content here -->
          <SideBarItem link="home">
            <template v-slot:item-icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </template>
            <template v-slot:item-label>Home</template>
          </SideBarItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "@/components/SearchBar.vue";
import SideBarItem from "@/components/base/SideBarItem.vue";
import SearchModal from "./components/SearchModal.vue";
import FilterModal from "./components/FilterModal.vue";

export default {
  name: "App",
  components: {
    SearchBar,
    SearchModal,
    SideBarItem,
    FilterModal,
  },
  data() {
    return {
      checked: this.$theme,
      intervalId: 0,
      isLbryReady: false,
    };
  },
  beforeCreate() {
    if (window.localStorage.getItem("theme") == "dark") {
      this.$theme = 1;
      document.documentElement.setAttribute("data-theme", "dark");
      window.localStorage.setItem("theme", "dark");
    } else if (window.localStorage.getItem("theme") == "light") {
      this.$theme = 0;
      document.documentElement.setAttribute("data-theme", "light");
      window.localStorage.setItem("theme", "light");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      this.$theme = 1;
      document.documentElement.setAttribute("data-theme", "dark");
    }
  },
  methods: {
    switchTheme() {
      this.$theme = !this.$theme;
      //console.log(this.$theme);

      if (this.$theme) {
        document.documentElement.setAttribute("data-theme", "dark");
        window.localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        window.localStorage.setItem("theme", "light");
      }
    },
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  @apply text-black;
  @apply bg-white;
}

[data-theme="dark"] #app {
  @apply text-white;
  @apply bg-black;
}

#navbar,
#drawer-sidebar,
#filter-area {
  @apply bg-white;
}

[data-theme="dark"] #navbar,
[data-theme="dark"] #drawer-sidebar,
[data-theme="dark"] #filter-area {
  @apply bg-gray-light;
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

.lbry-logo {
  height: 100%;
  width: 100%;
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
