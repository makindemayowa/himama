import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import database from '@react-native-firebase/database';
import ThreeDots from '../images/threedots.svg';
import { useAppState } from '../context/app.context';

const createAlert = alertText =>
  Alert.alert(alertText, [{ text: 'OK', onPress: () => null }]);

export default function ClassScreen({ route, navigation }) {
  const { centerData } = useAppState();
  const [classroom, setClassroom] = React.useState({});
  const [classIdx, setClassIdx] = React.useState(route.params.classIdx);
  const updateStudentStatus = ({ childIdx, isCheckedIn }) => {
    const reference = database().ref(
      `/data/center/classrooms/${classIdx}/children/${childIdx}`,
    );
    reference
      .update({
        checked_in: !isCheckedIn,
      })
      .then(() =>
        createAlert(`Child has been checked ${isCheckedIn ? 'in' : 'out'}`),
      );
  };

  React.useEffect(() => {
    if (route.params.classIdx !== null) {
      setClassIdx(route.params.classIdx);
    }
  }, [route.params.classIdx]);

  React.useEffect(() => {
    if (classIdx !== null) {
      setClassroom(centerData.classrooms[classIdx]);
    } else {
      const homeRoom = centerData.classrooms.filter((room, idx) => {
        if (room.isHomeRoom) {
          setClassIdx(idx);
        }
        return room.isHomeRoom;
      });
      setClassroom(homeRoom);
    }
  }, [classIdx, centerData.classrooms]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: classroom.name,
      headerLeft: () => {
        if (centerData.allClassroomsAccessible) {
          return (
            <TouchableOpacity
              style={styles.allClassesBtn}
              testID="::allClassesBtn"
              onPress={() => navigation.navigate('AllClasses')}>
              <Text style={styles.allClassesBtnText}>All classes</Text>
            </TouchableOpacity>
          );
        } else {
          return null;
        }
      },
    });
  }, [navigation, classroom.name, centerData.allClassroomsAccessible]);

  const Item = ({ item: child, index: childIdx }) => {
    const handleUpdateStudentStatus = () => {
      updateStudentStatus({ childIdx, isCheckedIn: child.checked_in });
    };

    const handleMoveStudentToNewClass = (childInfo, newClassIdx) => {
      if (newClassIdx === classIdx) {
        return createAlert("Can't move student to same class");
      }
      const prevClassChildren = classroom.children.filter(
        chid => chid.fullName !== childInfo.fullName,
      );
      const prevClass = Object.assign(classroom, {
        children: prevClassChildren,
      });

      const nextClassChildren = centerData.classrooms[newClassIdx];
      if (nextClassChildren.children) {
        nextClassChildren.children.push(childInfo);
      } else {
        nextClassChildren.children = [childInfo];
      }

      const prevClassReference = database().ref(
        `/data/center/classrooms/${classIdx}`,
      );
      const nextClassReference = database().ref(
        `/data/center/classrooms/${newClassIdx}`,
      );

      prevClassReference.set(prevClass).then(() => {
        nextClassReference
          .set(nextClassChildren)
          .then(() => createAlert(`Child moved to ${nextClassChildren.name}`));
      });
    };

    return (
      <View style={styles.itemContainer} testID="::student">
        {centerData.allClassroomsAccessible && (
          <View style={styles.itemRight}>
            <Menu>
              <MenuTrigger>
                <ThreeDots />
              </MenuTrigger>

              <MenuOptions
                customStyles={{
                  optionsWrapper: { padding: 10, borderRadius: 4 },
                }}>
                <MenuOption text="Move Child to class" disabled={true} />

                {centerData.classrooms.map((clasroom, classroomIdx) => (
                  <MenuOption
                    key={classroomIdx}
                    onSelect={() =>
                      handleMoveStudentToNewClass(child, classroomIdx)
                    }
                    text={clasroom.name}
                  />
                ))}
              </MenuOptions>
            </Menu>
          </View>
        )}

        <View style={styles.item}>
          <Text style={styles.title}>{child.fullName}</Text>
          <TouchableOpacity
            style={styles.checkedInBtn}
            onPress={handleUpdateStudentStatus}>
            <Text style={styles.checkedInBtnText}>
              {child.checked_in ? 'checked in' : 'checked out'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.homeScreen}>
      <FlatList
        data={classroom.children}
        renderItem={({ item, index }) => <Item item={item} index={index} />}
        keyExtractor={(item, idx) => idx}
        ListEmptyComponent={() => (
          <Text style={styles.emptyClass}>
            No child registered in this class
          </Text>
        )}
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
  itemContainer: {
    backgroundColor: '#f7c905',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 4,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemRight: {
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  emptyClass: {
    fontWeight: '500',
  },
});
