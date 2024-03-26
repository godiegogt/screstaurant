import React, { FC } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import {materialTheme as theme} from '../../constants/index'

const styles = StyleSheet.create({
    block: {
      flexDirection: 'column',
    },
    row: {
      flexDirection: 'row',
    },
    middle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    center: {
      alignItems: 'center',
      alignSelf: 'center',
    },
    left: {
      alignItems: 'flex-start',
    },
    right: {
      alignItems: 'flex-end',
    },
    top: {
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
    },
    bottom: {
      alignItems: 'flex-end',
      alignSelf: 'flex-end',
    },
    card: {
      borderRadius: theme.sizes.CARD_BORDER_RADIUS,
      borderWidth: theme.sizes.CARD_BORDER_WIDTH,
      borderColor: theme.colors.block,
    },
    shadow: {
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: theme.sizes.BLOCK_SHADOW_OPACITY,
      shadowRadius: theme.sizes.BLOCK_SHADOW_RADIUS,
      elevation: theme.sizes.ANDROID_ELEVATION,
    },
    fluid: {
      width: 'auto',
    },
  });

interface IBoxProps{
    row?:String | boolean ,
    flex?:String | boolean ,
    center?:String | boolean ,
    middle?:String | boolean ,
    top?:String | boolean ,
    bottom?:String | boolean ,
    right?:String | boolean ,
    left?:String | boolean ,
    shadow?:String | boolean ,
    space?:String | boolean ,
    fluid?:String | boolean ,
    height?:String | boolean ,
    shadowColor?:String | boolean ,
    card?:String | boolean ,
    width?:String | boolean ,
    safe?:String | boolean ,
    children?:any ,
    style?:any ,
    rest?:any 
}

const Box:FC<IBoxProps> =({
    row,
    flex,
    center,
    middle,
    top,
    bottom,
    right,
    left,
    shadow,
    space,
    fluid,
    height,
    shadowColor,
    card,
    width,
    safe,
    children,
    style,
    ...rest
})=> {

  const styleBlock = [
    styles.block,
    row && styles.row,
    flex && { flex: flex === true ? 1 : flex },
    center && styles.center,
    middle && styles.middle,
    top && styles.top,
    bottom && styles.bottom,
    right && styles.right,
    left && styles.left,
    space && { justifyContent: `space-${space}` },
    shadow && styles.shadow,
    fluid && styles.fluid,
    card && styles.card,
    height && { height },
    width && { width },
    shadowColor && { shadowColor },
    style,
  ];




  if (safe) {
    return (
      <SafeAreaView style={styleBlock} {...rest}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View  style={styleBlock} {...rest}>
      {children}
    </View>
  );
}

export default Box

