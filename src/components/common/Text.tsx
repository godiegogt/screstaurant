import { StyleSheet, Text as RNText, View } from 'react-native'
import React, { Children, FC } from 'react'

import {

    heightPercentageToDP as hp,

} from 'react-native-responsive-screen';
import Theme from '../../constants/Theme';

const stylesSS = StyleSheet.create({
    textComponent: {
        fontFamily: 'Segoe',
        color:Theme.colors.text
    },
    h1: {
        fontSize: hp('5%')
    },
    h2: {
        fontSize: hp('4%')
    },
    h3: {
        fontSize: hp('3%')
    },
    h4: {
        fontSize: hp('2%')
    },
    h5: {
        fontSize: hp('1%')
    },
    bold: {
        fontWeight: '700'
    },
    center: {
        textAlign: 'center'
    },
    justify: {
        textAlign: 'justify'
    }

});

interface IText {
    children: string
    h1?: boolean,
    h2?: boolean,
    h3?: boolean,
    h4?: boolean,
    h5?: boolean,
    bold?: boolean,
    center?: boolean
    styles?: Object | []
    rest?: any
}

const Text: FC<IText> = ({
    children,
    h1,
    h2,
    h3,
    h4,
    h5,
    bold,
    center,
    styles,
    ...rest
}) => {



    const textStyle = [
        stylesSS.textComponent,
        h1 && stylesSS.h1,
        h2 && stylesSS.h2,
        h3 && stylesSS.h3,
        h4 && stylesSS.h4,
        h5 && stylesSS.h5,
        bold && stylesSS.bold,
        center && stylesSS.center,
        styles

    ]




    return (
        <View>
            <RNText style={textStyle} {...rest}>{children}</RNText>
        </View>
    )
}

export default Text

