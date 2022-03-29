<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style>
.clear {
  width: 100%;
  height: 1px;
  clear: both;
  display: block;
}

.xp {
  padding: 10px;
  margin: 5% auto;
}

/* animation fade mode start here  */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1.5s;
  opacity: 0.5;
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}

/* slide */
.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

.slide-leave-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute;
}

@keyframes slide-in {
  from {
    transform: translateY(30px);
    transform: translateX(30px);
  }
  to {
    transform: translateY(0);
    transform: translateX(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    transform: translateX(0);
  }
  to {
    transform: translateY(30px);
    transform: translateX(30px);
  }
}
</style>
