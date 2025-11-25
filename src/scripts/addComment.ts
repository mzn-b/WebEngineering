// add-comment.ts — Lint-pass version

export interface CommentAddedDetail {
  name: string;
  comment: string;
}

export class AddComment extends HTMLElement {
  private readonly shadow: ShadowRoot;

  constructor() {
    super();

    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        .comment-form {
          margin-bottom: 3rem;
        }

        .flex-pair {
          display: flex;
          padding: 0 3rem 1rem;
        }

        label {
          align-self: center;
          flex: 2;
          text-align: right;
          display: block;
          margin: 0;
          font-size: 1.6rem;
          font-family: 'Open Sans Condensed', sans-serif;
        }

        input {
          margin-left: 1rem;
          flex: 6;
          font-size: 1.6rem;
          line-height: 32px;
          font-family: 'Open Sans Condensed', sans-serif;
        }

        input[type="submit"] {
          background: #333;
          border: 0;
          color: white;
          width: 30%;
          display: block;
          margin: 0 auto;
          cursor: pointer;
        }

        .error {
          color: red;
          text-align: center;
        }
      </style>

      <form class="comment-form">
        <div class="flex-pair">
          <label for="name">Your name:</label>
          <input id="name" type="text" name="name" placeholder="Enter your name" />
        </div>

        <div class="flex-pair">
          <label for="comment">Your comment:</label>
          <input id="comment" type="text" name="comment" placeholder="Enter your comment" />
        </div>

        <div>
          <input type="submit" value="Submit comment" />
        </div>

        <p class="error" id="error-display"></p>
      </form>
    `;

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback(): void {
    const form = this.shadow.querySelector("form");
    const nameField = this.shadow.querySelector<HTMLInputElement>("#name");
    const commentField =
      this.shadow.querySelector<HTMLInputElement>("#comment");
    const errorDisplay =
      this.shadow.querySelector<HTMLParagraphElement>("#error-display");

    if (
      form === null ||
      nameField === null ||
      commentField === null ||
      errorDisplay === null
    ) {
      throw new Error("AddComment: Missing form fields in Shadow DOM");
    }

    form.addEventListener("submit", (event: SubmitEvent): void => {
      event.preventDefault();

      const name = nameField.value.trim();
      const comment = commentField.value.trim();

      if (name === "" || comment === "") {
        errorDisplay.textContent = "Please fill out both fields";
        return;
      }

      errorDisplay.textContent = "";

      const detail: CommentAddedDetail = { name, comment };

      this.dispatchEvent(
        new CustomEvent<CommentAddedDetail>("comment-added", {
          detail,
          bubbles: true,
          composed: true,
        }),
      );

      nameField.value = "";
      commentField.value = "";
    });
  }
}

customElements.define("add-comment", AddComment);

function isCommentAddedEvent(
  event: Event,
): event is CustomEvent<CommentAddedDetail> {
  return (
    event instanceof CustomEvent &&
    typeof event.detail === "object" &&
    event.detail !== null &&
    "name" in event.detail &&
    "comment" in event.detail
  );
}

document.addEventListener("comment-added", (event: Event): void => {
  if (!isCommentAddedEvent(event)) {
    return;
  }

  const {
    detail: { name, comment },
  } = event;

  const list = document.querySelector<HTMLUListElement>(".comment-container");
  if (list === null) {
    return;
  }

  const li = document.createElement("li");

  const nameP = document.createElement("p");
  nameP.textContent = name;

  const commentP = document.createElement("p");
  commentP.textContent = comment;

  li.appendChild(nameP);
  li.appendChild(commentP);
  list.appendChild(li);
});
