
import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { generateuuid } from '../../utils/idgenerator';
const Formulario = ({ modifiers,selecciones,changeSelecciones }) => {
 
  const handleSelect = (modificadorId, respuesta) => {
    const currentSelection = selecciones[modificadorId];
    const newSelection = currentSelection?.RespuestaModificadorID === respuesta.RespuestaModificadorID
      ? null
      : { ...respuesta, uuid: generateuuid };

      changeSelecciones(prev => ({
      ...prev,
      [modificadorId]: newSelection,
    }));
  };

 

  return (
    <View>
      {modifiers.map(producto => (
        <View key={producto.ModificadorID}>
          <Text>{producto.Nombre}</Text>
          <Text>{producto.Pregunta}</Text>
          {producto.Respuestas.map(respuesta => (
            <TouchableOpacity
              key={respuesta.RespuestaModificadorID}
              onPress={() => handleSelect(producto.ModificadorID, respuesta)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
              }}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                {selecciones[producto.ModificadorID]?.RespuestaModificadorID === respuesta.RespuestaModificadorID && (
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: '#000',
                    }}
                  />
                )}
              </View>
              <Text>{`${respuesta.Nombre} - $${respuesta.Precio.toFixed(2)}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
     
    </View>
  );
};

export default Formulario;