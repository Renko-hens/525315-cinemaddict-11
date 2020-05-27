export default class Comments {
  constructor() {
    this._comments = [];
    this._dataChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    comments.forEach((comment) => {
      this._comments.push(comment);
    });

    this._callHandlers(this._dataChangeHandlers);
  }

  addComment(comment) {
    const newComment = Object.assign({}, comment, {
      id: String(new Date() + Math.random()),
      date: new Date(),
      author: `Renko Hens`,
    });

    this._comments = [].concat(this._comments, newComment);

    this._callHandlers(this._dataChangeHandlers);
  }

  updateComment(id, comment) {
    const index = this._comments.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), comment, this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => comment.id === id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
