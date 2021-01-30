import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button,Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';

export default function Add({navigation}) {
  const [hasGallaryPermission, setHasGallaryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const gallaryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
       setHasGallaryPermission(gallaryStatus.status === 'granted');
    })();
  }, []);

  const takeImage = async()=>{
      if(camera) {
          const data = await camera.takePictureAsync(null);
          setImage(data.uri)
        //   console.log(data.uri)
      }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGallaryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGallaryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{flex:1}}>
        <View style={styles.cameraContainer}>
      <Camera 
      style={styles.fixedRatio} 
      type={type} 
      ratio={"1:1"}
      ref={ref=>setCamera(ref)}
      />
        </View>

          <Button
          title="Flip Image"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
          </Button>
          <Button title="Take Picture" onPress={takeImage}/>
          <Button title="Pick Image From Gallary" onPress={pickImage}/>
          <Button title="Save" onPress={()=>navigation.navigate("Save",{image})}/>
          {image&&<Image source={{uri:image}} style={{flex:1}}/>}
    </View>
  );
}

const styles = StyleSheet.create({
    cameraContainer:{
        flex:1,
        flexDirection:"row"
    },
    fixedRatio:{
        flex:1,
        aspectRatio:1,
    }
})