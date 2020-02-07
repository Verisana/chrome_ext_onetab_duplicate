<template>
  <v-app-bar app color="green darken-1" dark flat>
    <v-app-bar-nav-icon @click="openHome">
      <v-icon>home</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title>Bookmark & Tab Organizer</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-if="search_by !== 'tag'"
      background-color="light-green darken-4"
      prepend-inner-icon="search"
      label="Search by"
      outlined
      v-model="search_query"
      clearable
    ></v-text-field>
    <v-combobox
      v-else
      background-color="light-green darken-4"
      prepend-inner-icon="search"
      label="Search by"
      outlined
      clearable
      chips
      multiple
      :items="getAllTags"
      v-model="selected_tags"
    ></v-combobox>
    <v-radio-group v-model="search_by" row>
      <v-radio label="All" value="all"></v-radio>
      <v-radio label="Tag" value="tag" default></v-radio>
      <v-radio label="Name" value="name"></v-radio>
      <v-radio label="URL" value="url"></v-radio>
    </v-radio-group>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>cloud_off</v-icon>
    </v-btn>
    <v-btn icon @click="openSettings">
      <v-icon>settings</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'app_bar',
  data() {
    return {};
  },
  methods: {
    openHome() {
      this.$router.push({ path: '/' });
    },
    openSettings() {
      this.$router.push({ path: '/options' });
    },
  },
  mounted() {},
  computed: {
    ...mapGetters(['getAllTags']),
    search_query: {
      get() {
        return this.$store.state.search_query;
      },
      set(value) {
        this.$store.commit({ type: 'updateSearchQuery', search_query: value });
      },
    },
    search_by: {
      get() {
        return this.$store.state.search_by;
      },
      set(value) {
        this.$store.commit({ type: 'updateSearchBy', search_by: value });
      },
    },
    selected_tags: {
      get() {
        return this.$store.state.selected_tags;
      },
      set(value) {
        this.$store.commit({ type: 'updateSelectedTags', new_selected: value });
      },
    },
  },
};
</script>

<style scoped lang="sass"></style>
