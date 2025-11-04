import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface TodoInputProps {
    input: string;
    handleChange: (text: string) => void;
    addItem: () => void;
    theme?: string;
}

export default function TodoInput({ input, handleChange, addItem, theme = 'light' }: TodoInputProps) {
    const isDark = theme === 'dark';

    return (
        <View style={[
            styles.container,
            isDark && styles.containerDark
            ]}
        >
            <View style={[
                styles.circle,
                isDark && styles.circleDark
            ]} />
            <TextInput
                style={[
                styles.input,
                isDark && styles.inputDark
                ]}
                value={input}
                onChangeText={handleChange}
                onSubmitEditing={addItem}
                placeholder="Create a new todo..."
                placeholderTextColor={isDark ? '#767992' : '#9ca3af'}
                returnKeyType="done"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
        minHeight: 56,
        zIndex: 100,
    },
    containerDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'hsl(236, 9%, 61%)',
        marginRight: 12,
    },
    circleDark: {
        borderColor: 'hsl(234, 11%, 52%)',
    },
    input: {
        flex: 1,
        fontSize: 12,
        color: 'hsl(235, 19%, 35%)',
        fontFamily: 'JosefinSans_400Regular',
    },
    inputDark: {
        color: 'hsl(234, 39%, 85%)',
    },
});