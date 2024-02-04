import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export const useGuideScreen = () => {
    const [showGuideScreen, setShowGuideScreen] = useState(true);

    useEffect(() => {
        const checkGuideScreenStatus = async () => {
            try {
                const hasShownGuideScreen = await AsyncStorage.getItem('hasShownGuideScreen');
                setShowGuideScreen(hasShownGuideScreen !== 'true');
            } catch (error) {
                console.error('Error retrieving guide screen status:', error);
            }
        };

        checkGuideScreenStatus();
    }, []);

    const handleGuideScreenClose = () => {
        setShowGuideScreen(false);
    };

    return { showGuideScreen, handleGuideScreenClose };
};
