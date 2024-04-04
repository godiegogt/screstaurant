import React from 'react'
import { StyleSheet, Text } from 'react-native'
//Import theme
import {materialTheme as theme} from '../../constants'

interface ITextComponent{

        h1?: any;
        h2?: any;
        h3?: any;
        h4?: any;
        bold?: any;
        center?: any;
        justify?: any;
        style?: any;
        children?: any;
}

export default function TextComponent({
h1,
h2,
h3,
h4,
bold, 
center,
justify,
style,
children,
...rest
}:ITextComponent) {

    const styleBlock = [
        styles.text,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        h4 && styles.h4,
        bold && styles.bold,
        center && styles.center,
        justify&&styles.justify,
        style,
      ];


    return (
            <Text style={styleBlock} {...rest}>{children}</Text>
        
    )
}

const styles = StyleSheet.create({
text:{
    color:'#555'
},
h1:{
fontSize:theme.sizes.h1
},
h2:{
    fontSize:theme.sizes.h2
},
h3:{
    fontSize:theme.sizes.h3
},
h4:{
    fontSize:theme.sizes.H4
},
bold:{
fontWeight:'700'
},
center:{
    textAlign:'center'
},
justify:{
    textAlign:'justify'
}
})
