import * as firebase from "firebase";
import {USER_STATE_CHANGE} from "../constants/index";

export function fetchUser(){
    return((dispatch)=>{
          firebase.default.firestore().collection("users").doc(firebase.default.auth().currentUser.uid).get().then((snapshot)=>{
            if(snapshot.exists){
                dispatch({
                    type:USER_STATE_CHANGE,
                    currentUser:snapshot.data()
                })
            }
            else{
                console.log("Does not exist");
            }
        });
    })
}