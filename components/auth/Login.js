import React,{useState} from 'react'
import { View, Button, TextInput} from 'react-native'
import * as firebase from 'firebase';
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const onLoginIn=async ()=>{
        const EMAIL = email.email;
        const PASSWORD = password.password;
        try{
        const result = await firebase.auth().signInWithEmailAndPassword(EMAIL,PASSWORD);
    }catch(err){
        console.log("An Error Occured",err)
    }
}
    return (
        <View style={{flex:1,justifyContent:"center"}}>
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
            title="Login"
            onPress={onLoginIn}/>
        </View>
    )
}

export default Login;
