export const commentToggleScript = (): void => {
  const showHideBtn = document.querySelector(".show-hide");
  const commentWrapper = document.querySelector(".comment-wrapper");

  showHideBtn?.addEventListener("click", () => {
    const isHidden = commentWrapper?.classList.toggle("hidden");
    showHideBtn.textContent =
      isHidden !== undefined && isHidden ? "Show comments" : "Hide comments";
  });
};
