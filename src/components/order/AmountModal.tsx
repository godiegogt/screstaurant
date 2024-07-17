import { Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { Button } from '@rneui/themed';
import { FormInput } from '../common';
import Theme from '../../constants/Theme';


type AmountModalProps = {
    amount: number;
    changeAmount: (amount: number) => void;
    isVisible: boolean;
    toggle: () => void
}
const AmountModal: FC<AmountModalProps> = ({ amount, changeAmount, isVisible, toggle }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            style={{ backgroundColor: '#000' }}
            visible={isVisible}
            onRequestClose={() => {
                toggle()
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Cantidad:</Text>
                    <TextInput value={amount.toString()} onChangeText={(amount2: string) => { changeAmount(parseInt(amount2)) }} keyboardType='numeric' />
                    <Button onPress={toggle}>Aceptar</Button>
                </View>
            </View>
        </Modal>
    )
}

export default AmountModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',

    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300
    },
    modalTitle:{
        marginBottom:Theme.sizes.BASE
    }
})