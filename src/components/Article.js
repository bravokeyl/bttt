import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/articles.style';

const Article = props => {
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 16,
          flexWrap: 'wrap',
        }}>
        <Text>Lorem ipsum</Text>
      </View>
    </SafeAreaView>
  );
};

export default Article;
