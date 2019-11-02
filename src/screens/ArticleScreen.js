import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import HTML from "react-native-render-html";
import * as SecureStore from "expo-secure-store";

import Share from "../components/Share";
import styles from "../styles/articles.style";
const { width, height } = Dimensions.get("window");

const likeIcon = require("../assets/ic_great_default.png");
const likedIcon = require("../assets/ic_great_selected.png");
const favoriteIcon = require("../assets/ic_favorite_reader_default.png");
const favoritedIcon = require("../assets/ic_favorite_reader_selected.png");
const contributeIcon = require("../assets/ic_comment_bottom_reader.png");
const shareIcon = require("../assets/ic_share_end.png");

const Article = props => {
  const [isLiked, setLike] = useState("n");
  const [isFavorited, setFavorite] = useState("n");

  const actionItems = [
    {
      key: "like",
      name: "Like",
      icon: isLiked === "y" ? likedIcon : likeIcon
    },
    {
      key: "favorite",
      name: "Favorite",
      icon: isFavorited === "y" ? favoritedIcon : favoriteIcon
    },
    {
      key: "share",
      name: "Share",
      icon: shareIcon
    },
    {
      key: "comment",
      name: "Comment",
      icon: contributeIcon
    }
  ];
  const htmlContent = props.navigation.getParam("content");
  const color = "#333";
  const tagsStyles = {
    p: { margin: 0, paddingBottom: 8, color },
    li: { color }
  };
  const postId = props.navigation.getParam("id");

  updatePostData = (key, val) => {
    if (key === "like") {
      setLike(val);
    }
    if (key === "favorite") {
      setFavorite(val);
    }
  };

  getData = async key => {
    try {
      const value = await SecureStore.getItemAsync(`p_${key}_${postId}`);
      if (value !== null) {
        updatePostData(key, value);
        return value;
      } else {
        updatePostData(key, "n");
      }
    } catch (e) {
      updatePostData(key, "n");
    }
  };

  updateArticleAction = async (key, val) => {
    try {
      await SecureStore.setItemAsync(`p_${key}_${postId}`, val);
      updatePostData(key, val);
    } catch (e) {}
  };

  useEffect(() => {
    getData("like");
    getData("favorite");
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            // flex: 1,
            // flexDirection: 'row',
            marginVertical: 16,
            paddingHorizontal: 16
            // flexWrap: 'wrap',
          }}
        >
          <Image
            style={{
              width: width - 32,
              height: 200,
              marginBottom: 8
            }}
            source={{
              uri: props.navigation.getParam("featuredImage")
            }}
          />
          <Text
            numberOfLines={10}
            style={[styles.blogTitle, { textTransform: "uppercase" }]}
          >
            {props.navigation.getParam("title")}
          </Text>
          <HTML
            html={htmlContent}
            tagsStyles={tagsStyles}
            imagesMaxWidth={Dimensions.get("window").width}
            renderers={{
              img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                const { src, alt } = htmlAttribs;
                if (!src) {
                  return false;
                }
                const newWidth = width - 32;
                const newHeight = height * 0.6;
                return (
                  <Image
                    source={{ uri: src }}
                    key={props.navigation.getParam("id")}
                    style={{
                      width: newWidth,
                      height: 240,
                      resizeMode: "contain"
                    }}
                  />
                );
              }
            }}
          />
          <Share
            isLiked={isLiked}
            isFavorited={isFavorited}
            updateArticleAction={updateArticleAction}
            actionItems={actionItems}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Article;
