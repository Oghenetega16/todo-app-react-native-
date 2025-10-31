import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    theme: string;
    setTheme: (theme: string) => void;
}

export default function Header({ theme, setTheme }: HeaderProps) {
    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        try {
            await AsyncStorage.setItem('theme', newTheme);
        } catch (error) {
            console.log('Error saving theme:', error);
        }
    };

    // Background images (replace with your actual image paths)
    const backgroundImage = theme === 'light' 
        ? require('./assets/images/bg-mobile-light.jpg')
        : require('./assets/images/bg-mobile-dark.jpg');

    return (
        <ImageBackground 
            source={backgroundImage}
            style={styles.header}
            resizeMode="cover"
        >
            <View style={styles.headerContent}>
                <Text style={styles.title}>TODO</Text>
                <TouchableOpacity onPress={toggleTheme}>
                    <Text style={styles.icon}>
                        {theme === 'light' ? '🌙' : '☀️'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 40,           // CSS: 2rem (32px) - adjusted for mobile
        paddingBottom: 128,       // CSS: 8rem (128px)
        paddingHorizontal: 24,    // CSS: 1.5rem (24px)
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 500,            // CSS: width: 500px
        width: '100%',
        alignSelf: 'center',      // CSS: margin: 0 auto (centers content)
    },
    title: {
        fontSize: 25,             // CSS: 25px
        fontWeight: 'bold',
        color: '#fff',            // CSS: color: white
        letterSpacing: 9.6,       // CSS: .6rem (≈9.6px at base 16px)
        fontFamily: 'Josefin Sans',
    },
    icon: {
        fontSize: 24,
    },
});