<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="10" v-for="(tabs, i) in tab_groups" :key="generateTabGroupsKey(i)">
        <TabsList :tabs="constructTabs(tabs)" :tab_groups_index="i" :is_tabs="true" :tab_groups="tab_groups" />
      </v-col>
      <v-col cols="10" v-if="bookmarks !== null">
        <TabsList :tabs="bookmarks" :tab_groups_index="0" :is_tabs="false" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import TabsList from '../components/tabs_list';
import { ContentList } from '../../utils/bookmark_obj';

export default {
  name: 'page_main',
  components: {
    TabsList,
  },
  data() {
    return {};
  },
  methods: {
    constructTabs(tabs) {
      return new ContentList('', tabs);
    },
    generateTabGroupsKey(index) {
      return 'tab_groups_' + index;
    },
  },
  computed: {
    ...mapState(['tab_groups', 'bookmarks']),
  },
  mounted() {
    this.$store.dispatch('refreshBookmarks');
  },
};
</script>

<style lang="sass" scoped>
p
  font-size: 20px
</style>
