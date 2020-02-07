import { bookmarks_name, project_prefix, tabs_name } from '../utils/bookmark_obj';

export default {
  removeTabInGroup(state, payload) {
    state.tab_groups.splice(payload.index, 1);
    localStorage.setItem(project_prefix + tabs_name, JSON.stringify(state.tab_groups));
  },
  updateTabTitle(state, payload) {
    state.tab_groups[payload.index].meta_info['title'] = payload.new_title;
    localStorage.setItem(project_prefix + tabs_name, JSON.stringify(state.tab_groups));
  },
  refreshBookmarks(state, payload) {
    state.bookmarks = payload.bookmarks;
    localStorage.setItem(project_prefix + bookmarks_name, JSON.stringify(state.bookmarks['content_list']));
  },
  updateSearchQuery(state, payload) {
    state.search_query = payload.search_query.trim().toLowerCase();
  },
  updateSearchBy(state, payload) {
    state.search_by = payload.search_by;
  },
  updateSelectedTags(state, payload) {
    state.selected_tags = payload.new_selected;
  },
  toggleSelectedTag(state, payload) {
    const index = state.selected_tags.indexOf(payload.tag_name);
    if (index === -1) {
      state.selected_tags.push(payload.tag_name);
    } else {
      console.log(state.selected_tags);
      state.selected_tags.splice(index, 1);
      console.log(state.selected_tags);
    }
  },
};
