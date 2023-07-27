import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch, useSelector} from 'react-redux';
import {setTask} from '../redux/actions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function Task({navigation}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [done, setDone] = useState(false);
  const [color, setColor] = useState('white');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('1');
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTask = () => {
    const mainTask = tasks.find(task => task.ID === taskID);
    if (mainTask) {
      setTitle(mainTask.Title);
      setDesc(mainTask.Desc);
      setDone(mainTask.Done);
      setColor(mainTask.Color);
    }
  };

  const func = async () => {
    if (title.length === 0) {
      Alert.alert('Warning!', 'Please enter a title!');
    } else if (desc.length === 0) {
      Alert.alert('Warning!', 'Please enter a');
    } else {
      try {
        const mainTask = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
        };
        let newTasks = [];
        const index = tasks.findIndex(task => task.ID === taskID);
        if (index > -1) {
          if (tasks.length === 0) {
            newTasks = [...tasks, mainTask];
          } else {
            newTasks = [...tasks];
            newTasks[index] = mainTask;
          }
        } else {
          newTasks = [...tasks, mainTask];
        }
        AsyncStorage.setItem('Task', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTask(newTasks));
            Alert.alert('Successful', 'Your task was saved successfully!');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const del = () => {
    if (title.length === 0) {
      Alert.alert('Warning!', 'Please enter a title!');
    } else if (desc.length === 0) {
      Alert.alert('Warning!', 'Please enter a');
    } else {
      try {
        let newTasks = [];
        const index = tasks.findIndex(task => task.ID === taskID);
        if (index > -1) {
          newTasks = [...tasks];
          newTasks.splice(index, 1);
          AsyncStorage.setItem('Task', JSON.stringify(newTasks))
            .then(() => {
              dispatch(setTask(newTasks));
              Alert.alert('Successful!', 'Your task was deleted successfully!');
              navigation.goBack();
            })
            .catch(err => console.log(err));
        } else {
          Alert.alert('Successful!', 'Your task was deleted successfully!');
          navigation.goBack();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const notif = () => {
    if (title.length === 0) {
      Alert.alert('Warning!', 'Please enter a title!');
    } else if (desc.length === 0) {
      Alert.alert('Warning!', 'Please enter a');
    } else {
      try {
        PushNotificationIOS.addNotificationRequest({
          id: `${title}-${desc}`,
          title: `Note '${title}'`,
          subtitle: done ? 'Done' : 'Not Done',
          body: `${desc}`,
          isCritical: true,
          fireDate: new Date(Date.now() + parseInt(time, 10) * 60000),
        });
        setShow(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Modal
        visible={show}
        transparent
        onRequestClose={() => setShow(false)}
        animationType="slide">
        <View style={styles.modal}>
          <View style={styles.bell}>
            <View style={styles.modalBody}>
              <Text style={styles.text}>Remind me after:</Text>
              <TextInput
                style={styles.modalInput}
                keyboardType="numeric"
                value={time}
                onChangeText={val => setTime(val)}
              />
              <Text style={styles.text}>minute(s)</Text>
            </View>
            <View style={styles.modalButton}>
              <TouchableOpacity
                style={styles.cancel}
                onPress={() => setShow(false)}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ok} onPress={() => notif()}>
                <Text style={styles.text}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        placeholder="Title"
        defaultValue={title}
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        defaultValue={desc}
        multiline
        onChangeText={val => setDesc(val)}
      />
      <View style={styles.colorBar}>
        <TouchableOpacity
          style={styles.white}
          onPress={() => setColor('white')}>
          {color === 'white' && (
            <FontAwesome5 name="check" size={25} color="#000000" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.red} onPress={() => setColor('red')}>
          {color === 'red' && (
            <FontAwesome5 name="check" size={25} color="#000000" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.blue} onPress={() => setColor('blue')}>
          {color === 'blue' && (
            <FontAwesome5 name="check" size={25} color="#000000" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.green}
          onPress={() => setColor('green')}>
          {color === 'green' && (
            <FontAwesome5 name="check" size={25} color="#000000" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.checkbox}>
        <CheckBox value={done} onValueChange={newVal => setDone(newVal)} />
        <Text style={styles.text}>Is done</Text>
      </View>
      <CustomButton
        title="Save Task"
        color="#1eb900"
        onPressFunction={() => func()}
        style={styles.button}
      />
      <CustomButton
        title="Delete Task"
        color="#ff0000"
        onPressFunction={() => del()}
        style={styles.button}
      />
      <CustomButton
        title="Notification"
        color="#40e0d0"
        onPressFunction={() => setShow(true)}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  input: {
    width: '95%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '95%',
  },
  text: {
    fontSize: 20,
    color: '#000000',
    margin: 5,
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
  },
  colorBar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10,
  },
  white: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  red: {
    flex: 1,
    backgroundColor: '#f28b82',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  green: {
    flex: 1,
    backgroundColor: '#ccff90',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  modalBody: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButton: {
    flexDirection: 'row',
    height: 50,
  },
  modalInput: {
    width: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  cancel: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ok: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
