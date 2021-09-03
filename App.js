import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = 'e3444d8542391ff99261001ff7fcb214'
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'



export default function App() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitsSystem, setUnitsSystem] = useState('metric')

    useEffect(() => {

        load()

    }, [unitsSystem])
    async function load() {
        setCurrentWeather(null)
        setErrorMessage(null)
        try {
            let { status } = await Location.requestPermissionsAsync()

            if (status !== 'granted') {
                setErrorMessage('Please allow Location to run the application')
                return
            }
            const location = await Location.getCurrentPositionAsync()
            

            const { latitude, longitude } = location.coords

           const weatherURL = `${WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${API_KEY}`
           



            const response = await fetch(weatherURL)

            const result = await response.json()

            if (response.ok) {
                setCurrentWeather(result)
            } else {
                setErrorMessage(result.message)
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    if (currentWeather) {
        const { main: { temp }, } = currentWeather
        return (
            <View style={styles.container}>
                <Text>{temp}</Text>
                <StatusBar style="auto" />
            </View>
        )
    } else {
            return (
                <View style={styles.container}>
                    <Text>{errorMessage}</Text>
                    <StatusBar style="auto" />
                </View>
            )
        }
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
