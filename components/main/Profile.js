import React, { useState,useEffect } from 'react'
import { StyleSheet , View, Text,Image,FlatList,Button} from 'react-native'
import {useSelector} from "react-redux";

import firebase from 'firebase';
require("firebase/firestore");
export default function Profile(props) {
    const state = useSelector(state => state);
    const userFollowing = state.userState.following;
    const [userPosts, setUserPosts]=useState([])
    const [user, setUser]=useState(null)
    const [following,setFollowing]=useState(false)

    
    useEffect(()=>{
        const currentUser = state.userState.currentUser;
        const posts = state.userState.posts;
        console.log(user,posts);
        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser);
            setUserPosts(posts);
        }
        else{
            firebase.firestore().collection("users").doc(props.route.params.uid).get().then((snapshot)=>{
                if(snapshot.exists){
                   setUser(snapshot.data())
                }
                else{
                    console.log("Does not exist");
                }
            });
            firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .orderBy("creation","asc")
            .get()
            .then((snapshot)=>{
                let posts = snapshot.docs.map(doc=>{
                    const data = doc.data();
                    const id = doc.id;
                    return{
                        id,...data
                    }
                })
                setUserPosts(posts);
          });
        }
        if(userFollowing.indexOf(props.route.params.uid)>-1){
            setFollowing(true);
        }else{
            setFollowing(false);
        }
    },[props.route.params.uid,userFollowing])

const onFollow=()=>{
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})
}

const onUnfollow=()=>{
    firebase.firestore()
    .collection('following')
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .delete()
}

const onLogout = ()=>{
    firebase.auth().signOut();
}

    if(user===null){
        return <View/>
    }
    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
            <Text>{user.name}</Text>
            <Text>{user.email}</Text>
            {props.route.params.uid !== firebase.auth().currentUser.uid?(
                <View>
                    {following?
                    (    
                    <Button title="Following"onPress={()=>onUnfollow()}/>)
                    :
                    (
                    <Button title="Follow"onPress={()=>onFollow()}/>
                    )}
                </View>
            ) :    <Button title="Logout"onPress={()=>onLogout()}/>        }
            </View>
           <View>
               <FlatList
               numColumns={3}
               horizontal={false}
               data={userPosts}
            //    key={}
               renderItem={({item})=>(
                   <View style={styles.containerImage}>
                       {/* <Text>{item.caption}</Text> */}
                       <Image style={styles.image}source={{uri:item.downloadURL}}/>
                   </View>
               )}
               />
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        // marginTop:30,
    },
    infoContainer:{
        margin:20,
    },
    containerGallary:{
        flex:1,
    },
    containerImage:{
        flex:1/3
    },
    image:{
        flex:1,
        aspectRatio:1/1,
    }
})
