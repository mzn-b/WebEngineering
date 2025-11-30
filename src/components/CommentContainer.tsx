import { type Comment, CommentBox } from "./CommentBox.tsx";
import { useState } from "react";
import { Highlight } from "./Highlight.tsx";

export const CommentContainer = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = (newComment: Comment) => {
    setComments([...comments, newComment]);
    return true;
  };

  return (
    <section className="comments">
      <button
        className="show-hide"
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Show comments
      </button>

      {visible && (
        <div className="comment-wrapper">
          <h2>Add comment</h2>
          <CommentBox addComment={addComment} />

          <h2>Comments</h2>
          <ul className="comment-container">
            <li>
              <p>
                <Highlight text={"Bob Fossil"} />
              </p>
              <p>
                <Highlight
                  text={
                    "Oh I am so glad you taught me all about the big brown angry guys..."
                  }
                />
              </p>
            </li>
            {comments.map((comment: Comment, index: number) => (
              <li key={index}>
                <p>
                  <Highlight text={comment.name} />
                </p>
                <p>
                  <Highlight text={comment.comment} />
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
