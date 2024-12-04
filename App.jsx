import { View, Text, LogBox } from 'react-native'
import React from 'react'
import './gesture-handler';
import Mapbox from '@rnmapbox/maps'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './src/navigation/StackNavigation'
import fetchFcmToken from './src/utils/fcmToken';
Mapbox.setAccessToken('sk.eyJ1IjoibmdvY21hbmgxNjA3IiwiYSI6ImNtM2N5bzY5dDFxbDIyanIxbDEycXg0bGwifQ.M2rY0iFiThl6Crjp6kr_GQ')
LogBox.ignoreAllLogs(true);
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App