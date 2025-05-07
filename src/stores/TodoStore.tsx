import { makeAutoObservable, runInAction } from 'mobx';
import { Todo } from '../types/todo';
import { fetchTodos } from '../utils/services/service';

// Define the TodoStore class
class TodoStore {
  todos: Todo[] = [];
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.loadTodos();
  }

  // Method to load todos from the API
  async loadTodos(): Promise<void> {
    this.loading = true;
    try {
      const todosData = await fetchTodos();
      runInAction(() => {
        this.todos = todosData;
        console.log('Loaded todos:', this.todos);
      });
    } catch (err) {
      console.error('Failed to load todos', err);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  // Method to add a new todo
  addTodo = (todo: Todo): void => {
    this.todos.unshift(todo);
  };

  // Method to update an existing todo
  updateTodo = (id: number, updatedData: Partial<Todo>): void => {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = {
        ...this.todos[index],
        ...updatedData,
        updatedAt: new Date().toISOString(),
      };
    }
  };

  // Method to delete a todo
  deleteTodo = (id: number): void => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  };

  // Method to toggle the completed status of a todo
  toggleComplete = (id: number): void => {
    const todo = this.todos.find(todoItem => todoItem.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      todo.updatedAt = new Date().toISOString();
    }
  };

  // Computed property to count completed todos
  get completedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  // Computed property to get the total count of todos
  get totalCount(): number {
    return this.todos.length;
  }

  get pendingCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }
}

// Create and export an instance of TodoStore
export const todoStore = new TodoStore();
