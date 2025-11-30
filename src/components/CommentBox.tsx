import { type FC, useState } from "react";
import { Highlight } from "./Highlight.tsx";

export interface Comment {
  name: string;
  comment: string;
}

interface CommentBoxProps {
  addComment: (newComment: Comment) => boolean;
}

export const CommentBox: FC<CommentBoxProps> = ({ addComment }) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  return (
    <form
      className="comment-form"
      onSubmit={(e) => {
        e.preventDefault();

        if (name === "" || comment === "") {
          setError("Please fill out both fields");
          return;
        }

        setError("");

        const detail: Comment = { name, comment };

        const success = addComment(detail);

        if (success) {
          setName("");
          setComment("");
        } else {
          setError("Failed to add comment");
        }
      }}
    >
      <div className="flex-pair">
        <label htmlFor="name">
          <Highlight text={"Your name:"} />
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder="Enter your name"
        />
      </div>

      <div className="flex-pair">
        <label htmlFor="comment">
          <Highlight text={"Your comment:"} />
        </label>
        <input
          id="comment"
          type="text"
          name="comment"
          placeholder="Enter your comment"
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
      </div>

      <input type="submit" value="Submit comment" />

      <p className="error" id="error-display">
        <Highlight text={error} />
      </p>
    </form>
  );
};
