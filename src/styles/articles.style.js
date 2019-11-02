import { StyleSheet, Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default StyleSheet.create({
  blogItemWidth: (viewportWidth / 2) - 16,
  blogItem: {
    width: (viewportWidth / 2) - 16,
    marginBottom: 8,
  },
  blogHItem: {
    width: (viewportWidth / 2) - 32,
  },
  blogImage: {
    width: (viewportWidth / 2) - 22,
    marginRight: 6,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: '#ededed',
  },
  blogHImage: {
    width: (viewportWidth / 2) - 38,
  },
  blogTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 6,
  },
  blogPublishedDate: {
    fontSize: 11,
    color: '#333',
    marginBottom: 6,
  }
});
