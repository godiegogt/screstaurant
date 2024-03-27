import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Button } from '@rneui/themed'
import { materialTheme } from '../../constants'

interface INumberButton {
    title: string,
    onPress: (text: string) => void
}

const NumberButton: FC<INumberButton> = ({ title, onPress }) => {

    const [number, setNumber] = useState(title)



    return (

        <Button onPress={() => { onPress(title) }} type='outline' containerStyle={styles.buttonContainer} title={title} buttonStyle={styles.buttonStyle} titleStyle={{ color: materialTheme.colors.primary }} color={materialTheme.colors.primary} />

    )
}

export default NumberButton

const styles = StyleSheet.create({
    buttonContainer: { borderWidth: 3, 
        borderColor: materialTheme.colors.primary, 
        borderRadius: 10 ,
        margin:materialTheme.sizes.BASE/4
    },
    buttonStyle: { width: 55, 
        height: 55, 
        borderColor: 'transparent' 
    }
})