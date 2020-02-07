<template>
  <v-app id="page_app">
    <AppBar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/app_footer';
import AppBar from './components/app_bar';

export default {
  components: {
    AppBar,
    Footer,
  },
  data() {
    return {};
  },
};
</script>
