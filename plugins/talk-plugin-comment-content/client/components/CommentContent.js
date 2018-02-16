import React from 'react';

const name = 'talk-plugin-comment-content';
const CommentContent = ({ comment }) => {
  return (
    <span
      className={`${name}-text`}
      dangerouslySetInnerHTML={{ __html: comment.body }}
    />
  );
};

export default CommentContent;
