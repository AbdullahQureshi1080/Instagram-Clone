import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {View,Text} from "react-native";
import {Provider }from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import rootReducer from './store/reducers';
import thunk from "redux-thunk"
import * as firebase from 'firebase';


import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login'; 
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";
import CommentScreen from "./components/main/Comment";

import { API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MEASUREMENT_ID,MESSAGING_SENDER_ID,APP_ID } from './config/config';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};
if(firebase.default.apps.length === 0){
 firebase.default.initializeApp(firebaseConfig)
}

const store = createStore(rootReducer,applyMiddleware(thunk));

const Stack = createStackNavigator();


export default function App({navigation}) {
  const [loaded,setLoaded] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(()=>{
     firebase.default.auth().onAuthStateChanged((user)=>{
      if(!user){
        setLoggedIn(false);
        setLoaded(true);
      }
      else{
        setLoaded(true)
        setLoggedIn(true);
      }
    })
  },[])

    if(!loaded){
      return(
        <View style={{flex:1,justifyContent:"center"}}>
          <Text>Loading</Text>
        </View>
      );
    }
if(!loggedIn){
  return (

      <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>

   );
}
return(
  <Provider store={store}>   
    <NavigationContainer>
   <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} navigation={navigation}/>
        <Stack.Screen name="Add" component={AddScreen} navigation={navigation} />
        <Stack.Screen name="Save" component={SaveScreen} navigation={navigation}/>
        <Stack.Screen name="Comment" component={CommentScreen} navigation={navigation}/>
      </Stack.Navigator>
      </NavigationContainer>
  </Provider>
);
}

