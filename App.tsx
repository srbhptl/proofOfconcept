import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  CameraKitContext,
  useCameraKit,
  CameraPreviewView,
  Lens,
} from '@snap/camera-kit-react-native';
import RNFS from 'react-native-fs';
import RNShare from 'react-native-share';

export default function App() {
  const { loadLensGroup, applyLens, takeSnapshot } = useCameraKit();
  const [lenses, setLenses] = useState<Lens[]>([]);
  const [cameraActive, setCameraActive] = useState(false);
  const [activeLensId, setActiveLensId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedImageUri, setSavedImageUri] = useState<string | null>(null);
  const [showSavedImage, setShowSavedImage] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');


  const toggleCamera = () => {
    setCameraPosition((prevPosition) => (prevPosition === 'back' ? 'front' : 'back'));
  };

  const requestPermissions = async () => {
    try {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ];
        if (Platform.Version >= 33) {
          permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
        } else {
          permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        }
        const granted = await PermissionsAndroid.requestMultiple(permissions);
        return Object.values(granted).every((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
      return true;
    } catch (err) {
      setError('Permission error: ' + err);
      return false;
    }
  };

  const handleStartCamera = async () => {
    const granted = await requestPermissions();
    if (granted) {
      setCameraActive(true);
    } else {
      setError('Camera or storage permissions denied.');
    }
  };

  async function saveImageToGallery(uri: string) {
    try {
      const fileName = `hair_snapshot_${Date.now()}.jpeg`;
      const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      const cleanUri = uri.replace('file://', '');
      await RNFS.copyFile(cleanUri, destPath);
      const fileUri = 'file://' + destPath;
      setSavedImageUri(fileUri);
      setShowSavedImage(true);

      if (Platform.OS === 'android') {
        ToastAndroid.show('Photo saved to gallery!', ToastAndroid.SHORT);
      } else {
        Alert.alert('Success', 'Photo saved to gallery!');
      }
    } catch (err) {
      setError('Failed to save image. Please check permissions.');
    }
  }

  const handleTakePhoto = async () => {
    try {
      const photo = await takeSnapshot('JPEG', 100);
      if (photo?.uri) {
        await saveImageToGallery(photo.uri);
      }
    } catch (err) {
      setError('Could not capture photo.');
    }
  };

  useEffect(() => {
    const fetchLenses = async () => {
      try {
        const lensData = await loadLensGroup('eaaa05b3-54d0-4175-add2-2919882026dd');
        setLenses(lensData);
      } catch (err) {
        setError('Failed to load lenses');
      }
    };
    if (cameraActive) fetchLenses();
  }, [cameraActive]);

  const handleLensSelect = (lensId: string) => {
    applyLens(lensId);
    setActiveLensId(lensId);
  };

  const handleShare = async () => {
    try {
      if (!savedImageUri) return;
      const options = {
        title: 'Check out my photo!',
        message: 'Check out this cool photo I took!',
        url: savedImageUri,
        type: 'image/jpeg',
        failOnCancel: false,
      };
      await RNShare.open(options);
    } catch (err) {
      setError('Could not share image.');
    }
  };

  return (
    <CameraKitContext apiToken="eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzQ3MDMzMjY5LCJzdWIiOiIwYWEzYTgyZC05OGE4LTQ1YzYtYTFhMS0yYTYxYmQ4YjE4Yjh-U1RBR0lOR343Y2I4YjY2Ny02NWVhLTRhNDUtYjZlOS0xODU5NDU2ZGEyMmEifQ.qEVuo_I8GTBrvYHLmXF4m3a-RdI4mLWDtMhLAyKf1gc">
      <View style={{ flex: 1 }}>
        {!cameraActive ? (
          <View style={styles.centered}>
            <Text style={{ fontSize: 18 }}>Start Camera</Text>
            <Button title="Open Camera" onPress={handleStartCamera} />
            {error && <Text style={styles.error}>{error}</Text>}
          </View>
        ) : (
          <>
            <CameraPreviewView
              style={{ flex: 1 }}
              cameraPosition={cameraPosition}
              mirrorFramesHorizontally={false}
            />
            <View style={styles.buttonsContainer}>
              <Pressable onPress={toggleCamera} style={styles.switchCameraButton}>
                <Text style={styles.captureText}>🔄 Switch Camera</Text>
              </Pressable>

              <Pressable onPress={handleTakePhoto} style={styles.captureButton}>
                <Text style={styles.captureText}>📸 Capture</Text>
              </Pressable>
            </View>

            {lenses.length === 0 ? (
              <View style={styles.centered}>
                <Text style={{ color: 'grey' }}>No lenses available</Text>
              </View>
            ) : (
              <FlatList
                horizontal
                data={lenses}
                renderItem={({ item }) => {
                  const iconUrl = item.icons?.[0]?.imageUrl;
                  return (
                    <Pressable
                      onPress={() => handleLensSelect(item.id)}
                      style={[
                        styles.lensIconWrapper,
                        activeLensId === item.id && styles.selectedLens,
                      ]}
                    >
                      {iconUrl ? (
                        <Image
                          source={{ uri: iconUrl }}
                          style={styles.lensIcon}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.noIcon}>
                          <Text style={styles.noIconText}>No Icon</Text>
                        </View>
                      )}
                    </Pressable>
                  );
                }}
                keyExtractor={(item) => item.id}
                style={styles.lensList}
              />
            )}
          </>
        )}
        {showSavedImage && savedImageUri && (
          <View style={styles.imageModal}>
            <Image
              source={{ uri: savedImageUri }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
            <Pressable onPress={() => setShowSavedImage(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
            <Pressable onPress={handleShare} style={styles.shareButton}>
              <Text style={styles.shareButtonText}>Share</Text>
            </Pressable>
          </View>
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
  buttonsContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  captureButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginLeft: 10,
  },
  captureText: {
    color: 'white',
    fontSize: 16,
  },
  switchCameraButton: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  lensList: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  lensIconWrapper: {
    marginHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  lensIcon: {
    width: 60,
    height: 60,
  },
  selectedLens: {
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  noIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  noIconText: {
    fontSize: 10,
    color: '#333',
  },
  imageModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  fullScreenImage: {
    width: '90%',
    height: '70%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  shareButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
