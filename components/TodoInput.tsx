import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface TodoInputProps {
    input: string;
    handleChange: (text: string) => void;
    addItem: () => void;
    theme?: 'light' | 'dark';  // Add theme prop
}

export default function TodoInput({ input, handleChange, addItem, theme = 'light' }: TodoInputProps) {
    const isDark = theme === 'dark';
    
    return (
        <View style={[
            styles.container,
            isDark && styles.containerDark
        ]}>
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
                placeholderTextColor={isDark ? 'hsl(234, 11%, 52%)' : 'hsl(236, 9%, 61%)'}
                returnKeyType="done"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'hsl(0, 0%, 98%)',      // CSS: var(--background-color) light
        borderRadius: 4.8,                        // CSS: .3rem (≈4.8px)
        height: 50,                               // CSS: height: 50px
        paddingHorizontal: 16,                    // CSS: padding: 0 1rem
        marginBottom: 16,                         // CSS: margin-bottom: 1rem
        gap: 12.8,                                // CSS: gap: .8rem (≈12.8px)
    },
    containerDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',   // CSS: var(--background-color) dark
    },
    circle: {
        width: 20,                                // CSS: width: 20px
        height: 20,                               // CSS: height: 20px
        borderRadius: 50,                         // CSS: border-radius: 50px
        borderWidth: 1,                           // CSS: border: 1px solid
        borderColor: 'hsl(236, 9%, 61%)',        // CSS: var(--feature-color) light
    },
    circleDark: {
        borderColor: 'hsl(234, 11%, 52%)',       // CSS: var(--feature-color) dark
    },
    input: {
        flex: 1,
        fontSize: 12,                             // CSS: font-size: 12px
        color: 'hsl(235, 19%, 35%)',             // CSS: var(--text-color) light
        fontFamily: 'Josefin Sans',              // CSS: font-family: "Josefin Sans"
    },
    inputDark: {
        color: 'hsl(234, 39%, 85%)',             // CSS: var(--text-color) dark
    },
});