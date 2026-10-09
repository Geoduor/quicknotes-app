
// ---------- 1. Select the elements ----------
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const STORAGE_KEY = "quicknotes";
const ALLOWED_CATEGORIES = ["personal", "work", "study"];

// ---------- 2. Load saved notes ----------
let notes = loadNotes();

function loadNotes() {
    const savedNotes = localStorage.getItem(STORAGE_KEY);

    if (savedNotes === null) {
        return [];
    }

    try {
        const parsedNotes = JSON.parse(savedNotes);

        if (!Array.isArray(parsedNotes)) {
            return [];
        }

        return parsedNotes.filter((note) =>
            note &&
            typeof note.id === "string" &&
            typeof note.text === "string" &&
            typeof note.category === "string" &&
            ALLOWED_CATEGORIES.includes(note.category) &&
            typeof note.createdAt === "string"
        );
    } catch (error) {
        return [];
    }
}

// ---------- 3. Save notes ----------
function saveNotes() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// ---------- 4. Update the note count ----------
function updateNoteCount(count) {
    if (count === 0) {
        noteCount.textContent = "No notes";
    } else if (count === 1) {
        noteCount.textContent = "1 note";
    } else {
        noteCount.textContent = `${count} notes`;
    }
}

// ---------- 5. Render the notes ----------
function render() {
    notesList.replaceChildren();

    const searchText = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter((note) =>
        note.text.toLowerCase().includes(searchText) ||
        note.category.toLowerCase().includes(searchText)
    );

    updateNoteCount(filteredNotes.length);

    if (filteredNotes.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.classList.add("empty-message");

        if (searchText === "") {
            emptyItem.textContent =
                "No notes yet. Create your first note to get started.";
        } else {
            emptyItem.textContent = "No matching notes found.";
        }

        notesList.appendChild(emptyItem);
        return;
    }

    filteredNotes.forEach((note) => {
        const listItem = document.createElement("li");
        listItem.classList.add(
            "note-card",
            `category-${note.category}`
        );

        const noteText = document.createElement("p");
        noteText.classList.add("note-text");
        noteText.textContent = note.text;

        const details = document.createElement("div");
        details.classList.add("note-details");

        const category = document.createElement("span");
        category.classList.add(
            "note-category",
            `category-${note.category}`
        );
        category.textContent = note.category;

        const date = document.createElement("span");
        date.classList.add("note-date");

        const createdDate = new Date(note.createdAt);

        date.textContent = Number.isNaN(createdDate.getTime())
            ? "Date unavailable"
            : createdDate.toLocaleString();

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add("delete-btn");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            deleteNote(note.id);
        });

        details.appendChild(category);
        details.appendChild(date);
        details.appendChild(deleteButton);

        listItem.appendChild(noteText);
        listItem.appendChild(details);

        notesList.appendChild(listItem);
    });
}

// ---------- 6. Add a note ----------
function addNote(text, category) {
    const newNote = {
        id: crypto.randomUUID(),
        text: text,
        category: category,
        createdAt: new Date().toISOString()
    };
    
    notes.unshift(newNote);
    saveNotes();
    render();
}

// ---------- 7. Delete a note ----------
function deleteNote(id) {
    notes = notes.filter((note) => note.id !== id);

    saveNotes();
    render();
}

// ---------- 8. Validate and submit ----------
noteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text === "") {
        errorMessage.textContent = "Please enter a note.";
        noteInput.focus();
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Your note must not exceed 200 characters.";
        noteInput.focus();
        return;
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
        errorMessage.textContent = "Please select a valid category.";
        return;
    }

    addNote(text, category);

    noteInput.value = "";
    errorMessage.textContent = "";
    noteInput.focus();
});

// ---------- 9. Search notes ----------
searchInput.addEventListener("input", () => {
    render();
});

// ---------- 10. Clear the error while editing ----------
noteInput.addEventListener("input", () => {
    errorMessage.textContent = "";
});

// ---------- 11. Display saved notes ----------
render();