import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodoListProps {
    list: string;
    checked: boolean;
    handleCheck: () => void;
    handleDeleteItem: () => void;
    filter: string;
    theme?: string;
    onLongPress?: () => void;
}

export default function TodoList({ 
    list, 
    checked, 
    handleCheck, 
    handleDeleteItem, 
    filter,
    theme = 'light',
    onLongPress
}: TodoListProps) {
    const isDark = theme === 'dark';

    return (
        <View style={[
            styles.todoItem,
            isDark && styles.todoItemDark]}
            onTouchStart={onLongPress}
        >
            <View style={styles.row}>
                <TouchableOpacity 
                    onPress={handleCheck}
                    style={styles.circleContainer}
                >
                    {checked ? (
                        <LinearGradient
                            colors={['hsl(192, 100%, 67%)', 'hsl(280, 87%, 65%)']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.circleChecked}
                        >
                            <Image 
                                source={require('../assets/images/icon-check.png')} 
                                style={styles.checkIcon}
                            />
                        </LinearGradient>
                    ) : (
                        <View style={[
                            styles.circle,
                            isDark && styles.circleDark
                        ]} />
                    )}
                </TouchableOpacity>

                <Text 
                    style={[
                        styles.todoText,
                        isDark && styles.todoTextDark,
                        checked && styles.todoTextChecked,
                        checked && isDark && styles.todoTextCheckedDark
                    ]}
                >
                {list}
                </Text>
            </View>

            {(filter === 'Active' || filter === 'Completed') && (
                <TouchableOpacity onPress={handleDeleteItem}>
                    <Image 
                        source={require('../assets/images/icon-cross.png')} 
                        style={[
                            styles.closeIcon,
                            isDark && styles.closeIconDark
                        ]}
                    />
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
        backgroundColor: 'hsl(0, 0%, 98%)',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'hsl(236, 33%, 92%)',
    },
    todoItemDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',
        borderBottomColor: 'hsl(233, 14%, 35%)',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    circleContainer: {
        marginRight: 12,
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E3E4F1',
    },
    circleDark: {
        borderColor: 'hsl(234, 11%, 52%)',
    },
    circleChecked: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        width: 11,
        height: 9,
        resizeMode: 'contain',
    },
    todoText: {
        fontSize: 16,
        color: '#494C6B',
        flex: 1,
        fontFamily: 'JosefinSans_400Regular',
    },
    todoTextDark: {
        color: 'hsl(234, 39%, 85%)',
    },
    todoTextChecked: {
        textDecorationLine: 'line-through',
        color: 'hsl(233, 11%, 84%)',
    },
    todoTextCheckedDark: {
        color: 'hsl(234, 11%, 52%)',
    },
    closeIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        opacity: 0.5,
    },
    closeIconDark: {
        opacity: 0.7,
    },
});