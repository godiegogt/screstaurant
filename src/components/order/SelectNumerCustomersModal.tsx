import { Modal, StyleSheet, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react'
import { Button } from '@rneui/themed';
import { Text } from '../common';
import Theme from '../../constants/Theme';
import { useNavigation } from '@react-navigation/native';



type SelectNumberCustomersModalProps = {
    changeCustomersNumbers: (customersNumer:number)=>void;
    isVisible: boolean;
}
const SelectNumberCustomersModal: FC<SelectNumberCustomersModalProps> = ({ changeCustomersNumbers,isVisible}) => {
    const navigation=useNavigation()
const [customersNumer, setCustomersNumer] = useState("");
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
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text styles={styles.modalTitle}>Comensales:</Text>
                    <TextInput placeholder='0' value={customersNumer.toString()} onChangeText={(value) => {
                        setCustomersNumer(value)
                    }}
                        keyboardType='numeric' />
                  <View style={styles.buttonsSection}>
                  <Button type='outline'  onPress={()=>{navigation.navigate("RoomsScreen")}}>Cancelar</Button>
                  <Button containerStyle={{marginLeft:Theme.sizes.BASE}}  onPress={()=>{changeCustomersNumbers(parseInt(customersNumer))}}>Aceptar</Button>
                  
                  </View>
                   {
                    !(parseInt(customersNumer)>0)&&<Text h4 styles={{color:Theme.colors.error}}>{errormessage}</Text>
                   }
                </View>
                
            </View>
        </Modal>
    )
}

export default SelectNumberCustomersModal

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
    },
    buttonsSection:{
flexDirection:'row'
    }
})