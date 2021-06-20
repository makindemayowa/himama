import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useAppState } from '../context/app.context';

export default function ClassesScreen({ navigation }) {
  const { centerData } = useAppState();

  const Item = ({ item, index }) => {
    const handleGoToClass = () => {
      navigation.navigate('Class', {
        classIdx: index,
      });
    };
    return (
      <View
        style={[styles.item, item.isHomeRoom && styles.isHomeRoom]}
        testID="::class">
        <Text style={styles.title}>{item.name}</Text>
        <TouchableOpacity style={styles.checkedInBtn} onPress={handleGoToClass}>
          <Text style={styles.checkedInBtnText}>Go to Class</Text>
        </TouchableOpacity>
      </View>
    );
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: centerData.name,
      headerLeft: () => (
        <TouchableOpacity
          style={styles.allClassesBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.allClassesBtnText}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, centerData.name]);

  return (
    <View style={styles.homeScreen}>
      <FlatList
        data={centerData.classrooms}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item, idx) => idx}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: '#f5f5f5',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    height: '100%',
    width: '100%',
  },
  allClassesBtn: {
    padding: 10,
  },
  allClassesBtnText: {
    color: '#307f7b',
  },
  mainHeader: {
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#f7c905',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkedInBtn: {
    padding: 10,
  },
  checkedInBtnText: {
    color: '#307f7b',
    fontWeight: '500',
  },
  isHomeRoom: {
    backgroundColor: '#d8d8d8',
  },
});
