import React, { useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {AdvancedCheckbox} from 'react-native-advanced-checkbox';
import {Todo} from '../types/todo';
import ConfirmModal from './common/ConfirmModal';
import {Colors} from '../utils/colors';

type Props = {
  todo: Todo;
  handleToggleComplete: (id: number) => void;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, updatedData: Partial<Todo>) => void;
};

const TodoItem: React.FC<Props> = ({
  todo,
  handleToggleComplete,
  handleDelete,
  handleUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSave = () => {
    if (editTitle.trim()) {
      handleUpdate(todo.id, {title: editTitle});
    }
    setIsEditing(false);
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(todo.id);
    setShowConfirm(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.ctaContainer}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editTitle}
            onChangeText={setEditTitle}
            onBlur={handleSave}
            onSubmitEditing={handleSave}
            autoFocus={true}
          />
        ) : (
          <View style={styles.taskNameWrapper}>
            <AdvancedCheckbox
              value={todo.completed}
              onValueChange={() => handleToggleComplete(todo.id)}
              checkedColor={Colors.ctaTertiary}
              uncheckedColor="white"
              size={22}
            />
            <Text style={[styles.text, todo.completed && styles.completedText]}>
              {todo.title}
            </Text>
          </View>
        )}
        <TouchableOpacity style={styles.editButton} onPress={handleEditClick}>
          <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setShowConfirm(true)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        visible={showConfirm}
        message="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    shadowColor: Colors.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    color: Colors.textPrimary,
    fontSize: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 10,
    flex: 1,
    maxHeight: 60,
  },
  taskNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    color: Colors.textPrimary,
    alignSelf: 'center',
    paddingRight: 5,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  ctaContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    backgroundColor: Colors.ctaSecondary,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    justifyContent: 'center',
    marginLeft: 'auto',
    alignSelf: 'center',
  },
  deleteButton: {
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {color: Colors.textPrimary, fontWeight: 'bold'},
});

export default TodoItem;
