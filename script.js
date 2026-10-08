const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#category-select");
const errorMessage = document.querySelector("#error-message");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const searchInput = document.querySelector("#search-input");

let notes = [];


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
        render();
    });

    listItem.appendChild(noteText);
    listItem.appendChild(categoryLabel);
    listItem.appendChild(noteDate);
    listItem.appendChild(deleteButton);

    return listItem;
}


function render() {
    notesList.textContent = "";

    notes.forEach((note) => {
        const noteCard = createNoteCard(note);
        notesList.appendChild(noteCard);
    });

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}


noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const noteText = noteInput.value.trim();

    const note = {
        id: Date.now(),
        text: noteText,
        category: categorySelect.value,
        createdAt: new Date().toLocaleString()
    };

    notes.push(note);

    noteInput.value = "";

    render();
});


render();