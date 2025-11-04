import React from 'react';
import { StyleSheet, View } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { Id } from '../convex/_generated/dataModel';
import TodoList from './TodoList';

interface Todo {
    _id: Id<"todos">;
    text: string;
    checked: boolean;
    createdAt: number;
    order?: number;  // Changed from 'order: number' to 'order?: number'
}

interface DraggableTodoListProps {
    todos: Todo[];
    onDragEnd: (data: Todo[]) => void;
    handleCheck: (id: Id<"todos">) => void;
    handleDeleteItem: (id: Id<"todos">) => void;
    filter: string;
    theme: string;
}

export default function DraggableTodoList({
    todos,
    onDragEnd,
    handleCheck,
    handleDeleteItem,
    filter,
    theme
}: DraggableTodoListProps) {
    const isDark = theme === 'dark';

    const renderItem = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
        return (
            <ScaleDecorator>
                <View style={[isActive && styles.dragging]}>
                    <TodoList
                        list={item.text}
                        checked={item.checked}
                        handleCheck={() => handleCheck(item._id)}
                        handleDeleteItem={() => handleDeleteItem(item._id)}
                        filter={filter}
                        theme={theme}
                        onLongPress={drag}
                    />
                </View>
            </ScaleDecorator>
        );
    };

    return (
        <View style={[
            styles.container,
            isDark && styles.containerDark
        ]}>
            <DraggableFlatList
                data={todos}
                onDragEnd={({ data }) => onDragEnd(data)}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'hsl(0, 0%, 98%)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    containerDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',
    },
    dragging: {
        opacity: 0.7,
    },
});