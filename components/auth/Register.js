import React,{useState} from 'react'
import { View, Button, TextInput} from 'react-native'
import * as firebase from 'firebase';
const Register = ({navigation}) => {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
    const onSignUp =async ()=>{
        const NAME = name.name;
        const EMAIL = email.email;
        const PASSWORD = password.password;
        try{
        console.log(EMAIL)
        console.log(PASSWORD)
        const result = await firebase.default.auth().createUserWithEmailAndPassword(EMAIL,PASSWORD);
        const savedUser = await  firebase.default.firestore().collection("users").doc(firebase.default.auth().currentUser.uid).set({
            name:NAME,
            email:EMAIL,
        })
        console.log(result);
        console.log(savedUser);
    }catch(err){
        console.log("An Error Occured",err)
    }
}
    return (
        <View style={{flex:1,justifyContent:"center"}}>
            <TextInput 
            placeholder="name"
            onChangeText={(name)=>setName({name})}
            />
            <TextInput 
            placeholder="email"
            onChangeText={(email)=>setEmail({email})}
            />
             <TextInput 
            placeholder="password"
            onChangeText={(password)=>setPassword({password})}
            secureTextEntry={true}
            />
            <Button 
            title="Sign Up"
            onPress={onSignUp}/>
        </View>
    )
}

export default Register;
