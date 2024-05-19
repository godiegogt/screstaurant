import React from "react";
import {  ScrollView, StyleSheet, Image} from "react-native";

import { useSafeArea } from "react-native-safe-area-context";




//Import customer component
import Block from '../../components/common/Box';
import Text from '../../components/common/TextComponent'
import DrawerItem from '../../components/drawer/DrawerItem';

import { materialTheme as theme } from "../../constants";
import { useDispatch } from 'react-redux';


import { TouchableOpacity } from "react-native-gesture-handler";
import { appVersion } from "../../constants/variables";
import { logOut } from "../../features/configurations/configurationSlice";


export default function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {

  const insets = useSafeArea();
const dispatch=useDispatch();
  const screens = [
   {
       screen:'HomeStack',
       title:'Inicio'
   },
   {
    screen:'ConfigStack',
    title:'Configuracion'
   }
  ];



  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
  

      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0,
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Image
                    resizeMode='contain'
                    style={styles.loginLogo}
                    source={require('../../assets/img/logo.png')} />
                    
          {screens.map((item, index) => {
            return (
              <DrawerItem
                title={item.title}
                screen={item.screen}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
        </ScrollView>
      </Block>
      

     
      <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}>
      <TouchableOpacity onPress={()=>{dispatch(logOut())}}>
        <DrawerItem
          title="Salir"
          screen='RoomsScreen'
          navigation={navigation}
          focused={state.index === 5 ? true : false}
        />
        <Text center text h3 style={{color:theme.colors.muted}}>{appVersion}</Text>
        </TouchableOpacity>
      </Block>
     
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:theme.sizes.padding_screen
  },
  header: {
    flex:0.3,
    padding:theme.sizes.BASE,
    paddingBottom: theme.sizes.BASE,
    marginBottom:theme.sizes.BASE/2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
  pro: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
   
  },
  seller: {
    marginRight: 16,
  },
  loginLogo: {
    width: '100%',
    height:50
   






}
});


