import React, { useState } from 'react'
import { View, Text, StyleSheet, Button} from "react-native";

const HomeScreen = (props) => {

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Metronome" onPress={() => props.navigation.navigate('Metronome')}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 48
    }
})

export default HomeScreen
