import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentBox from '../containers/CommentBox';

// TODO: (kiwi) Need to adapt CSS classes post refactor to match the rest.
const name = 'talk-plugin-replies';

class ReplyBox extends Component {
  cancelReply = () => {
    this.props.setActiveReplyBox('');
  };

  render() {
    const {
      styles,
      postComment,
      assetId,
      currentUser,
      notify,
      parentId,
      commentPostedHandler,
      maxCharCount,
      charCountEnable,
    } = this.props;
    return (
      <div className={`${name}-textarea`} style={styles && styles.container}>
        <CommentBox
          maxCharCount={maxCharCount}
          charCountEnable={charCountEnable}
          commentPostedHandler={commentPostedHandler}
          parentId={parentId}
          onCancel={this.cancelReply}
          notify={notify}
          currentUser={currentUser}
          assetId={assetId}
          postComment={postComment}
          isReply={true}
          focusInputOnLoad={true}
        />
      </div>
    );
  }
}

ReplyBox.propTypes = {
  charCountEnable: PropTypes.bool.isRequired,
  maxCharCount: PropTypes.number,
  setActiveReplyBox: PropTypes.func.isRequired,
  commentPostedHandler: PropTypes.func,
  parentId: PropTypes.string,
  notify: PropTypes.func.isRequired,
  postComment: PropTypes.func.isRequired,
  assetId: PropTypes.string.isRequired,
  currentUser: PropTypes.object,
  styles: PropTypes.object,
};

export default ReplyBox;
