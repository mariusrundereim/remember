import { TextNote } from "../models/TextNote.js";

export class StorageService {
  constructor(storageKey = "notes") {
    this.storageKey = storageKey;
  }

  saveNotes(notes) {
    const notesData = notes.map((note) => note.toJSON());
    localStorage.setItem(this.storageKey, JSON.stringify(notesData));
  }

  getNotes() {
    const notesData = localStorage.getItem(this.storageKey);
    if (!notesData) return [];

    return JSON.parse(notesData).map((noteData) => {
      const note = new TextNote(noteData.title, noteData.content);
      note.id = noteData.id;
      note.createdAt = new Date(noteData.createdAt);
      note.updatedAt = new Date(noteData.updatedAt);
      return note;
    });
  }

  clearNotes() {
    localStorage.removeItem(this.storageKey);
  }
}
