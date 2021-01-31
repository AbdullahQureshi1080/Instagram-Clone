import React, { useState,useEffect } from 'react'
import { StyleSheet , View, Text,Image,FlatList,Button} from 'react-native'
import {useSelector} from "react-redux";

import firebase from 'firebase';
require("firebase/firestore");

export default function Feed(props) {
    const state = useSelector(state => state);
    console.log(state);
    const currentUser= state.userState.currentUser;
    const following = state.userState.following;
    const feed = state.usersState.feed;
    const usersFollowingLoaded = state.usersState.usersFollowingLoaded;

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (usersFollowingLoaded == following.length && following.length !== 0) {
            feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(feed);
        }
        // console.log(posts)

    }, [usersFollowingLoaded, feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>
                            <Text style={styles.container}>{item.user.name}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            { item.currentUserLike ?
                                (
                                    <Button
                                        title="Dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)} />
                                )
                                :
                                (
                                    <Button
                                        title="Like"
                                        onPress={() => onLikePress(item.user.uid, item.id)} />
                                )
                            }
                            <Text
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View Comments...
                                </Text>
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

