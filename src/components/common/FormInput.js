import React from 'react'
import { StyleSheet, View, Dimensions,  TextInput } from 'react-native'

//Import customer components
import {TextComponent as Text} from '../common'
import Block from './Box'



//Import theme
import theme from '../../constants/Theme';

//Import react native community
// import { Picker } from '@react-native-community/picker'
// import MultiSelect from 'react-native-multiple-select';
//Get dimensions
const widthScreen = Dimensions.get('window').width;

//Import entities
import UserEntity from '../../entities/UserEntity'
import { Input } from '@rneui/themed'
export default function FormInput({ onBlur,onFocus,color,placeholder, title, onChange, type, itemList, inputcomponent, pickerkey,selectedItems,selectText,val,typetext,secureText,withcamera,withgallery,externalError }) {
    const [inputtext, setInputtext] = React.useState('');
    const [errormessage, seterrormessage] = React.useState();
    const _changeinput = (inputtext) => {
        onChange(inputtext);
        setInputtext(inputtext);

       switch (typetext) {
           case 'email':
               {
                   if (UserEntity.isEmail(inputtext)) {
                    //    console.log("Es valido");
                       seterrormessage('')
                   } else {
                    // console.log("No es valido");
                    seterrormessage('No es un email válido.')
                   }
               }
               break;
               case 'phonenumber':
                {
                    if (UserEntity.isPhone(inputtext)) {
                        // console.log("Es valido");
                        seterrormessage('')
                    } else {
                    //  console.log("No es valido");
                     seterrormessage('No es un número telefónico válido.')
                    }
                }
                break;
       
           default:
               break;
       }

    }

    React.useEffect(() => {
        //Setearemos al primer item si es de tipo picker
        if (type == 'picker') {
            if(val){
                _changeinput(val)
            }
            else{
                pickerkey ? _changeinput(itemList[0].key) : _changeinput(itemList[0])
            }
           

        }
    }, []);

    const onSelectedItemsChange = selectedItems => {
        onChange(selectedItems);
      };

    const _inputcomponet = () => {
        !type ? type = 'text' : type
        switch (type) {
            case 'text':
                return (
                    <Input
                    secureTextEntry={secureText?true:false}
                        placeholder={placeholder}
                        inputStyle={{ color: color==null?'#666':color, fontFamily: theme.font.font_family, fontSize: theme.sizes.h2, borderRadius: theme.sizes.INPUT_BORDER_RADIUS, marginBottom: 0 }}
                        onChangeText={(inputtext) => _changeinput(inputtext)}
                        errorStyle={ errormessage =='' ? { height: 0 } : null}
                        value={val}
                        errorMessage={(externalError) ? externalError : errormessage}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                )
                break;
            case 'textarea':
                return (
                    <Block>
                    <TextInput 
                    maxLength={400} 
                    onChangeText={(inputtext)=>_changeinput(inputtext)}
                    placeholder={placeholder} 
                    style={{fontSize:18,color:theme.colors.grey,padding:0,borderBottomWidth:2,borderColor:'#999'}} numberOfLines={3}
                    multiline={true}
                    value={val}/>
                    <Block right><Text h3>{inputtext.length}/400</Text></Block>
                    </Block>
                )
                break;
            // case 'picker':
            //     return (

            //         <Picker
            //             selectedValue={inputtext}
            //             style={{ ...styles.picker,color:color!=null?color:theme.colors.grey }}
            //             onValueChange={(inputtext, index) => _changeinput(inputtext)}
            //             itemStyle={{fontSize:theme.sizes.h3}}

            //         >
            //             {
            //                 itemList.map((item, key) => {
            //                     return (
            //                         <Picker.Item textStyle={{ fontSize: 34 }} key={key} label={pickerkey ? item.value : item} value={pickerkey ? item.key : item} />
            //                     )
            //                 })
            //             }
            //         </Picker>
            //     )
            //     break;
            // case 'multiple':
                
            //     return (
            //         <View style={{ flex: 1,marginTop:theme.sizes.BASE,marginBottom:theme.sizes.BASE }}>
            //         <MultiSelect
            //         // hideTags
            //           items={itemList}
            //           uniqueKey="id"
            //           altFontFamily={theme.font.font_family}
            //         //   ref={(component) => { multiSelect = component }}
            //           onSelectedItemsChange={onSelectedItemsChange}
            //           selectedItems={selectedItems}
            //           selectText={selectText}
            //           searchInputPlaceholderText="Buscar tipos..."
            //           fontSize={theme.sizes.h2}
            //           fontFamily={theme.font.font_family}
            //           itemFontFamily={theme.font.font_family}
            //           onChangeInput={ (text)=> console.log(text)}
            //           tagRemoveIconColor="#CCC"
            //           tagBorderColor="#CCC"
            //           tagTextColor="#CCC"
            //           selectedItemTextColor="#CCC"
            //           selectedItemIconColor="#CCC"
            //           itemTextColor="#777"
            //           displayKey="name"
            //           hideSubmitButton
            //           styleInputGroup={{backgroundColor:theme.colors.back_ground_screen}}
            //           itemFontSize={theme.sizes.h2}                      
            //           submitButtonColor={theme.colors.primary}
            //           submitButtonText="Aceptar"
            //           searchInputStyle={{fontSize:theme.sizes.h2,color:'#777'}}
                     
            //         />
            //         <View>
            //           {/* {this.multiSelect.getSelectedItemsExt(selectedItems)} */}
            //         </View>
            //       </View>
            //     )
            //     break;
            // case 'date':
            //     return (
            //         <DatePickerComponent val={val} onChange={onChange} />
            //     )
            //     break;
            default:
                break;
        }
    }


    return (
        <Block style={styles.formInput}>
            <Text h3 style={{ color: color==null?"#777":color }}>{title}</Text>
            {
                _inputcomponet()
            }


        </Block>
    )
}

const styles = StyleSheet.create({
    formInput: {

    },
    img: {
        width: widthScreen * 0.26,
        height: widthScreen * 0.26,
        backgroundColor: '#999',
        borderRadius: widthScreen * 0.13,
        margin: theme.sizes.BASE
    },
    picker: {
        fontWeight: '700',
        color: theme.colors.grey,
        fontSize: theme.sizes.h1

    }

})
