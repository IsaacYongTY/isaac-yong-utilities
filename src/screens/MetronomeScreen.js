import React, {useRef, useState} from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {Audio} from "expo-av";
import {StatusBar} from "expo-status-bar";
import * as Haptics from 'expo-haptics'
import {TouchableOpacity} from "react-native";

const MetronomeScreen = () => {

    const [ bpm, setBpm ] = useState(75)
    const [ displayBpm, setDisplayBpm ] = useState(0)
    const [ count, setCount ] = useState(0)
    const [ bpmColor, setBpmColor ] = useState('rgb(0,0,0)')
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ isDecimal, setIsDecimal ] = useState(true)
    let startTime = useRef(0)
    let totalTimeLapsed = useRef(0)


    const calculateBPM = async () => {

        await Haptics.selectionAsync()
        const idleTime = 2000

        if(Date.now() - startTime.current>= idleTime) {
            handleReset()
            setCount(1)
            setBpmColor('rgb(255,0,0)')
            return
        }

        if(count) {

            totalTimeLapsed.current += (Date.now() - startTime.current)

            let averageTimeLapsed = totalTimeLapsed.current / count

            if (count > 1) {
                setBpm((1/(averageTimeLapsed/60000)).toFixed(1))
                setDisplayBpm((1/(averageTimeLapsed/60000)).toFixed(1))
                setBpmColor('rgb(0,0,0)')
            }
        }

        startTime.current = Date.now()
        setCount(count + 1)



    }

    const handleReset = () => {
        setBpm(0)
        setDisplayBpm(0)
        setCount(0)
        totalTimeLapsed.current = 0
        startTime.current = Date.now()
    }

    const handlePlay = async () => {
        console.log('Button is tapped')

        const soundObject = new Audio.Sound()

        let source = require('../../assets/audios/metronome-sound.mp3')

        await soundObject.loadAsync(source)
        soundObject.setIsLoopingAsync(true)

        console.log(source)

        setInterval(async () => {
            await soundObject.playAsync()

        }, 1/bpm/60 * 1000)



    }

    const toggleDecimal = () => {
        setIsDecimal(!isDecimal)
        setDisplayBpm(Number(bpm).toFixed(!isDecimal ? 1 : 0))


    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={calculateBPM}>
                <View style={styles.metronomeContainerStyle} onPress={calculateBPM}>
                    <Text style={[styles.metronomeNumStyle, { color: `${bpmColor}`}]}>{isDecimal ? bpm : displayBpm}</Text>
                </View>
            </TouchableOpacity>


            <Button title="Tap" onPress={calculateBPM}/>
            <Button title="Reset" onPress={handleReset} />
            <Button title="Show Decimal" onPress={toggleDecimal} />
            <Button title="Play" onPress={handlePlay}/>
            <Text>{count}</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f19a',
        alignItems: 'center',
        justifyContent: 'center',
    },

    metronomeContainerStyle: {

        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'lightblue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    metronomeNumStyle: {
        fontSize: 72,
    }
});



export default MetronomeScreen