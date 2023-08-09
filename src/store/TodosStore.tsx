import {makeAutoObservable} from "mobx";

interface Todo {
    value: string,
    id: number
}

class TodosStore {
    todos: Todo[] = []

    constructor() {
        makeAutoObservable(this)
    }

    addTodo = (value: string) => {
        this.todos?.push({value: value, id: this.todos.length})
    }
    deleteTodo = (value: Todo) => {
        this.todos = this.todos?.filter(el => el.id !== value.id)
    }
}

export default new TodosStore()