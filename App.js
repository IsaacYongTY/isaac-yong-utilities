import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

    const [ bpm, setBpm ] = useState(75)
    const [ count, setCount ] = useState(0)
    const [ bpmColor, setBpmColor ] = useState('rgb(0,0,0)')

    let startTime = useRef(0)
    let totalTimeLapsed = useRef(0)

    const calculateBPM = () => {

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
                setBpmColor('rgb(0,0,0)')
            }
        }

        startTime.current = Date.now()
        setCount(count + 1)

    }

    const handleReset = () => {
        setBpm(0)
        setCount(0)
        totalTimeLapsed.current = 0
        startTime.current = Date.now()
    }

      return (
        <View style={styles.container}>
          <Text style={[styles.metronomeNumStyle, { color: `${bpmColor}`}]}>{bpm}</Text>
          <Button title="Tap" onPress={calculateBPM}/>
          <Button title="Reset" onPress={handleReset} />
          <Button title="Show Decimal" />
          <Button title="Play" />
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

  metronomeNumStyle: {
    fontSize: 72,


  }
});
