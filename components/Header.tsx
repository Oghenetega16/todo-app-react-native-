import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
    theme: 'light' | 'dark';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
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

    // TODO logo image
    const todoLogo = require('../assets/images/todo-logo.png'); // Update with your actual logo path

    // Background images
    const backgroundImage = theme === 'light' 
        ? require('../assets/images/bg-mobile-light.jpg')
        : require('../assets/images/bg-mobile-dark.jpg');

    // Theme toggle icons
    const themeIcon = theme === 'light'
        ? require('../assets/images/icon-moon.png')
        : require('../assets/images/icon-sun.png');

    return (
        <ImageBackground 
            source={backgroundImage}
            style={styles.header}
            resizeMode="cover"
        >
            <View style={styles.headerContent}>
                <Image source={todoLogo} style={styles.logoImage} />
                <TouchableOpacity onPress={toggleTheme}>
                    <Image source={themeIcon} style={styles.iconImage} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 200,
        paddingHorizontal: 24,
        paddingTop: 48,
        position: 'relative', 
    },
    headerContent: {
        paddingBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        alignSelf: 'center',
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
});