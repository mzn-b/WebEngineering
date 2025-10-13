export const addCommentScript = (): void => {
  const form = document.querySelector(".comment-form");
  const nameField = document.querySelector<HTMLInputElement>("#name");
  const commentField = document.querySelector<HTMLInputElement>("#comment");
  const list = document.querySelector(".comment-container");
  const errorDisplay = document.querySelector("#comment-error-display");

  const resetFields = (): void => {
    if (errorDisplay !== null) errorDisplay.textContent = "";
    if (nameField !== null) nameField.value = "";
    if (commentField !== null) commentField.value = "";
  };

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameValue = nameField?.value.trim();
    const commentValue = commentField?.value.trim();
    const nameParam = document.createElement("p");
    const commentParam = document.createElement("p");

    if (
      nameValue === undefined ||
      nameValue === "" ||
      commentValue === undefined ||
      commentValue === ""
    ) {
      if (errorDisplay !== null)
        errorDisplay.textContent = "Please fill out both fields";
      return;
    }

    nameParam.textContent = nameValue;
    commentParam.textContent = commentValue;

    const listItem = document.createElement("li");
    list?.appendChild(listItem);
    listItem.appendChild(nameParam);
    listItem.appendChild(commentParam);

    resetFields();
  });
};
