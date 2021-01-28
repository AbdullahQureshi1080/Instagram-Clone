import React from 'react'
import { View, Button, TextInput} from 'react-native'
import * as firebase from 'firebase';
const Login = () => {
    const [state, setstate] = useState({
        email:"",
        password:"",
        name:"",
    })

    const onSignUp =async ()=>{
        const {email,password,name}= state;
        try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email,password);
    }catch(err){
        console.log("An Error Occured",err)
    }
}
    return (
        <View style={{flex:1,justifyContent:"center"}}>
            <TextInput 
            placeholder="name"
            onChangeText={(name)=>setstate({name})}
            />
            <TextInput 
            placeholder="email"
            onChangeText={(email)=>setstate({email})}
            />
             <TextInput 
            placeholder="password"
            onChangeText={(password)=>setstate({password})}
            secureTextEntry={true}
            />
            <Button 
            title="Sign Up"
            onPress={()=>onSignUp()}/>
        </View>
    )
}

export default Login;
