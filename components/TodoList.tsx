import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodoListProps {
    list: string;
    checked: boolean;
    handleCheck: () => void;
    handleDeleteItem: () => void;
    filter: string;
}

export default function TodoList({ 
    list, 
    checked, 
    handleCheck, 
    handleDeleteItem, 
    filter 
}: TodoListProps) {
    return (
        <View style={styles.todoItem}>
            <View style={styles.row}>
                <TouchableOpacity 
                onPress={handleCheck}
                style={[
                    styles.circle,
                    checked && styles.circleChecked
                ]}
                >
                    {checked && <Text style={styles.checkIcon}>✓</Text>}
                </TouchableOpacity>
                <Text 
                    style={[
                        styles.todoText,
                        checked && styles.todoTextChecked
                    ]}
                    >
                    {list}
                </Text>
            </View>
            
            {(filter === 'Active' || filter === 'Completed') && (
                <TouchableOpacity onPress={handleDeleteItem}>
                    <Text style={styles.closeIcon}>×</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#d1d5db',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleChecked: {
        backgroundColor: '#5e72e4',
        borderColor: '#5e72e4',
    },
    checkIcon: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    todoText: {
        fontSize: 16,
        color: '#000',
        flex: 1,
    },
    todoTextChecked: {
        textDecorationLine: 'line-through',
        color: '#9ca3af',
    },
    closeIcon: {
        fontSize: 28,
        color: '#9ca3af',
        fontWeight: '300',
    },
});