import React, { Fragment, useEffect, useState } from "react";
import Comment from "./Comment";
import { MoreReplies } from "./styles";

function ReplyComment({
  comments,
  parentCommentId,
  videoId,
  triggerFetchComment,
  setTriggerFetchComment,
}) {
  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    comments?.map((comment) => {
      if (comment?.responseTo === parentCommentId) {
        commentNumber = commentNumber + 1;
      }
    });
    setChildCommentNumber(commentNumber);
  }, [comments, parentCommentId]);

  const renderReplyComment = (parentCommentId) => {
    return comments?.map((comment, index) => (
      <Fragment key={comment?._id}>
        {comment?.responseTo === parentCommentId && (
          <div style={{ marginLeft: "40px" }}>
            <Comment
              comment={comment}
              videoId={videoId}
              triggerFetchComment={triggerFetchComment}
              setTriggerFetchComment={setTriggerFetchComment}
            />
            <ReplyComment
              comments={comments}
              parentCommentId={comment?._id}
              videoId={videoId}
              triggerFetchComment={triggerFetchComment}
              setTriggerFetchComment={setTriggerFetchComment}
            />
          </div>
        )}
      </Fragment>
    ));
  };

  const handleOpen = () => {
    setOpenReplyComments(!openReplyComments);
  };

  return (
    <div>
      {childCommentNumber > 0 && (
        <MoreReplies onClick={handleOpen}>
          View {childCommentNumber} more comments
        </MoreReplies>
      )}
      {openReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
}

export default ReplyComment;
