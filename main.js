import { TextNote } from "./models/TextNote.js";
import { StorageService } from "./models/StorageService.js";

class NoteApp {
  constructor() {
    this.storageService = new StorageService();
    this.notes = this.storageService.getNotes();
    this.initializeElements();
    this.renderNotes();
  }

  initializeElements() {
    this.titleInput = document.getElementById("noteTitle");
    this.contentInput = document.getElementById("noteContent");
    this.addButton = document.getElementById("addNote");
    this.notesList = document.getElementById("notesList");

    this.addButton.addEventListener("click", () => this.addNote());
    this.notesList.addEventListener("click", (e) => {
      const button = e.target.closest("button");
      if (!button) return;

      const noteElement = button.closest(".note");
      const noteId = parseInt(noteElement.dataset.id);

      if (button.dataset.action === "edit") {
        this.editNote(noteId);
      } else if (button.dataset.action === "delete") {
        this.deleteNote(noteId);
      }
    });
  }

  addNote() {
    const title = this.titleInput.value.trim();
    const content = this.contentInput.value.trim();

    if (!title || !content) {
      alert("Please fill in both title and content");
      return;
    }

    const note = new TextNote(title, content);

    if (!note.validateContent()) {
      alert("Note content is too long (max 1000 characters)");
      return;
    }

    this.notes.push(note);
    this.storageService.saveNotes(this.notes);
    this.renderNotes();
    this.clearInputs();
  }

  editNote(id) {
    const note = this.notes.find((n) => n.id === id);
    if (!note) return;

    this.titleInput.value = note.title;
    this.contentInput.value = note.content;
    this.deleteNote(id);
  }

  deleteNote(id) {
    this.notes = this.notes.filter((note) => note.id !== id);
    this.storageService.saveNotes(this.notes);
    this.renderNotes();
  }

  renderNotes() {
    this.notesList.innerHTML = this.notes.map((note) => note.toHTML()).join("");
  }

  clearInputs() {
    this.titleInput.value = "";
    this.contentInput.value = "";
  }
}

window.app = new NoteApp();
