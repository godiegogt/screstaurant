import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

//Import customer components
import Text from "../../components/common/TextComponent";
import Block from "../common/Box";

import Icon from "react-native-vector-icons/FontAwesome5";
import {materialTheme} from "../../constants";


const  DrawerItem=({title,screen,focused,navigation})=> {

  //const profileStore = useSelector(state => state.profile);
  const renderIcon = () => {
    switch (title) {
      case "Inicio":
        return (
          <Icon
            size={20}
            name="money-bill"
           
            color={focused ? "white" : materialTheme.colors.primary}
          />
        );
        case "Historial":
          return (
            <Icon size={20} name="search" color={focused ? "white" : materialTheme.colors.primary}/>
          );
          case "Perfil":
            return (
              <Icon size={20} name="user" color={focused ? "white" : materialTheme.colors.primary}/>
            );
            case "Configuracion":
              return (
                <Icon size={20} name="cog" color={focused ? "white" : materialTheme.colors.primary}/>
              );
              case "POS":
              return (
                <Icon size={20} name="calculator" color={focused ? "white" : materialTheme.colors.primary}/>
              );
              case "Inventario":
                return (
                  <Icon size={20} name="boxes" color={focused ? "white" : materialTheme.colors.primary}/>
                );
                case "Reportes":
                return (
                  <Icon size={20} name="chart-bar" color={focused ? "white" : materialTheme.colors.primary}/>
                );
      case "Salir":
        return (
          <Icon
            size={20}
            name="sign-out-alt"
           
            color={materialTheme.colors.error}
          />
        );
      
      default:
        return null;
    }
  };

  React.useEffect(() => {
  //  console.log(title+": "+focused)
  }, [focused]);
 
    return (
      <TouchableOpacity style={{ height: 55 }} onPress={()=>{navigation.navigate(screen)}}>
         {/* <LinearGradient style={[styles.defaultStyle,focused?styles.shadow:null]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={!focused ? ['transparent','transparent']:[materialTheme.colors.gradient_end, materialTheme.colors.gradient_start]}> */}
        <Block
          flex
          row
          style={[
            styles.defaultStyle,
            focused ? [styles.activeStyle, styles.shadow] : null,
            {borderBottomWidth:1,borderBottomColor:"#efefef"}
          ]}
        >
          <Block middle flex={0.2} style={{ marginRight: 28 }}>
            {renderIcon()}
          </Block>
          <Block row center flex={0.8}>
            <Text
              h2
              
              style={{color:
                title=="Salir"
                ?"red"
                :
                focused
                  ? "white"
                  : materialTheme.colors.primary
              }}
            >
              {
            title
            }
            </Text>
            
          </Block>
          <Block row center flex={0.1}>
            <Icon name="chevron-right" type="font-awesome" color="#efefef"/>
          </Block>
        </Block>
        {/* </LinearGradient> */}
      </TouchableOpacity>
    );
  
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: materialTheme.sizes.BASE*1.5,
    paddingHorizontal: materialTheme.sizes.BASE*1.5,
    borderRadius:materialTheme.sizes.BASE/2,
    paddingVertical:10
  },
  activeStyle: {
    backgroundColor: materialTheme.colors.primary,
    borderRadius: 4
  },
  shadow: {
    shadowColor: materialTheme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  pro: {
    backgroundColor: materialTheme.colors.label,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36
  }
});
