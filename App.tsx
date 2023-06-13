import {StatusBar} from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ImageBackground, Pressable} from 'react-native';
import useBearStore from './store/store';

export default function App() {
  const bears = useBearStore(state => state.bears);
  const bearCover = useBearStore(state => state.bearCover);
  const addBear = useBearStore(state => state.increase);
  const removeBear = useBearStore(state => state.decrease);
  const reset = useBearStore(state => state.reset);
  const autoIncrease = useBearStore(state => state.autoIncrease);
  const resetAutoIncrease = useBearStore(state => state.resetAutoIncrease);
  const fetchBear = useBearStore(state => state.fetchBear);

  const [dim, setDim] = useState(800);
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    setChangeColor(true);
    setTimeout(() => {
      setChangeColor(false);
    }, 200);
  }, [bears]);

  const handleFetchBear = () => {
    setDim(dim + 1);
    fetchBear(`https://placebear.com/${dim}/${dim}`);
  };

  return (
    <ImageBackground source={{uri: bearCover}} style={styles.container}>
      <View style={bearCover ? styles.wrapperPlus : styles.wrapper}>
        <Text style={styles.title}>Hey! Check the amount of the bears:</Text>
        <Text style={[styles.amount, changeColor ? styles.amountGreen : null]}>
          {bears}
        </Text>
        <View style={styles.containerFlex}>
          <Pressable style={styles.button} onPress={() => addBear(1)}>
            <Text style={styles.text}>Add Bear</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => removeBear(1)}>
            <Text style={styles.text}>Remove Bear</Text>
          </Pressable>
        </View>
        <View style={styles.containerFlex}>
          <Pressable style={styles.button} onPress={() => autoIncrease()}>
            <Text style={styles.text}>Auto Add</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => handleFetchBear()}>
            <Text style={styles.text}>Fetch Bear</Text>
          </Pressable>
        </View>
        <View style={styles.containerFlex}>
          <Pressable style={styles.button} onPress={() => reset()}>
            <Text style={styles.text}>Reset</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => resetAutoIncrease()}>
            <Text style={styles.text}>Reset Auto Add</Text>
          </Pressable>
        </View>
      </View>

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 120,
    resizeMode: 'cover',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperPlus: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingRight: 30,
    paddingLeft: 30,
  },
  containerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    fontSize: 26,
    lineHeight: 40,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  amount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 50,
    backgroundColor: 'red',
    width: 100,
    lineHeight: 0,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 15,
  },
  amountGreen: {
    backgroundColor: 'green',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
