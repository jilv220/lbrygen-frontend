<template>
  <ion-app v-if="this.isLbryReady">
    <ion-header class="ion-no-border"> </ion-header>
    <ion-content>
      <div class="flex-x-center">
        <img class="lbry-logo" alt="Lbry logo" src="./assets/lbry_logo.svg" />
        <ion-toggle
          class="theme-toggle"
          @ionChange="switchTheme()"
          v-model="checked"
        >
        </ion-toggle>
      </div>

      <ion-menu slot="fixed" side="start" content-id="menuContent">
      <ion-content>
        <ion-list>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
          <ion-item>Menu Item</ion-item>
        </ion-list>
      </ion-content>
      </ion-menu>

      <!-- Need to hint router-view to ion-menu -->
      <router-view id="menuContent" v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :key="$route.fullPath" />
        </keep-alive>
      </router-view>

    </ion-content>
  </ion-app>

  <!-- Splash Screen -->
  <div v-else class="flex-y-center">
    <img class="splash-logo" alt="Lbry logo" src="./assets/lbry_logo.svg" />
    <div class="fancy-spinner">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
import EventService from "./services/EventService.js"
import {
  IonApp,
  IonContent,
  IonHeader,
  IonMenu,
  IonList,
  IonItem,
  IonToggle
} from "@ionic/vue";

export default {
  name: "App",
  components: {
    IonApp,
    IonContent,
    IonHeader,
    IonMenu,
    IonList,
    IonItem,
    IonToggle,
  },
  data() {
    return {
      checked: this.$theme,
      intervalId: 0,
      isLbryReady: false
    };
  },
  mounted() {
     this.intervalId = setInterval(() => {
      this.checkLbryStatus()
      //console.log(this.isLbryReady)
    }, 100)
  },
  watch: {
    isLbryReady: function() {
      clearInterval(this.intervalId)
      console.clear()
    }
  },
  beforeCreate() {
    if (window.localStorage.getItem('theme') == 'dark') {
      this.$theme = 1
      document.documentElement.setAttribute("data-theme", "dark")
      window.localStorage.setItem('theme', 'dark');
    } 
    else if (window.localStorage.getItem('theme') == 'light') {
      this.$theme = 0
      document.documentElement.setAttribute("data-theme", "light")
      window.localStorage.setItem('theme', 'light');
    } 
    else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.$theme = 1
      document.documentElement.setAttribute("data-theme", "dark")
    }
  },
  methods: {
    switchTheme() {
      this.$theme = !this.$theme;
      //console.log(this.$theme);

      if (this.$theme) {
        document.documentElement.setAttribute("data-theme", "dark")
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute("data-theme", "light")
        window.localStorage.setItem('theme', 'light');
      }
    },
    async checkLbryStatus() {
      EventService.getDaemonStatus().then((response) => {
          this.isLbryReady = response.result.is_running
        })
    }
  },
};
</script>

<style>
[data-theme="dark"]:root {
  /* dark theme colors */
  --ion-background-color: #121212;
  --ion-text-color: #ffffff;
  --ion-item-border-color: #ffffff;
  --ion-placeholder-color: #ffffff;
  --ion-border-color: #1f1f22;
  --ion-toolbar-background: #1f1f22;
}

:root {
  /* light theme colors */
  --ion-background-color: #ffffff;
  --ion-text-color: #1f1f22;
  --ion-item-border-color: #1f1f22;
  --ion-placeholder-color: #1f1f22;
  --ion-border-color: #1f1f22;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 4rem;
}

ion-button {
  cursor: pointer;
}

[data-theme="dark"]ion-input {
  text-align: start;
  border: 1px solid #242424;
  border-radius: 4px;
}

ion-input {
  text-align: start;
  border: 1px solid black;
  border-radius: 4px;
}

ion-toggle {
  --background: grey;
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

/* small screen */
@media (max-width: 890px) {
  .theme-toggle {
    margin-left: 100px;
    margin-bottom: 100px;
  }
  .lbry-logo {
    max-width: 25%;
    margin: 10px 0px 20px 100px;
    padding: 10px;
  }
  .splash-logo {
    padding-top: 180px;
    padding-bottom: 20px;
  }
}

@media (min-width: 890px) {
  .theme-toggle {
    margin-left: 320px;
    margin-bottom: 140px;
  }
  .lbry-logo {
    max-width: 25%;
    margin: 10px 0px 20px 320px;
    padding: 10px;
  }
  .splash-logo {
    max-width: 65%;
    padding: 40px 20px;
  }
}

</style>
