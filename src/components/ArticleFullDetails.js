import React from 'react';
import styles from "../styles/articles.style";

import { 
  Text, 
  View, 
  TouchableOpacity, 
  Image 
} from 'react-native';

class ArticleFullDetails extends React.Component {
  render() {
    return (
        <View
          style={{
            marginVertical: 16,
            paddingHorizontal: 16
          }}
        >
          <Image
            style={{
              width: 160,
              height: 200,
              marginBottom: 8
            }}
            source={{
              uri: this.props.featuredImage
            }}
          />
          <Text
            numberOfLines={10}
            style={[styles.blogTitle, { textTransform: "uppercase" }]}
          >
            {this.props.title}
          </Text>
        </View>
      
    );
  }
}

export default ArticleFullDetails;
