import React, { useEffect, useState } from 'react';
import { View, FlatList, Pressable, Image, PermissionsAndroid, Platform, Text, Button, StyleSheet } from 'react-native';
import {
  CameraKitContext,
  useCameraKit,
  CameraPreviewView,
  Lens,
} from '@snap/camera-kit-react-native';

export default function App() {
  const { loadLensGroup, applyLens } = useCameraKit();
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        return (
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === PermissionsAndroid.RESULTS.GRANTED
        );
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleStartCamera = async () => {
    const granted = await requestPermissions();
    if (granted) {
      setCameraActive(true);
    } else {
      setError('Camera permissions denied.');
    }
  };

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        const lensData = await loadLensGroup('eaaa05b3-54d0-4175-add2-2919882026dd');
        setLenses(lensData);
      } catch (err) {
        console.error('Failed to load lenses', err);
      }
    };

    if (cameraActive) fetchLenses();
  }, [cameraActive, loadLensGroup]);

  console.log(lenses, 'lenses')

  return (
    <CameraKitContext apiToken="eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQ3MDMzMjY5LCJzdWIiOiIwYWEzYTgyZC05OGE4LTQ1YzYtYTFhMS0yYTYxYmQ4YjE4Yjh-U1RBR0lOR343Y2I4YjY2Ny02NWVhLTRhNDUtYjZlOS0xODU5NDU2ZGEyMmEifQ.qEVuo_I8GTBrvYHLmXF4m3a-RdI4mLWDtMhLAyKf1gc">
      <View style={{ flex: 1 }}>
        {!cameraActive ? (
          <View style={styles.centered}>
            <Text>Start Camera</Text>
            <Button title="Open Camera" onPress={handleStartCamera} />
            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        ) : (
          <>
            <CameraPreviewView style={{ flex: 1 }} />
            <FlatList
              horizontal
              data={lenses}
              renderItem={({ item }) => {
                const iconUrl = item.icons?.[0]?.imageUrl;
                return (
                  <Pressable onPress={() => applyLens(item.id)}>
                    {iconUrl ? (
                      <Image
                        source={{ uri: iconUrl }}
                        style={{ width: 60, height: 60 }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ width: 60, height: 60, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10 }}>No Icon</Text>
                      </View>
                    )}
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.id}
              style={{ position: 'absolute', bottom: 10 }}
            />
          </>
        )}
      </View>
    </CameraKitContext>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});
