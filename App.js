import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {View,Text} from "react-native";
// import { API_KEY, AUTH_DOMAIN} from 'react-native-dotenv'
import * as firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
console.log(API_KEY)
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login'; 
import { API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MEASUREMENT_ID,MESSAGING_SENDER_ID,APP_ID } from './config/config';

const Stack = createStackNavigator();
export default function App() {
  const [loaded,setLoaded] = useState(false);
  const [loggedIn,setLoggedIn] = useState(false);

// const onAuthHandler = async ()=>{
//   const result = await firebase.default.auth().onAuthStateChanged((user)=>{
//     if(!user){
//       setLoggedIn(false);
//       setLoaded(true);
//     }
//     else{
//       setLoaded(true)
//       setLoggedIn(true);
//     }
//   })
// }

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
return(
  <View style={{flex:1,justifyContent:"center"}}>
    <Text>User is logged in</Text>
  </View>
);
}

