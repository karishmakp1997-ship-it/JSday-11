const saveBtn = document.getElementById("saveNote");
const noteText = document.getElementById("noteText");
const notesList = document.getElementById("notesList");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
renderNotes();

saveBtn.addEventListener("click", () => {
    const text = noteText.value.trim();
    if (text === "") {
        alert("Please write something!");
        return;
    }
    notes.push(text);
    localStorage.setItem("notes", JSON.stringify(notes));
    noteText.value = "";
    renderNotes();
});

function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");

        const noteSpan = document.createElement("div");
        noteSpan.classList.add("note-text");
        noteSpan.textContent = note;

        const delBtn = document.createElement("button");
        delBtn.classList.add("delete-btn");
        delBtn.textContent = "×";
        delBtn.onclick = () => {
            if (confirm("Remove this note?")) {
                notes.splice(index, 1);
                localStorage.setItem("notes", JSON.stringify(notes));
                renderNotes();
            }
        };

        noteDiv.appendChild(noteSpan);
        noteDiv.appendChild(delBtn);
        notesList.appendChild(noteDiv);
    });
}
