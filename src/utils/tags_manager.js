import { Tag } from './bookmark_obj';

export const tag_former = function(parent_id, tags, callback) {
  if (parent_id === '0') {
    callback(tags.reverse());
  } else {
    chrome.bookmarks.get(parent_id, bookmark => {
      const new_tag = new Tag(bookmark[0]['title'], bookmark[0]['dateAdded'], bookmark[0]['dateGroupModified'], bookmark[0]['id']);
      tags.push(new_tag);
      return tag_former(bookmark[0]['parentId'], tags, callback);
    });
  }
};

export const tag_search = function(tags_array, query, itemed = false) {
  const filtered_tags = tags_array.filter(tag => {
    if (!itemed) {
      return tag['name']
        .trim()
        .toLowerCase()
        .includes(query);
    } else {
      for (let i = 0; i < query.length; ++i) {
        if (query[i] === tag['name']) {
          return true;
        }
      }
      return false;
    }
  });
  if (!itemed) {
    return filtered_tags.length > 0;
  } else {
    return filtered_tags.length >= query.length;
  }
};
