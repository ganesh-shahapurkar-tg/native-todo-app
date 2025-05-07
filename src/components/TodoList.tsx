// TodoList.js
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface Props {
  todos: Todo[];
  handleToggleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, data: Partial<Todo>) => void;
}

const TodoList = ({
  todos,
  handleToggleComplete,
  handleDelete,
  handleUpdate,
}:Props) => {
  return (
    <FlatList
      contentContainerStyle={styles.listContainer}
      data={todos}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <TodoItem
          todo={item}
          handleToggleComplete={handleToggleComplete}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
  },
});

export default TodoList;
