import React, { useState,useEffect } from 'react'
import { StyleSheet , View, Text,Image,FlatList,Button} from 'react-native'
import {useSelector} from "react-redux";

import firebase from 'firebase';
require("firebase/firestore");
export default function Feed(props) {
    const state = useSelector(state => state);
    const users = state.usersState.users;
    const following = state.userState.following;
    const usersLoaded = state.usersState.usersLoaded;
    const [posts, setPosts]=useState([])
    // const [user, setUser]=useState(null)
    // const [following,setFollowing]=useState(false)

    
    useEffect(()=>{
        let posts =[];
        if(usersLoaded == following.length ){
            for(let i=0; i<following.length; i++){
                const user = users.find(el => el.uid === following[i]);
                if(user!= undefined){
                    posts=[...posts,...user.posts]
                }
            }
            posts.sort(function(x,y){
                return x.creation - y.creation;
            })
            setPosts(posts);
        }
    },[usersLoaded])

    return (
        <View style={styles.container}>
               <FlatList
               numColumns={1}
               horizontal={false}
               data={posts}
            //    key={}
               renderItem={({item})=>(
                   <View style={styles.containerImage}>
                       <Text style={{flex:1,}}>{item.user.name}</Text>
                       <Image style={styles.image}source={{uri:item.downloadURL}}/>
                   </View>
               )}
               />
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
