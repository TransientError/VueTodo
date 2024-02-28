<script setup lang="ts">
import './style.css';
import { Ref, ref } from 'vue';
import TodoItemUtils, { TodoItem } from './components/TodoItem';
import TodoItemComponent from './components/TodoItem.vue';

const LocalStorageKey = "todoApp--todos";

const persistedTodosJson = localStorage.getItem(LocalStorageKey);
const todos: Ref<TodoItem[]> = ref(persistedTodosJson != null ? JSON.parse(persistedTodosJson) : []);
const input: Ref<string> = ref("");

function handleCreateTodo(e: Event) {
  e.preventDefault();
  todos.value.push(TodoItemUtils.createTodoItem(input.value))
  localStorage.setItem(LocalStorageKey, JSON.stringify(todos.value));
  input.value = "";
}

function receiveCheck(i: number) {
  todos.value[i].done = !todos.value[i].done;
  localStorage.setItem(LocalStorageKey, JSON.stringify(todos.value));
}

function handleClear() {
  todos.value = todos.value.filter(i => !i.done);
  localStorage.setItem(LocalStorageKey, JSON.stringify(todos.value));
}

</script>

<template>
  <div class="app-container">
    <div class="flex-column">
      <h1>To Do</h1>
      <p v-if="todos.length === 0">There are no todos ☀️</p>
      <ul class="list-container" v-else>
        <li v-for="(item, i) in todos">
          <TodoItemComponent :item="item" :i="i" @check="receiveCheck" />
        </li>
      </ul>
      <form>
        <input class="input-text" type="text" id="description" v-model="input">
        <button class="create-todo-button" @click="handleCreateTodo">create todo</button>
      </form>
      <button v-if="todos.length > 0" class="create-todo-button" @click="handleClear">Clear done</button>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
}

.flex-column {
  display: flex-column;
  text-align: center;
}

.create-todo-button {
  background-color: var(--primary);
  color: var(--text);
  border: 0;
  width: 70%;
  height: 2rem;
  padding: 3px;
  margin-bottom: 10px;
  border-radius: 0.5rem;
}

.input-text {
  background-color: var(--background);
  border: 1;
  border-color: var(--primary);
  margin-bottom: 10px;
  color: var(--text);
}

.list-container {
  list-style-type: none;
  padding-left: 0;
  text-align: left;
}
</style>
