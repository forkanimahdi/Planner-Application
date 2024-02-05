import { View, Text } from 'react-native'
import React from 'react'
import { useGuideScreen } from '../../../utils/context/GuidingProvider/GuidingProvider';
import AuthNavigation from '../../Navigation/AuthNavigation/AuthNavigation';
import GuideScreen from '../GuideScreen/GuideScreen';

export default function Authentification() {
    const { showGuideScreen, handleGuideScreenClose } = useGuideScreen();

  return (
   <>
    {showGuideScreen  && <GuideScreen onGuideScreenClose={handleGuideScreenClose} />}
    {!showGuideScreen && (
      <AuthNavigation />
    )}

   </>
  )
}