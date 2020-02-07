import Vue from 'vue';
import 'es6-promise/auto';
import Vuex from 'vuex';

import * as getters from './getters';
import mutations from './mutations';
import * as actions from './actions';
import { project_prefix, tabs_name } from '../utils/bookmark_obj';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search_by: 'all',
    tab_groups: JSON.parse(localStorage.getItem(project_prefix + tabs_name)),
    bookmarks: null,
    search_query: '',
    selected_tags: [],
  },
  getters,
  mutations,
  actions,
});
