import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import {Todo} from '../types/todo';
import {todoStore} from '../stores/TodoStore';
import {Colors} from '../utils/colors';

type RootStackParamList = {
  Main: undefined;
  AddTodo: undefined;
};

type AddTodoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddTodo'
>;

const AddTodoScreen: React.FC = observer(() => {
  const [title, setTitle] = useState('');
  const navigation = useNavigation<AddTodoScreenNavigationProp>();

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a todo title');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todoStore.addTodo(newTodo);
    setTitle('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter a new todo task: </Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="e.g. Buy groceries"
        placeholderTextColor={Colors.textHint}
        autoFocus={true}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    color: Colors.textPrimary,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 20,
  },

  addButton: {
    backgroundColor: Colors.ctaMain,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  addButtonText: {
    color: Colors.textPrimary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTodoScreen;
