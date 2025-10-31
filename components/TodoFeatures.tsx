import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TodoFeaturesProps {
    setFilter: (filter: string) => void;
    filter: string;
    theme?: 'light' | 'dark';  // Add theme prop
}

export default function TodoFeatures({ setFilter, filter, theme = 'light' }: TodoFeaturesProps) {
    const isDark = theme === 'dark';
    
    return (
        <View style={[
            styles.container,
            isDark && styles.containerDark
        ]}>
            <TouchableOpacity onPress={() => setFilter('All')}>
                <Text style={[
                    styles.text,
                    isDark && styles.textDark,
                    filter === 'All' && styles.activeText
                ]}>
                    All
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setFilter('Active')}>
                <Text style={[
                    styles.text,
                    isDark && styles.textDark,
                    filter === 'Active' && styles.activeText
                ]}>
                    Active
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setFilter('Completed')}>
                <Text style={[
                    styles.text,
                    isDark && styles.textDark,
                    filter === 'Completed' && styles.activeText
                ]}>
                    Completed
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',                     // CSS: display: flex
        justifyContent: 'center',                 // CSS: justify-content: center
        alignItems: 'center',
        backgroundColor: 'hsl(0, 0%, 98%)',       // CSS: var(--background-color) light
        padding: 20.8,                            // CSS: padding: 1.3rem (≈20.8px)
        paddingHorizontal: 16,                    // CSS: padding: 1.3rem 1rem
        marginTop: 16,                            // CSS: margin-top: 1rem
        borderRadius: 4.8,                        // CSS: border-radius: 0.3rem
        gap: 24,                                  // CSS: gap: 1.5rem (≈24px)
    },
    containerDark: {
        backgroundColor: 'hsl(235, 24%, 19%)',    // CSS: var(--background-color) dark
    },
    text: {
        fontSize: 12,                             // CSS: font-size: 12px (inherited from .main)
        color: 'hsl(236, 9%, 61%)',              // CSS: var(--feature-color) light
        fontWeight: '700',                        // CSS: font-weight: 700
        fontFamily: 'Josefin Sans',               // CSS: font-family: "Josefin Sans"
    },
    textDark: {
        color: 'hsl(234, 11%, 52%)',             // CSS: var(--feature-color) dark
    },
    activeText: {
        color: 'hsl(220, 98%, 61%)',             // CSS: var(--active-color)
    },
});