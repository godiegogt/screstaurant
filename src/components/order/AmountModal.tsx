import { Modal, StyleSheet, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Button } from '@rneui/themed';
import { Text } from '../common';
import Theme from '../../constants/Theme';


type AmountModalProps = {
    amount: string;
    changeAmount: React.Dispatch<React.SetStateAction<string>>;
    isVisible: boolean;
    toggle: () => void,
    addOrder:()=>void
}
const AmountModal: FC<AmountModalProps> = ({ amount, changeAmount, isVisible, toggle,addOrder }) => {

    const [errormessage, seterrormessage] = useState('')
    // const _changeAmount = () => {
      
    //     console.log(amount)
    //     if (amount != undefined && parseInt(amount) > 0) {
    //         seterrormessage('')
    
    //     } else {
    //         seterrormessage('No puedes dejar cantidad vacía.')
    //     }
    // }
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
                    <Text styles={styles.modalTitle}>Cantidad:</Text>
                    <TextInput placeholder='1' value={amount.toString()} onChangeText={(value) => {
                        changeAmount(value)
                    }}
                        keyboardType='numeric' />
                    <Button containerStyle={{marginBottom:Theme.sizes.BASE}} onPress={addOrder}>Aceptar</Button>
                   {
                    !(parseInt(amount)>0)&& <Text h4 styles={{color:Theme.colors.error}}>{errormessage}</Text>
                   }
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
    modalTitle: {
        marginBottom: Theme.sizes.BASE
    }
})