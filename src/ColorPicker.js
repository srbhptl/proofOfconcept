import { StyleSheet, TouchableOpacity, View } from "react-native";

const hairColors = [
    { name: 'Blonde', color: '#FFD700' }, // Gold
    { name: 'Brown', color: '#8B4513' },  // SaddleBrown
    { name: 'Black', color: '#000000' },  // Black
    { name: 'Red', color: '#FF4500' },    // OrangeRed
  ];
  
  const ColorPicker = ({ onSelectColor }) => {
    return (
      <View style={styles.colorPickerContainer}>
        {hairColors.map((hairColor) => (
          <TouchableOpacity
            key={hairColor.name}
            style={[styles.colorCircle, { backgroundColor: hairColor.color }]}
            onPress={() => onSelectColor(hairColor.color)}
          />
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    colorPickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    colorCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  });
  
export default ColorPicker;
