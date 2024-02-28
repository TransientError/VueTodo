export type TodoItem = {
    done: boolean,
    description: string,
}

export default {
    createTodoItem(description: string): TodoItem {
        return {
            done: false,
            description: description,
        }
    }
}