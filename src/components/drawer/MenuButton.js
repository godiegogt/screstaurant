import React from 'react'
import { StyleSheet,  View,TouchableOpacity } from 'react-native'

//Import theme
import {materialTheme as theme} from '../../constants'

//import vector icon
import Icon from "react-native-vector-icons/FontAwesome5";

export default function MenuButton({navigation}) {

    // React.useEffect(()=>{
    //     console.log("Navigation",navigation)
    // },[])

    return (
        <View style={styles.container}>
            <TouchableOpacity
               onPress={()=>navigation.openDrawer()}
            >
                <Icon
                    name="bars"
                    size={25}
                    color='#888'
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginRight:theme.sizes.BASE

    }
})
