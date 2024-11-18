import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './src/screens/LoginScreen'
import Mapbox from '@rnmapbox/maps'
import SignupScreen from './src/screens/SignupScreen'
import AuthScreen from './src/screens/AuthScreen'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigation from './src/navigation/StackNavigation'
Mapbox.setAccessToken('sk.eyJ1IjoibmdvY21hbmgxNjA3IiwiYSI6ImNtM2N5bzY5dDFxbDIyanIxbDEycXg0bGwifQ.M2rY0iFiThl6Crjp6kr_GQ')
const App = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App