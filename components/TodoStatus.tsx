import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Todo {
  checked: boolean;
  [key: string]: any;
}

interface TodoStatusProps {
  items: Todo[];
  filter: string;
  clearCompleted: () => void;
  theme?: string;
}

export default function TodoStatus({ items, filter, clearCompleted, theme = 'light' }: TodoStatusProps) {
  const isDark = theme === 'dark';
  let filteredCount = 0;
  
  if (filter === 'All') {
    filteredCount = items.length;
  } else if (filter === 'Active') {
    filteredCount = items.filter((item: Todo) => !item.checked).length;
  } else if (filter === 'Completed') {
    filteredCount = items.filter((item: Todo) => item.checked).length;
  }

  return (
    <View style={[
      styles.container,
      isDark && styles.containerDark
    ]}>
      <Text style={[
        styles.text,
        isDark && styles.textDark
      ]}>
        {filteredCount} {filteredCount === 0 || filteredCount === 1 ? 'item' : 'items'} {filter.toLowerCase()}
      </Text>
      <TouchableOpacity onPress={clearCompleted}>
        <Text style={[
          styles.clearText,
          isDark && styles.clearTextDark
        ]}>Clear Completed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'hsl(0, 0%, 98%)',
    padding: 20.8,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 4.8,
    borderBottomRightRadius: 4.8,
  },
  containerDark: {
    backgroundColor: 'hsl(235, 24%, 19%)',
  },
  text: {
    fontSize: 12,
    color: 'hsl(236, 9%, 61%)',
    fontFamily: 'JosefinSans_400Regular',  // Added
  },
  textDark: {
    color: 'hsl(234, 11%, 52%)',
  },
  clearText: {
    fontSize: 12,
    color: 'hsl(236, 9%, 61%)',
    fontFamily: 'JosefinSans_400Regular',  // Added
  },
  clearTextDark: {
    color: 'hsl(234, 11%, 52%)',
  },
});