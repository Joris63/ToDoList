export default class ToDo {

    constructor(id, title, editable, completed) {
        this.id = id;
        this.title = title;
        this.editable = editable;
        this.completed = completed;
    }

    ChangeTitle(title) {
        this.title = title;
    }

    MakeEditable(state) {
        this.editable = state;
    }

    ChangeStatus(status) {
        this.completed = status;
    }
}