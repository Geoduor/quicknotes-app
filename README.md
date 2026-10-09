
# QuickNotes App

QuickNotes is a browser-based note-taking application built with HTML, CSS, and JavaScript. It allows users to create notes, organize them into categories, search saved notes, and delete notes they no longer need. The application uses the browser's localStorage to save notes so that they remain available after refreshing the page.

## Features

- Create notes.
- Organize notes into Personal, Work, and Study categories.
- Search notes by text or category.
- Delete individual notes.
- Validate input to prevent empty notes and notes longer than 200 characters.
- Automatically save notes using localStorage.
- Restore saved notes after refreshing the page.
- Display the correct count for zero, one, or multiple notes.
- Responsive layout for desktop and mobile screens.
- Safely display user-entered text using textContent.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser localStorage
- Git and GitHub

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/quicknotes-app.git
   ```

2. Enter the project directory:

   ```bash
   cd quicknotes-app
   ```

3. Open `index.html` in a modern web browser.

Alternatively, open the folder in Visual Studio Code and use the Live Server extension.

No backend server or package installation is required.

## What I Learned

- How to create semantic HTML structures and accessible forms.
- How to use Flexbox and media queries for responsive layouts.
- How to manage an array of objects in JavaScript.
- How to create HTML elements dynamically using createElement() and textContent.
- How to select elements with document.querySelector().
- How to validate user input and handle browser events.
- How to persist application data using localStorage, JSON.stringify(), and JSON.parse().
- How to track project development with meaningful Git commits.

## Author

Created as a web development learning project.