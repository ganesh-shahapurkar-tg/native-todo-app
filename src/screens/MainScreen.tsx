import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {todoStore} from '../stores/TodoStore';
import TodoList from '../components/TodoList';
import {Todo} from '../types/todo';
import {Colors} from '../utils/colors';

type RootStackParamList = {
  Main: undefined;
  AddTodo: undefined;
};

type FilterType = 'All' | 'Active' | 'Done';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const MainScreen: React.FC = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const [filter, setFilter] = useState<FilterType>('All');
  const [sortBy, setSortBy] = useState<'Recent' | 'ID'>('Recent');

  const filteredAndSortedTodos = () => {
    let result: Todo[] = [...todoStore.todos];

    // Filter
    if (filter === 'Active') {
      result = result.filter(todo => !todo.completed);
    } else if (filter === 'Done') {
      result = result.filter(todo => todo.completed);
    }

    // Sort
    if (sortBy === 'Recent') {
      result = result.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    } else {
      result = result.sort((a, b) => a.id - b.id);
    }

    return result;
  };

  const countsMap = {
    All: todoStore.totalCount,
    Active: todoStore.pendingCount,
    Done: todoStore.completedCount,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List</Text>
      </View>

      <View style={styles.buttonRow}>
        {['All', 'Active', 'Done'].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => setFilter(item as FilterType)}
            style={[
              styles.filterButton,
              filter === item && styles.activeFilterButton,
            ]}>
            <Text
              style={[
                styles.filterButtonText,
                filter === item && styles.activeFilterButtonText,
              ]}>
              {item} ({countsMap[item as FilterType]})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonRow}>
        <Text style={[styles.filterButtonText, styles.activeFilterButtonText]}>
          Sort By:
        </Text>
        <TouchableOpacity
          onPress={() => setSortBy('ID')}
          style={[
            styles.filterButton,
            sortBy === 'ID' && styles.activeFilterButton,
          ]}>
          <Text
            style={[
              styles.filterButtonText,
              sortBy === 'ID' && styles.activeFilterButtonText,
            ]}>
            ID
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSortBy('Recent')}
          style={[
            styles.filterButton,
            sortBy === 'Recent' && styles.activeFilterButton,
          ]}>
          <Text
            style={[
              styles.filterButtonText,
              sortBy === 'Recent' && styles.activeFilterButtonText,
            ]}>
            Recent
          </Text>
        </TouchableOpacity>
      </View>

      <TodoList
        todos={filteredAndSortedTodos()}
        handleToggleComplete={todoStore.toggleComplete}
        handleDelete={todoStore.deleteTodo}
        handleUpdate={todoStore.updateTodo}
      />
      <View style={styles.buttonRow}>
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTodo')}>
          <Text style={styles.addButtonText}>Add Todo</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  header: {
    paddingVertical: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: Colors.ctaMain,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    flex: 1,
  },
  addButtonText: {
    color: Colors.textPrimary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: 'transparent',
  },
  activeFilterButton: {
    backgroundColor: Colors.ctaPrimary,
    borderColor: Colors.ctaPrimary,
  },
  filterButtonText: {
    color: Colors.textHint,
    fontWeight: 'bold',
  },
  activeFilterButtonText: {
    color: Colors.textPrimary,
    fontWeight: 'bold',
  },
});

export default MainScreen;
