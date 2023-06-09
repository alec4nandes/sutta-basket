(
    document.querySelector("#annotations")?.querySelectorAll("button") || []
).forEach(handleShowNote);

function handleShowNote(button, i) {
    const linesElem = document.querySelector("#lines"),
        allHighlights = linesElem.querySelectorAll(".highlighted"),
        noteElem = linesElem.querySelector(`#a-${i + 1}`),
        removeExpand = (elem) => elem.classList.remove("expand");
    button.onclick = () => {
        allHighlights.forEach(removeExpand);
        noteElem.classList.add("expand");
        noteElem.scrollIntoView({ behavior: "smooth" });
    };
}
