import { DateFormatter } from "../utils/DateFormatter.js";

export class BaseNote {
  constructor(title, content) {
    this.id = Date.now();
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  update(title, content) {
    this.title = title;
    this.content = content;
    this.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  getCreationDate() {
    return DateFormatter.format(this.createdAt);
  }
}
