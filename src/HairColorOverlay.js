import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HairColorOverlay = ({ hairImage, selectedColor }) => {
  return (
    <View style={styles.container}>
      <Image source={hairImage} style={styles.hairImage} />
      {/* Overlay the selected color */}
      <View style={[styles.overlay, { backgroundColor: selectedColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  hairImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5, // Adjust the opacity to make the overlay more transparent
  },
});

export default HairColorOverlay;
