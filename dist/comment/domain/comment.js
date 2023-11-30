"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
class Comment {
    constructor(id, userId, publicationId, content, userName) {
        this.id = id;
        this.userId = userId;
        this.publicationId = publicationId;
        this.content = content;
        this.userName = userName;
    }
}
exports.Comment = Comment;
