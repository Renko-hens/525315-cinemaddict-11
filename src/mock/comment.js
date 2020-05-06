import {getRandomArrayItem, getRandomDate, getRandomIntegerNumber} from '../utils/common';
import {COMMENTS_NAMES, EMOJIES, TEXT_COMMENT} from '../const';

const generateComments = (count = getRandomIntegerNumber(0, COMMENTS_NAMES.length)) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push({
      author: getRandomArrayItem(COMMENTS_NAMES),
      emoji: getRandomArrayItem(EMOJIES),
      textComment: getRandomArrayItem(TEXT_COMMENT),
      data: getRandomDate(),
    });
  }
  return comments;
};

export {generateComments};
