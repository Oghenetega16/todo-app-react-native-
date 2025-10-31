import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodoStatusProps {
    items: any[];
    filter: string;
    clearCompleted: () => void;
    theme?: 'light' | 'dark';  // Add theme prop
}

export default function TodoStatus({ items, filter, clearCompleted, theme = 'light' }: TodoStatusProps) {
    const isDark = theme === 'dark';
    
    let filteredCount = 0;
    
    if (filter === 'All') {
        filteredCount = items.length;
    } else if (filter === 'Active') {
        filteredCount = items.filter(item => !item.checked).length;
    } else if (filter === 'Completed') {
        filteredCount = items.filter(item => item.checked).length;
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
                ]}>
                    Clear Completed
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',                     // CSS: display: flex
        justifyContent: 'space-between',          // CSS: justify-content: space-between
        alignItems: 'center',
        backgroundColor: 'hsl(0, 0%, 98%)',       // CSS: var(--background-color) light
        padding: 20.8,                            // CSS: padding: 1.3rem (≈20.8px)
        paddingHorizontal: 16,                    // CSS: padding: 1.3rem 1rem
        borderBottomLeftRadius: 4.8,              // CSS: border-radius: 0 0 0.3rem 0.3rem
        borderBottomRightRadius: 4.8,
    },
    containerDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',    // CSS: var(--background-color) dark
    },
    text: {
        fontSize: 12,                             // CSS: font-size: 12px (from .main)
        color: 'hsl(236, 9%, 61%)',              // CSS: var(--feature-color) light
        fontFamily: 'Josefin Sans',               // CSS: font-family: "Josefin Sans"
    },
    textDark: {
        color: 'hsl(234, 11%, 52%)',             // CSS: var(--feature-color) dark
    },
    clearText: {
        fontSize: 12,                             // CSS: font-size: 12px
        color: 'hsl(236, 9%, 61%)',              // CSS: var(--feature-color) light
        fontFamily: 'Josefin Sans',
    },
    clearTextDark: {
        color: 'hsl(234, 11%, 52%)',             // CSS: var(--feature-color) dark
    },
});