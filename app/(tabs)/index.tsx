import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery } from 'convex/react';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/Header';
import TodoFeatures from '../../components/TodoFeatures';
import TodoInput from '../../components/TodoInput';
import TodoList from '../../components/TodoList';
import TodoStatus from '../../components/TodoStatus';
import { api } from '../../convex/_generated/api';

export default function App() {
    const [input, setInput] = useState('');
    const [filter, setFilter] = useState('All');
    const [theme, setTheme] = useState('light');
    
    // Convex hooks
    const todos = useQuery(api.todos.getTodos) || [];
    const addTodo = useMutation(api.todos.addTodo);
    const toggleTodo = useMutation(api.todos.toggleTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const clearCompleted = useMutation(api.todos.clearCompleted);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            }
        } catch (error) {
            console.log('Error loading theme:', error);
        }
    };

    function handleChange(text: string) {
        setInput(text);
    }

    async function addItem() {
        if (input.trim() !== '') {
            await addTodo({ text: input });
            setInput('');
        }
    }

    async function handleCheck(id: any) {
        await toggleTodo({ id });
    }

    async function handleDeleteItem(id: any) {
        await deleteTodo({ id });
    }

    async function handleClearCompleted() {
        await clearCompleted();
    }

    // Filter todos
    const filteredItems = todos.filter(item => {
        if (filter === 'Active') return !item.checked;
        if (filter === 'Completed') return item.checked;
        return true;
    });

    const isDark = theme === 'dark';

    return (
        <SafeAreaView style={[
            styles.container,
            isDark && styles.containerDark
        ]}>
            <Header theme={theme} setTheme={setTheme} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.main}>
                    <TodoInput 
                        handleChange={handleChange} 
                        addItem={addItem} 
                        input={input}
                        theme={theme}
                    />
                    
                    <View style={[
                        styles.todoList,
                        isDark && styles.todoListDark
                    ]}>
                        {filteredItems.map((item) => (
                            <TodoList
                                key={item._id}
                                list={item.text}
                                checked={item.checked}
                                handleCheck={() => handleCheck(item._id)}
                                handleDeleteItem={() => handleDeleteItem(item._id)}
                                filter={filter}
                                theme={theme}
                            />
                        ))}
                    </View>

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
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hsl(236, 33%, 92%)',    // CSS: var(--main-background-color) light
    },
    containerDark: {
        backgroundColor: 'hsl(235, 21%, 11%)',    // CSS: var(--main-background-color) dark
    },
    scrollView: {
        flex: 1,
    },
    main: {
        paddingHorizontal: 24,                    // CSS: margin: 0 1.5rem (1.5rem = 24px)
        marginTop: -80,                           // CSS: margin-top: -5rem (-80px)
        maxWidth: 500,                            // CSS: width: 500px (for tablet/desktop)
        width: '100%',
        alignSelf: 'center',                      // CSS: margin: 0 auto (centers content)
    },
    todoList: {
        backgroundColor: 'hsl(0, 0%, 98%)',       // CSS: var(--background-color) light
        borderTopLeftRadius: 4.8,                 // CSS: border-radius: .3rem
        borderTopRightRadius: 4.8,
        overflow: 'hidden',
    },
    todoListDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',    // CSS: var(--background-color) dark
    },
});