<template>
  <div id="bookmark_block">
    <p>Bookmark_block here</p>

    <ul id="bookmarks_list" v-if="bookmarks.length > 0">
      <li v-for="bookmark in bookmarks">
        {{ bookmark['title'] }}
      </li>
    </ul>
    <h2 v-else>Waiting for bookmarks to load</h2>
  </div>
</template>

<script>
import { bookmarks_name, project_prefix } from '../../utils/bookmark_obj';
import { check_consistency, init_bookmarks } from '../../background';

export default {
  name: 'bookmark_block',
  data() {
    return {
      bookmarks: [],
    };
  },
  mounted() {
    if (!localStorage.getItem(bookmarks_name)) {
      init_bookmarks();
    } else {
      check_consistency();
    }
    this.bookmarks = JSON.parse(localStorage.getItem(project_prefix + bookmarks_name));
    // Later add backend check if exists
  },
  computed: {
    BookmarkAdder() {},
  },
};
</script>

<style scoped></style>
