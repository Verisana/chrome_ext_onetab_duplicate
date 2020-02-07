import { Content, ContentList, bookmarks_name, bookmarks_title, project_prefix, Tag } from './bookmark_obj';

const parse_bookmark_tree = function(parse_tree, tags, result, level, callback) {
  for (let i = 0; i < parse_tree.length; ++i) {
    const child = parse_tree[i];
    if ('children' in child) {
      if (child['id'] !== '0') {
        const tag = new Tag(child['title'], child['dateAdded'], child['dateGroupModified'], child['id']);
        tags.push(tag);
      }
      parse_bookmark_tree(child['children'], tags, result, level + 1, callback);
    } else {
      const bookmark = new Content(child['title'], child['url'], child['dateAdded'], child['id'], [...tags]);
      result.push_content(bookmark);
    }
  }
  tags.pop();
  if (level === 0) {
    return callback(result);
  } else {
    return result;
  }
};

export const check_consistency = function(callback) {
  chrome.bookmarks.getTree(parse_tree => {
    parse_bookmark_tree(parse_tree, [], new ContentList(bookmarks_title), 0, chrome_bookmarks => {
      let local_bookmarks = new ContentList(bookmarks_title, JSON.parse(localStorage.getItem(project_prefix + bookmarks_name)));

      let chrome_contents = chrome_bookmarks.contents;
      let local_contents = local_bookmarks.contents;

      while (chrome_contents.length > local_contents.length) {
        chrome_contents.forEach(bookmark => {
          const index_in_local = local_contents
            .map(function(e) {
              return e.id;
            })
            .indexOf(bookmark['id']);
          if (index_in_local === -1) {
            local_contents.push(bookmark);
          }
        });
      }

      while (chrome_contents.length < local_contents.length) {
        local_contents.forEach(bookmark => {
          const index_in_chrome = chrome_contents
            .map(function(e) {
              return e.id;
            })
            .indexOf(bookmark['id']);
          if (index_in_chrome === -1) {
            local_contents.splice(index_in_chrome, 1);
          }
        });
      }

      for (let i = 0; i < chrome_contents.length; i++) {
        const bookmark = chrome_contents[i];
        const index_in_local = local_contents
          .map(function(e) {
            return e.id;
          })
          .indexOf(bookmark['id']);
        if (index_in_local === -1) {
          local_contents = [...chrome_bookmarks];
          return callback(local_bookmarks);

          // Next download tags from remote DB
        }
      }

      return callback(local_bookmarks);
    });
  });
};

export const init_bookmarks = callback => {
  // Don't forget to first check data in backend

  // If database is empty, create from chrome bookmarks
  chrome.bookmarks.getTree(parse_tree => {
    parse_bookmark_tree(parse_tree, [], new ContentList(bookmarks_title), 0, result => {
      return callback(result);
    });
    // Compare to data in DB for consistency

    // Upload to DB
  });
};
