<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
  
<script>
import Header from './components/Header/Header.vue'
import { mapActions } from 'vuex';
export default {
  components: { Header },
  name: 'App',
  computed: {

  },
  created() {
    this.GetCartItem();
  },
  methods: {
    ...mapActions([
      'GetCartItem'
    ]),
  }

}
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
  opacity: 0
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
  transition: opacity .5s;
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
