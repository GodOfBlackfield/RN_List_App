import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {setID, setTask} from '../redux/actions';
import GlobalStyle from '../utils/GlobalStyle';

export default function Done({navigation}) {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTask([]));
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTask = () => {
    AsyncStorage.getItem('Task')
      .then(val => {
        const task = JSON.parse(val);
        if (task && typeof task === 'object') {
          dispatch(setTask(task));
        }
      })
      .catch(err => console.log(err));
  };

  const del = id => {
    const index = tasks.findIndex(task => task.ID === id);
    tasks.splice(index, 1);
    AsyncStorage.setItem('Task', JSON.stringify(tasks))
      .then(() => {
        Alert.alert('Successful!', 'Your task was deleted successfully!');
        getTask();
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={tasks.filter(task => task.Done === true)}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                dispatch(setID(item.ID));
                navigation.navigate('Task');
              }}>
              <View
                style={[
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor:
                      item.Color === 'red'
                        ? '#f28b82'
                        : item.Color === 'blue'
                        ? '#aecbfa'
                        : item.Color === 'green'
                        ? '#ccff90'
                        : '#ffffff',
                  },
                  styles.itemRow,
                ]}>
                <View style={styles.itemBody}>
                  <Text
                    style={[GlobalStyle.CustomFontHW, styles.title]}
                    numberOfLines={1}>
                    {item.Title}
                  </Text>
                  <Text
                    style={[GlobalStyle.CustomFontHW, styles.subtitle]}
                    numberOfLines={1}>
                    {item.Desc}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => del(item.ID)}>
                  <FontAwesome5 name="trash" color="#ff3636" size={25} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setID(tasks.length + 1));
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name="plus" color="#ffffff" size={20} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBody: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
