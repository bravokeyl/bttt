import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import HTML from 'react-native-render-html';

import styles from '../styles/articles.style';
const { width, height } = Dimensions.get("window");
const Article = props => {
  const htmlContent = props.navigation.getParam('content');
  const color = "#333";
  const tagsStyles = {
    p: { margin: 0, paddingBottom: 8, color },
    li: { color },
  };
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            // flex: 1,
            // flexDirection: 'row',
            marginVertical: 16,
            paddingHorizontal: 16,
            // flexWrap: 'wrap',
          }}>
          <Image
            style={{
              width: (width - 32),
              height: 200,
              marginBottom: 8,
            }}
            source={{
              uri: props.navigation.getParam('featuredImage'),
            }}
          />
          <Text numberOfLines={10} style={styles.blogTitle}>{props.navigation.getParam('title')}</Text>
          <HTML
            html={htmlContent}
            tagsStyles={tagsStyles}
            imagesMaxWidth={Dimensions.get('window').width}
            renderers={{
              img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                const {src, alt} = htmlAttribs;
                if (!src) {
                  return false;
                }
                const newWidth = width - 32;
                const newHeight = height * 0.6;
                return (
                  <Image
                    source={{uri: src}}
                    key={props.navigation.getParam('id')}
                    style={{
                      width: newWidth,
                      height: 240,
                      resizeMode: 'contain',
                    }}
                  />
                );
              },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Article;
