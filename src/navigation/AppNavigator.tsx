import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import AddTodoScreen from '../screens/AddTodoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Todo" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Todo" component={MainScreen} />
      <Stack.Screen name="AddTodo" component={AddTodoScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
