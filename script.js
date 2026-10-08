const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#category-select");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

let notes = [];


/* Save notes to localStorage */
function saveNotes() {
    localStorage.setItem("quickNotes", JSON.stringify(notes));
}


/* Create one note card */
function createNoteCard(note) {
    const listItem = document.createElement("li");

    listItem.classList.add(
        "note-card",
        `category-${note.category.toLowerCase()}`
    );

    const noteText = document.createElement("p");
    noteText.textContent = note.text;

    const categoryLabel = document.createElement("p");
    categoryLabel.classList.add("category-label");
    categoryLabel.textContent = `Category: ${note.category}`;

    const noteDate = document.createElement("p");
    noteDate.classList.add("note-date");
    noteDate.textContent = `Created: ${note.createdAt}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        notes = notes.filter((item) => item.id !== note.id);

        saveNotes();
        render();
    });

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(noteDate);
    listItem.appendChild(deleteButton);

    return listItem;
}


/* Display notes */
function render(notesToRender = notes) {
    notesList.textContent = "";

    const searchTerm = searchInput.value.trim();

    if (searchTerm !== "" && notesToRender.length === 0) {
        const message = document.createElement("li");
        message.textContent = "No notes match your search.";
        notesList.appendChild(message);
    } else {
        notesToRender.forEach((note) => {
            const noteCard = createNoteCard(note);
            notesList.appendChild(noteCard);
        });
    }

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}


/* Add a new note */
noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const noteText = noteInput.value.trim();

    if (noteText === "") {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (noteText.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const note = {
        id: Date.now(),
        text: noteText,
        category: categorySelect.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    saveNotes();

    noteInput.value = "";

    render();
});


/* Search notes */
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(searchTerm)
    );

    render(filteredNotes);
});


/* Load saved notes */
const savedNotes = localStorage.getItem("quickNotes");

if (savedNotes) {
    notes = JSON.parse(savedNotes);
}


/* Display notes when the page loads */
render();