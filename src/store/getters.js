export const getAllTags = state => {
  let all_tags = [];
  state.tab_groups.forEach(tabs => {
    tabs.contents.forEach(tab => {
      tab['generated_tags'].forEach(tag => {
        all_tags.push(tag['name']);
      });
      tab['user_tags'].forEach(tag => {
        all_tags.push(tag['name']);
      });
    });
  });
  state.bookmarks.contents.forEach(bookmark => {
    bookmark['generated_tags'].forEach(tag => {
      all_tags.push(tag['name']);
    });
    bookmark['user_tags'].forEach(tag => {
      all_tags.push(tag['name']);
    });
  });
  return all_tags.sort();
};
