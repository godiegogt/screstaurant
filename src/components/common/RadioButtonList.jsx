import React,{useState} from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Theme from '../../constants/Theme';
import { CheckBox, Icon } from '@rneui/themed';


const RadioItem=({item,value,onChange})=>{
const screenWidth=Dimensions.get('window').width;
    return(
        <View style={{flexDirection:"row",alignItems:"center",width:screenWidth/4,paddingRight:Theme.sizes.BASE*0.8}}>
            <CheckBox
             style={{padding:0,margin:0}}
        containerStyle={{padding:0,margin:0}}
        checkedIcon={
          <Icon
            name="radio-button-checked"
            type="material"
            color={Theme.colors.primary}
            size={25}
            containerStyle={{padding:0,margin:0}}

           
          />
        }
        uncheckedIcon={
          <Icon
            name="radio-button-unchecked"
            type="material"
            color="grey"
            size={25}
            containerStyle={{padding:0,margin:0}}
           
          />
        }
        checked={value==item.name?true:false}
        onPress={() => onChange(item.name)}
      />
           <Text style={{margin:0,padding:0,position:'relative',right:9,color:'#000',fontSize:12}}>{item.name}</Text>
        </View>
    )
}

const RadioButtonList = ({items,value,onChange,title}) => {

    return (
        <View style={{marginBottom:Theme.sizes.BASE}}>
            <View>
                <Text style={{color:Theme.colors.primary}}>
                    {title}
                </Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:'space-between',flex:1,flexWrap:'wrap'}}>
            {
                items.map((item,key)=>{
                    return <RadioItem key={key} item={item} value={value} onChange={onChange}/>
                })
            }
            </View>
           
        </View>
    )
}

export default RadioButtonList

const styles = StyleSheet.create({})
