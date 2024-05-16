import React, { useState } from 'react';
import Icon from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions, View } from 'react-native';

import CustomDrawerContent from './Menu';

//Import customer components
import MenuButton from '../../components/drawer/MenuButton'

import {RoomsScreen,LoginScreen,TablesScreen,OrderScreen,BillScreen,ConfigurationScreen,EditPrinterScreen } from '../screens'

import { materialTheme } from "../../constants/";


const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


//Home stack
function HomeStack(props) {

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => <MenuButton navigation={navigation} />,
      headerStyle:{backgroundColor:'#3299FE'},
      headerBackTitleStyle:'#fff',
      headerTitleStyle:{color:'#fff',textAlign:'center'},
        presentation: 'card',
        headerMode: 'screen'
      })}
    >
      <Stack.Screen
        options={{ title: 'Reservaciones' }}
        name="RoomsScreen"
        component={RoomsScreen}
      />
      <Stack.Screen
        options={{ title: 'Orden' }}
        name="OrderScreen"
        component={OrderScreen}
      />
      
      <Stack.Screen
        options={{ title: 'Mesas' }}
        name="TablesScreen"
        component={TablesScreen}
      />
        <Stack.Screen
        options={{ title: 'Facturar' }}
        name="BillScreen"
        component={BillScreen}
      />
    </Stack.Navigator>
  );
}

//Config stack
function ConfigStack(props) {

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => <MenuButton navigation={navigation} />,
      headerStyle:{backgroundColor:'#3299FE'},
      headerBackTitleStyle:'#fff',
      headerTitleStyle:{color:'#fff',textAlign:'center'},
        presentation: 'card',
        headerMode: 'screen'
      })}
    >
      <Stack.Screen
        options={{ title: 'Configuraciones' }}
        name="ConfigurationScreen"
        component={ConfigurationScreen}
      />
       <Stack.Screen
        options={{ title: 'Editar impresora' }}
        name="EditPrinterScreen"
        component={EditPrinterScreen}

      />
    </Stack.Navigator>
  );
}


export function SigninStack(props) {
  return (
    <Stack.Navigator
      // initialRouteName='AddressInformationScreen'      
      screenOptions={{
        navigationOptions: {
          headerShown: false,
        }
      }}
    
    //initialRouteName="AddressInformationScreen"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />
        <Stack.Screen
        options={{ title: 'Editar impresora' }}
        name="EditPrinterScreen"
        component={EditPrinterScreen}

      />

    </Stack.Navigator>
  );
}

//Create drawer
export function DrawerStack(props) {
//   const configurations = useSelector(state => state.configurations);
//   const user = useSelector(state => state.user);
//   const invoice = useSelector(state => state.invoice);
//   const inithook=useInit({user,invoice, printerCongifs});
//   const [needLoadParams, setneedLoadParams] = useState(true)
  //Init configs
//   React.useEffect(() => {
//     //Validate if it is neccesary load enterprise information
//     loadParams();
  
//   }, []);

//   const loadParams=()=>{
//     if(needLoadParams){
//       inithook.fetchEnterpriseInformation();
//       inithook.getParams();
//       inithook.loadPrinterOptions();
//       inithook.fetchStores();
//       inithook.fetchPricesList();
//       setneedLoadParams(false);
//     }
//   }

//Printer options load
// const loadPrinterOptions=()=>{
//   (invoice.printerConfig==null||invoice.printerConfig==undefined)&&dispatch(changePrinterSize(printerCongifs[0]));
// }

  //load invoice enterprise information
  // const fetchEnterpriseInformation = () => {

  //   axios({
  //     method: 'post',
  //     url: URL_API + 'ObtenerDatosEmpresa',
  //     headers: {

  //       Authorization: `Bearer ${user.access_token}`
  //     }
  //   }).then(function (response) {
  //     const enterpriseinfo = formatEnterpriseInformation(response.data);

  //     dispatch(addEnterpriseInformation(enterpriseinfo));



  //   }).catch(function (error) {
  //     //   console.log("No se pudo cargar información de la empresa.")
  //     // console.log(error);

  //   });



  // }
  //Get Params
  // const getParams = () => {

  //   axios({
  //     method: 'post',
  //     url: URL_API + 'ObtenerParametros',
  //     headers: {

  //       Authorization: `Bearer ${user.access_token}`
  //     }
  //   }).then(function (response) {


  //     dispatch(updateParams(response.data));



  //   }).catch(function (error) {
  //     //   console.log("No se pudo cargar información de la empresa.")
  //     // console.log(error);

  //   });



  // }



  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} />
      )}

      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8
      }}

      screenOptions={
        {
          activeTintColor: "white",
          inactiveTintColor: "#000",
          activeBackgroundColor: materialTheme.colors.primary,
          inactiveBackgroundColor: "transparent",
          itemStyle: {
            width: width * 0.74,
            paddingHorizontal: 12,
            // paddingVertical: 4,
            justifyContent: "center",
          
            // alignItems: 'center',
            overflow: "hidden"
          },
          labelStyle: {
            fontSize: 18,
            fontWeight: "normal"
          }
        }
      }

      // drawerContentOptions={{
      //   activeTintColor: "white",
      //   inactiveTintColor: "#000",
      //   activeBackgroundColor: materialTheme.colors.primary,
      //   inactiveBackgroundColor: "transparent",
      //   itemStyle: {
      //     width: width * 0.74,
      //     paddingHorizontal: 12,
      //     // paddingVertical: 4,
      //     justifyContent: "center",
      //     alignContent: "center",
      //     // alignItems: 'center',
      //     overflow: "hidden"
      //   },
      //   labelStyle: {
      //     fontSize: 18,
      //     fontWeight: "normal"
      //   }
      // }}
      initialRouteName="HomeStack"

    >

      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Inicio',
          headerShown: false,
          drawerIcon: ({ focused }) => (
            <Icon
              size={20}
              name="users"
              color={focused ? "white" : materialTheme.colors.muted}
            />
          )
        }}
      />


      <Drawer.Screen
        name="ConfigStack"
        component={ConfigStack}
        options={{
          title: 'Configuracion',
          headerShown: false,
          unmountOnBlur: true,
          drawerIcon: ({ focused }) => (
            <Icon
              size={20}
              name="store"
              color={focused ? "white" : materialTheme.colors.muted}
            />

          )
        }}
      />

    </Drawer.Navigator>
  );
}


import { useSelector } from 'react-redux'
export default function Navigation(params) {
//   const user = useSelector(state => state.user)
const isAuth = useSelector(state => state.configuration.isAuth)

// const errormessage=useSelector(state=>state.configurations.errormessage);
// const dispatch=useDispatch();

// const closeErrorMessage=()=>{
//   dispatch(updateErrorMessage(""))
// }


  return (
    <NavigationContainer>
  {/* <Alert modalState={errormessage == '' ? false : true} modalAction={closeErrorMessage} description={errormessage} alarmType='alert' buttonTitle='Entendido' /> */}
      <Stack.Navigator
        initialRouteName="LoginStack"

        screenOptions={{
          navigationOptions: {
            headerShown: false,
          },
          headerShown: false
        }}>
        {
          (!isAuth)
            ? <Stack.Screen options={{ headerShown: false }} name="LoginStack" component={SigninStack} />
            :
            <Stack.Screen name="DrawerStack" component={DrawerStack} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )

}


