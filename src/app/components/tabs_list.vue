<template>
  <v-card flat class="tab_group_card">
    <v-card-title>
      <v-chip-group>
        <v-chip label class="title_chip"> {{ tabs.contents.length }} Tabs </v-chip>
        <v-chip label class="title_chip">
          {{ formatDate(tabs.meta_info['date_added']) }}
        </v-chip>
        <v-dialog v-model="tab_title_dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-chip label class="title_chip" v-on="on" @click="new_title = ''"> {{ tabs.meta_info['title'] }} </v-chip>
          </template>
          <v-card>
            <v-card-title>
              Change title for group
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="auto">
                    <v-text-field label="Enter new title" required v-model="new_title"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="tab_title_dialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="updateTabTitle(tab_groups_index)">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-chip-group>
    </v-card-title>
    <v-card-subtitle>
      <v-btn small outlined ripple>Generate tags</v-btn>
      <v-btn v-if="is_tabs" small outlined ripple @click="openRemoveAllTabs(tab_groups_index)">Open & Remove tabs</v-btn>
      <v-btn v-if="is_tabs" small outlined ripple @click="openAllTabs(tab_groups_index)">Open tabs</v-btn>
      <v-btn v-if="is_tabs" small outlined ripple @click="removeTabInGroup(tab_groups_index)">Delete tabs</v-btn>
    </v-card-subtitle>
    <v-card-text class="tab_list_group">
      <v-list dense>
        <v-list-item v-for="(tab, i) in filteredTabs" :key="'tabs_' + i">
          <v-list-item-content class="tab_list_content">
            <v-list-item-title>
              <v-chip link :href="tab['url']" target="_blank" :close="close_tab" ripple small color="white">
                <v-img :src="tab['favicon_url']" id="tabs_favicon"></v-img> {{ tab['title'] }}
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip-group class="chip_tag_group">
                <v-chip
                  v-for="(generated_tag, i) in tab['generated_tags']"
                  x-small
                  label
                  :key="'generated_tags_' + i"
                  class="chip_tag_element"
                  @click="toggleSelectedTag(user_tag['name'])"
                  >{{ generated_tag['name'] }}</v-chip
                >
                <v-chip v-for="(user_tag, i) in tab['user_tags']" x-small label :key="'user_tags_' + i" class="chip_tag_element" @click="toggleSelectedTag(user_tag['name'])">{{
                  user_tag['name']
                }}</v-chip>
              </v-chip-group>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { mapState } from 'vuex';
import { tag_search } from '../../utils/tags_manager';

export default {
  name: 'tabs_list',
  props: {
    tabs: Object,
    tab_groups_index: Number,
    is_tabs: Boolean,
    tab_groups: Array,
  },
  data() {
    return {
      close_tab: false,
      tab_title_dialog: false,
      new_title: '',
    };
  },
  methods: {
    removeTabInGroup(index) {
      this.$store.commit({ type: 'removeTabInGroup', index: index });
    },
    formatDate(date) {
      let parsed_date = undefined;
      if (typeof date === 'string') {
        parsed_date = parseISO(date);
      } else {
        parsed_date = parseISO(date.toISOString());
      }
      return format(parsed_date, 'dd.MM.yyyy   HH:mm:ss');
    },
    openAllTabs(index) {
      this.tab_groups[index]['contents'].forEach(tab => {
        chrome.tabs.create({ url: tab['url'], active: false });
      });
    },
    openRemoveAllTabs(index) {
      this.openAllTabs(index);
      this.removeTabInGroup(index);
    },
    updateTabTitle(index) {
      this.tab_title_dialog = false;
      this.$store.commit({ type: 'updateTabTitle', index: index, new_title: this.new_title });
    },
    toggleSelectedTag(tag_name) {
      this.$store.commit({ type: 'updateSearchBy', search_by: 'tag' });
      this.$store.commit({ type: 'toggleSelectedTag', tag_name: tag_name });
    },
  },
  computed: {
    ...mapState(['search_query', 'search_by', 'selected_tags']),
    filteredTabs() {
      return this.tabs.contents.filter(tab => {
        if (this.search_query === '' && this.selected_tags.length === 0) {
          return true;
        } else {
          if (this.search_by === 'tag') {
            return tag_search(tab['user_tags'], this.selected_tags, true) || tag_search(tab['generated_tags'], this.selected_tags, true);
          } else if (this.search_by === 'name') {
            return tab['title']
              .trim()
              .toLowerCase()
              .includes(this.search_query);
          } else if (this.search_by === 'url') {
            return tab['url']
              .trim()
              .toLowerCase()
              .includes(this.search_query);
          } else {
            return (
              tag_search(tab['user_tags'], this.search_query) ||
              tag_search(tab['generated_tags'], this.search_query) ||
              tab['title']
                .trim()
                .toLowerCase()
                .includes(this.search_query) ||
              tab['url']
                .trim()
                .toLowerCase()
                .includes(this.search_query)
            );
          }
        }
      });
    },
  },
};
</script>

<style scoped lang="sass">
#tabs_favicon
  margin-right: 5px
  margin-left: 0
.title_chip
  margin: 10px
.tab_group_card
    margin: 5px
    padding: 0
.chip_tag_element
    padding-top: 2px
    padding-bottom: 2px
    margin-bottom: 0
    margin-top: 0
.tab_list_group
    margin: 0
    padding-top: 2px
    padding-bottom: 2px
.tab_list_content
    margin: 0
    padding: 0
</style>
