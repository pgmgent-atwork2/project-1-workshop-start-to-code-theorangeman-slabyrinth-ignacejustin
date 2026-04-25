document.querySelectorAll(".copy__btn").forEach((button) => {
  button.addEventListener("click", () => {
    const codeText = button
      .closest(".code-block")
      .querySelector(".code-block__snippet").innerText;
    navigator.clipboard.writeText(codeText);
  });
});
