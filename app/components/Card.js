import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { globalStyles, images } from '../globalStyles/globalStyles';

export default function Card({ item, handleIcon, handleStealInfo }){
    return (
      <View style={ style.cardContainer }>
        <View>
          <Text style={ style.title }>Week { item.key }:</Text>
        </View>
        <View style={ {flexDirection: 'row' } }>
          <View style={ style.flowerContainer }>
            <Text style={ style.subtitle }>Your Plants:</Text>
            <View style={ style.iconContainer }>
              <TouchableOpacity style={{ marginTop: 5, width: 30, height: 30 }}
                                onPress={() => handleIcon(item.condition1)}>
                <Image source={ images.condition[item.condition1] } style={[
                  item.condition1 == 0 && style.lock,
                  item.condition1 == 1 && style.flower,
                  item.condition1 == 2 && style.pot,
                ]}/>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 5, width: 30, height: 30 }}
                                onPress={() => handleIcon(item.condition2)}>
                <Image source={ images.condition[item.condition2] } style={[
                  item.condition2 == 0 && style.lock,
                  item.condition2 == 1 && style.flower,
                  item.condition2 == 2 && style.pot,
                ]}/>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: 5, width: 30, height: 30 }}
                                onPress={() => handleIcon(item.condition3)}>
                <Image source={ images.condition[item.condition3] } style={[
                  item.condition3 == 0 && style.lock,
                  item.condition3 == 1 && style.flower,
                  item.condition3 == 2 && style.pot,
                ]}/>
              </TouchableOpacity>
              <TouchableOpacity style={{  marginTop: 5, width: 30, height: 30 }}
                                onPress={() => handleIcon(item.condition4)}>
                <Image source={ images.condition[item.condition4] } style={[
                  item.condition4 == 0 && style.lock,
                  item.condition4 == 1 && style.flower,
                  item.condition4 == 2 && style.pot,
                ]}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={ style.stealContainer }>
            <Text style={ style.subtitle }>Steal Count:</Text>
            <TouchableOpacity onPress={() => handleStealInfo(item.key)}>
              <Text style={{ width: 30, height: 30, 
                              textAlign: 'center',
                              marginTop: 7,
                              marginBottom: -7, }}>{ item.stolen }
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}

const style = StyleSheet.create({
  title: {
    fontFamily: 'EBG-bold',
    fontWeight: 'bold',
    color: '#234F1E',
    fontSize: 20,
  },
  subtitle: {
    fontFamily: 'EBG-bold',
    fontWeight: 'bold',
    color: '#03AC13',
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 0.3,

    shadowOffset: {width: 5, height: 5},
    shadowRadius: 4,
    shadowOpacity: 0.5,
    elevation: 4,

    margin: 5,
  },
  flowerContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stealContainer: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flower: {
    width: 30,
    height: 30,
  },
  lock: {
    marginLeft: 8,
    width: 20,
    height: 20,
  },
  pot: {
    marginTop: 12,
    marginLeft: 10,
    width: 13,
    height: 13,
  }
})