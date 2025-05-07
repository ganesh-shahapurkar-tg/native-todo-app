import axios from 'axios';
import { Todo } from '../../types/todo';

export async function fetchTodos(): Promise<Todo[]> {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=20');
  return response.data.map((todo: any) => ({
    ...todo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}
