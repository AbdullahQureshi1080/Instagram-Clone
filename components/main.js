import React,{useState,useEffect} from 'react'
import {View,Text} from "react-native";
import {useDispatch,useSelector} from "react-redux";
import {clearData, fetchUser, fetchUserFollowing, fetchUserPosts} from "../store/actions/index";
import {MaterialCommunityIcons} from 'react-native-vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import firebase from 'firebase';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile'
import SearchScreen from "./main/Search";


const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = ()=>{
  return(null)
}


export default function main(props) {
   const dispatch = useDispatch()
   const state = useSelector(state => state);
   const user = state.userState.currentUser;
    useEffect(()=>{
      dispatch(clearData())
      dispatch(fetchUser());
      dispatch(fetchUserPosts());
      dispatch(fetchUserFollowing());
    },[]);
    // console.log(state);
    if(user == undefined){
      return(
      <View>
        <Text></Text>
         </View>
      );
    }
    // console.log(user);
    return (
      <Tab.Navigator initialRouteName="Feed" labeled={false}>
          <Tab.Screen name="Feed" component={FeedScreen}
              options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                  ),
              }} />
          <Tab.Screen name="Search" component={SearchScreen} navigation={props.navigation}
              options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="magnify" color={color} size={26} />
                  ),
              }} />
          <Tab.Screen name="AddContainer" component={EmptyScreen}
              listeners={({ navigation }) => ({
                  tabPress: event => {
                      event.preventDefault();
                      navigation.navigate("Add")
                  }
              })}
              options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                  ),
              }} />
          <Tab.Screen name="Profile" component={ProfileScreen} 
          listeners={({ navigation }) => ({
              tabPress: event => {
                  event.preventDefault();
                  navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
              }})}
              options={{
                  tabBarIcon: ({ color, size }) => (
                      <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                  ),
              }} />
      </Tab.Navigator>
  )
}
