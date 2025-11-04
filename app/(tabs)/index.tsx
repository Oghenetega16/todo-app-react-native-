import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Add this import
// @ts-ignore - Convex generated types
import DraggableTodoList from '../../components/DraggableTodoList';
import TodoFeatures from '../../components/TodoFeatures';
import TodoInput from '../../components/TodoInput';
import TodoStatus from '../../components/TodoStatus';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

interface Todo {
    _id: Id<"todos">;
    text: string;
    checked: boolean;
    createdAt: number;
    order?: number;
}

export default function App() {
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('All');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    
    // Load theme from AsyncStorage
    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme === 'light' || savedTheme === 'dark') {
                setTheme(savedTheme);
            }
        } catch (error) {
            console.log('Error loading theme:', error);
        }
    };

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
            await AsyncStorage.setItem('theme', newTheme);
        } catch (error) {
            console.log('Error saving theme:', error);
        }
    };

    const isDark = theme === 'dark';

    // Background images
    const backgroundImage = theme === 'light' 
        ? require('../../assets/images/bg-mobile-light.jpg')
        : require('../../assets/images/bg-mobile-dark.jpg');

    // Theme toggle icons
    const themeIcon = theme === 'light'
        ? require('../../assets/images/icon-moon.png')
        : require('../../assets/images/icon-sun.png');

    const todoLogo = require('../../assets/images/todo-logo.png');
    
    // Convex hooks
    const todos = useQuery(api.todos.getTodos) as Todo[] | undefined;
    const addTodo = useMutation(api.todos.addTodo);
    const toggleTodo = useMutation(api.todos.toggleTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const clearCompleted = useMutation(api.todos.clearCompleted);

    function handleChange(text: string) {
        setInput(text);
    }

    async function addItem() {
        if (input.trim() !== '') {
            await addTodo({ text: input });
            setInput('');
        }
    }

    async function handleCheck(id: Id<"todos">) {
        await toggleTodo({ id });
    }

    async function handleDeleteItem(id: Id<"todos">) {
        await deleteTodo({ id });
    }

    async function handleClearCompleted() {
        await clearCompleted();
    }

    // Filter todos
    const filteredItems = (todos || []).filter((item: Todo) => {
        if (filter === 'Active') return !item.checked;
        if (filter === 'Completed') return item.checked;
        return true;
    });

    const reorderTodos = useMutation(api.todos.reorderTodos);

    async function handleReorder(reorderedTodos: Todo[]) {
        const updates = reorderedTodos.map((todo, index) => ({
            id: todo._id,
            order: index
        }));
        await reorderTodos({ todos: updates });
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={[
                styles.container,
                isDark && styles.containerDark
            ]}>
                {/* Background Image Header */}
                <ImageBackground 
                    source={backgroundImage}
                    style={styles.headerBackground}
                    resizeMode="cover"
                >
                    <View style={styles.headerContent}>
                        <Image source={todoLogo} style={styles.logoImage} />
                        <TouchableOpacity onPress={toggleTheme}>
                            <Image source={themeIcon} style={styles.iconImage} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                {/* Main Content - Changed from ScrollView to View */}
                <View style={styles.mainContainer}>
                    <View style={styles.main}>
                        <TodoInput 
                            handleChange={handleChange} 
                            addItem={addItem} 
                            input={input}
                            theme={theme}
                        />
                
                        {todos && (
                            <>
                                <DraggableTodoList
                                    todos={filteredItems}
                                    onDragEnd={handleReorder}
                                    handleCheck={handleCheck}
                                    handleDeleteItem={handleDeleteItem}
                                    filter={filter}
                                    theme={theme}
                                />

                                <TodoStatus 
                                    items={todos} 
                                    filter={filter} 
                                    clearCompleted={handleClearCompleted}
                                    theme={theme}
                                />
                                
                                <TodoFeatures 
                                    setFilter={setFilter} 
                                    filter={filter}
                                    theme={theme}
                                />

                                <Text style={[
                                    styles.dragText,
                                    isDark && styles.dragTextDark
                                ]}>
                                    Drag and drop to reorder list
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hsl(236, 33%, 92%)',
    },
    containerDark: {
        backgroundColor: 'hsl(235, 21%, 11%)',
    },
    headerBackground: {
        height: 250,
        paddingHorizontal: 24,
        paddingTop: 68,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    logoImage: {
        width: 120,
        height: 30,
        resizeMode: 'contain',
    },
    iconImage: {
        width: 26,
        height: 26,
    },
    mainContainer: {  // New style
        flex: 1,
        marginTop: -140,
    },
    main: {
        paddingHorizontal: 24,
        marginTop: 30,
        width: '100%',
        flex: 1,  // Added
    },
    todoList: {
        backgroundColor: 'hsl(0, 0%, 98%)',
        borderRadius: 5,
        overflow: 'hidden',
    },
    todoListDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',
    },
    dragText: {
        textAlign: 'center',
        color: 'hsl(236, 9%, 61%)',
        fontSize: 14,
        marginTop: 40,
        marginBottom: 20,
        fontFamily: 'JosefinSans_400Regular',
    },
    dragTextDark: {
        color: 'hsl(234, 11%, 52%)',
    },
});