import { Modal, StyleSheet,  View } from 'react-native'
import React, { FC } from 'react'
import { Button } from '@rneui/themed'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { materialTheme } from '../../constants'
import {Text} from './'

interface IAlert{
    message:string,
    setMessage:(message:string)=>void,
    type:'warning'|'error'|'success'
}

const Alert:FC<IAlert> = ({message,setMessage,type}) => {

    const closeModal=()=>{
setMessage('')
    }
  return (
    <Modal
        animationType="slide"
      transparent={true}
      style={{backgroundColor:'#000'}}
        visible={message==""?false:true}
        onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Icon
            name={type=='warning'?'exclamation-circle':type=='error'?'times':'check-circle'}
            size={50}

            color={type=='warning'?materialTheme.colors.warning:type=='error'?materialTheme.colors.error:materialTheme.colors.success}
            style={{marginBottom:materialTheme.sizes.BASE}}
            />
            <Text bold styles={styles.modalText}>{message}</Text>
           <Button onPress={closeModal}>Aceptar</Button>
          </View>
        </View>
      </Modal>
  )
}

export default Alert

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:'rgba(52, 52, 52, 0.8)',
      
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
        width:300
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})