import {AllHtmlEntities} from 'html-entities';
import truncate from "lodash/truncate";

const getDescription = (description, limit) => {
  if (typeof limit === 'undefined') {
    limit = 50;
  }

  if (typeof description === 'undefined') {
    return '';
  }

  let desc = description.replace('<p>', '');
  desc = truncate(desc, {length: limit, separator: ' '});

  return AllHtmlEntities.decode(desc);
};

export {
  getDescription,
};
