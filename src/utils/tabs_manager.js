import { project_prefix, ContentList, Content, tabs_name } from './bookmark_obj';

export const fold_tabs = function(query_info) {
  chrome.tabs.query(query_info, tabs => {
    if (tabs.length === 0) {
      chrome.tabs.create({ url: './app/index.html' });
      return null;
    }
    let tab_groups = JSON.parse(localStorage.getItem(project_prefix + tabs_name));
    if (tab_groups === null) tab_groups = [];
    let grouped_tabs = new ContentList();
    for (let i = 0; i < tabs.length; ++i) {
      chrome.tabs.remove(tabs[i].id);
      const include_extension = tabs[i].url.includes(chrome.runtime.id);
      const include_empty_tab = tabs[i].url.includes('chrome://newtab/');
      if (include_extension || include_empty_tab) {
        continue;
      }
      const new_tab = new Content(tabs[i].title, tabs[i].url, tabs[i].date_added);
      grouped_tabs.push_content(new_tab);
    }
    if (grouped_tabs.contents.length > 0) {
      tab_groups.push(grouped_tabs['content_list']);
      localStorage.setItem(project_prefix + tabs_name, JSON.stringify(tab_groups));
    }
    chrome.tabs.create({ url: './app/index.html' });
  });
};
