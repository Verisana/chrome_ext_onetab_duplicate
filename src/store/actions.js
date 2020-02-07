import { bookmarks_name, project_prefix } from '../utils/bookmark_obj';
import { check_consistency, init_bookmarks } from '../utils/bookmarks_manager';

export const removeTabInGroup = ({ commit }) => {
  commit('removeTabInGroup');
};

export const refreshBookmarks = context => {
  let parsed_from_local = JSON.parse(localStorage.getItem(project_prefix + bookmarks_name));
  if (parsed_from_local === null) {
    init_bookmarks(bookmarks => {
      context.commit({
        type: 'refreshBookmarks',
        bookmarks: bookmarks,
      });
    });
  } else {
    check_consistency(local_bookmarks => {
      context.commit({
        type: 'refreshBookmarks',
        bookmarks: local_bookmarks,
      });
    });
  }
};
