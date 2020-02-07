import { bookmarks_name, project_prefix, Content } from './utils/bookmark_obj';
import { fold_tabs } from './utils/tabs_manager';
import { tag_former } from './utils/tags_manager';

chrome.browserAction.onClicked.addListener(tab => {
  fold_tabs({ pinned: false });
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  tag_former(bookmark['parentId'], [], new_tags => {
    let bookmarks = JSON.parse(localStorage.getItem(project_prefix + bookmarks_name));
    const new_bookmark = new Content(bookmark['title'], bookmark['url'], bookmark['id'], bookmark['dateAdded'], new_tags);
    bookmarks.push(new_bookmark);
    localStorage.setItem(project_prefix + bookmarks_name, JSON.stringify(bookmarks));
  });
});

chrome.bookmarks.onChanged.addListener((id, bookmark) => {
  let bookmarks = JSON.parse(localStorage.getItem(project_prefix + bookmarks_name));
  const index = bookmarks
    .map(function(e) {
      return e['chrome_id'];
    })
    .indexOf(id);
  bookmarks[index]['title'] = bookmark['title'];
  bookmarks[index]['url'] = bookmark['url'];
  localStorage.setItem(project_prefix + bookmarks_name, JSON.stringify(bookmarks));
});

chrome.bookmarks.onRemoved.addListener((id, bookmark) => {
  let bookmarks = JSON.parse(localStorage.getItem(project_prefix + bookmarks_name));
  const index = bookmarks
    .map(function(e) {
      return e['chrome_id'];
    })
    .indexOf(id);
  bookmarks.splice(index, 1);
  localStorage.setItem(project_prefix + bookmarks_name, JSON.stringify(bookmarks));
});

chrome.bookmarks.onMoved.addListener((id, bookmark) => {
  tag_former(bookmark['parentId'], [], new_tags => {
    let bookmarks = JSON.parse(localStorage.getItem(project_prefix + bookmarks_name));
    const index = bookmarks
      .map(function(e) {
        return e['chrome_id'];
      })
      .indexOf(id);
    bookmarks[index]['user_tags'] = new_tags;
    localStorage.setItem(project_prefix + bookmarks_name, JSON.stringify(bookmarks));
  });
});
