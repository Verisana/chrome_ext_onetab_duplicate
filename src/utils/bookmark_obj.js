export class Tag {
  constructor(name, dateAdded, dateGroupModified, tag_id) {
    this.name = name;
    this.date_added = dateAdded;
    this.date_modified = dateGroupModified;
    this.tag_id = tag_id;
  }
}

export class Content {
  constructor(title, url, date_added = new Date(), chrome_id = null, user_tags = [], generated_tags = []) {
    const google_favicon_extractor = 'https://s2.googleusercontent.com/s2/favicons?domain=';
    this.title = title;
    this.url = url;
    this.date_added = date_added;
    this.generated_tags = generated_tags;
    this.user_tags = user_tags;
    this.chrome_id = chrome_id;
    this.favicon_url = google_favicon_extractor + this.url;
  }
}

export class ContentList {
  constructor(title = 'Name this group', content_list = null) {
    if (content_list === null) {
      this.content_list = {
        meta_info: {
          date_added: new Date(),
          title: title,
        },
        contents: [],
        settings: {
          is_parsed: false,
        },
      };
    } else {
      this.content_list = content_list;
    }
  }
  push_content(content) {
    this.content_list['contents'].push(content);
  }
  get contents() {
    return this.content_list['contents'];
  }
  get meta_info() {
    return this.content_list['meta_info'];
  }
  get settings() {
    return this.content_list['settings'];
  }
  get is_parsed() {
    return this.content_list['settings']['is_parsed'];
  }
}

export const bookmarks_name = 'bookmarks';
export const bookmarks_title = 'Bookmarks';
export const project_prefix = 'bookmark_organizer_';
export const tabs_name = 'tabs';
