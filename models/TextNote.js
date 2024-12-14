import { BaseNote } from "./BaseNote.js";

export class TextNote extends BaseNote {
  constructor(title, content) {
    super(title, content);
    this.type = "text";
  }

  getPreview() {
    return (
      this.content.substring(0, 100) + (this.content.length > 100 ? "..." : "")
    );
  }

  toHTML() {
    return `
            <div class="note" data-id="${this.id}">
                <div class="note-header">
                    <h3>${this.title}</h3>
                    <div class="note-actions">
                        <button data-action="edit">Edit</button>
                        <button class="delete-btn" data-action="delete">Delete</button>
                    </div>
                </div>
                <p>${this.getPreview()}</p>
                <small>Created: ${this.getCreationDate()}</small>
            </div>
        `;
  }

  validateContent() {
    return this.content.length <= 1000;
  }
}
