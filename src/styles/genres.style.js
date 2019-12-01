import { StyleSheet, Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default StyleSheet.create({
  genreItem: {
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "red",
      marginLeft: 5,
      marginBottom: 5,
      borderRadius: 10
  }
});
