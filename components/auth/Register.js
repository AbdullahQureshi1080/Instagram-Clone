import React,{useState} from 'react'
import { View, Button, TextInput} from 'react-native'
import * as firebase from 'firebase';
const Register = ({navigation}) => {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
    const onSignUp =async ()=>{
        console.log(email,password)
        // let email = email;
        // let password = password;
        try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email,password);
        console.log(result);
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
            onPress={()=>onSignUp()}/>
        </View>
    )
}

export default Register;
