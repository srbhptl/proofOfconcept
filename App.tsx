import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { WebView } from 'react-native-webview';

const NoCameraErrorView = () => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>No camera found. Please check your device.</Text>
  </View>
);

function App() {
  const device = useCameraDevice('front'); // Choose the front camera
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isCameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        console.log('Camera permission granted:', granted);
      }
    };

    checkPermissions();
  }, [hasPermission, requestPermission]);

  if (device == null) return <NoCameraErrorView />;
  if (!hasPermission) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Camera permission not granted.</Text>
      </View>
    );
  }

  // Your web app URL
  const localServerUrl = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Conditionally render the camera based on the state */}
      {isCameraActive && (
        <Camera 
          style={StyleSheet.absoluteFill} 
          device={device} 
          isActive={isCameraActive} 
          onError={(error) => {
            console.error('Camera error: ', error);
          }}
        />
      )}
      
      <WebView
         source={{ uri: localServerUrl }}
         style={styles.webview}
         javaScriptEnabled={true}
         domStorageEnabled={true}
         onMessage={(event) => {
           console.log('Message from WebView:', event.nativeEvent.data);
           if (event.nativeEvent.data === 'open_camera') {
             setCameraActive(true); // Activate the camera when the message is received
           }
         }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('HTTP error: ', nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
  },
  webview: {
    flex: 1, // Ensure the WebView takes the available space
  },
});

export default App;
