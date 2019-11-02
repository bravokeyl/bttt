import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import SvgAnimatedLinearGradient from "react-native-svg-animated-linear-gradient";
import Svg, { Circle, Rect } from "react-native-svg";

import styles from "../styles/articles.style";

import usePosts from "./usePosts";
import { getDescription } from "../utils/helpers";

const defaultImageSource = require("../assets/no-image.png");

const Articles = props => {
  console.log("Articles CMP called");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  useEffect(() => {
    console.log("Articles useEffect!", articles.length);
    return () => console.log("Articles unmounting...");
  }, []);

  const { posts: articles, loading } = usePosts(page, perPage);

  renderArticleSkeleton = keyId => {
    const blogItemStyles = [styles.blogItem];
    const blogImageStyles = [styles.blogImage];
    if (props.horizontal) {
      blogItemStyles.push(styles.blogHItem);
      blogImageStyles.push(styles.blogHImage);
    }
    return (
      <View style={blogItemStyles} key={keyId}>
        <SvgAnimatedLinearGradient height={260}>
          <Rect
            x="0"
            y="0"
            rx="5"
            ry="5"
            width={
              props.horizontal
                ? styles.blogHItem.width - 6
                : styles.blogImage.width
            }
            height="200"
          />
          <Rect
            x="0"
            y="206"
            rx="1"
            ry="1"
            width={
              props.horizontal
                ? styles.blogHItem.width - 6
                : styles.blogImage.width
            }
            height="12"
          />
          <Rect
            x="0"
            y="224"
            rx="1"
            ry="1"
            width={
              props.horizontal
                ? styles.blogHItem.width - 6
                : styles.blogImage.width
            }
            height="12"
          />
          <Rect x="0" y="242" rx="1" ry="1" width={110} height="12" />
        </SvgAnimatedLinearGradient>
      </View>
    );
  };

  renderSkeleton = () => {
    const articles = [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }];
    const blogItemStyles = [styles.blogItem];
    const blogImageStyles = [styles.blogImage];
    if (props.horizontal) {
      blogItemStyles.push(styles.blogHItem);
      blogImageStyles.push(styles.blogHImage);
    }
    if (props.horizontal) {
      return (
        <FlatList
          horizontal
          data={articles}
          renderItem={({ item }) => renderArticleSkeleton(item.id)}
          keyExtractor={item => item.id + ""}
        />
      );
    }
    return articles.map(e => renderArticleSkeleton(e.id));
  };

  renderArticle = (b, horizontal, loading) => {
    const blogItemStyles = [styles.blogItem];
    const blogImageStyles = [styles.blogImage];
    if (horizontal) {
      blogItemStyles.push(styles.blogHItem);
      blogImageStyles.push(styles.blogHImage);
    }
    const blogTitle = getDescription(b.title.rendered, 200);
    let featuredImage = null;
    const { better_featured_image } = b || {};
    const {
      media_details: { sizes }
    } = better_featured_image || {};
    const fObj = sizes["extra-image-small"];
    const { source_url } = fObj || {};
    if (source_url) {
      featuredImage = source_url;
    }
    const blogData = {
      id: b.id,
      slug: b.slug,
      title: blogTitle,
      content: b.content.rendered,
      featuredImage: featuredImage,
      date: b.date,
      link: b.link
    };
    return (
      <TouchableOpacity
        key={b.id}
        onPress={() => props.navigation.navigate("article", blogData)}
      >
        <View style={blogItemStyles}>
          {!loading && (
            <View>
              <Image
                defaultSource={defaultImageSource}
                style={blogImageStyles}
                uri={featuredImage}
              />
              <Text style={styles.blogTitle} numberOfLines={3}>
                {blogTitle}
              </Text>
              {b.date && <Text style={styles.blogPublishedDate}>{b.date}</Text>}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginTop: 16,
        flexWrap: "wrap"
      }}
    >
      {loading && this.renderSkeleton()}
      {!loading && props.horizontal && (
        <FlatList
          horizontal
          data={articles}
          renderItem={({ item }) =>
            renderArticle(item, styles.blogHItem, loading)
          }
          keyExtractor={item => item.id + ""}
        />
      )}
      {!props.horizontal &&
        articles &&
        Array.isArray(articles) &&
        articles.map(b => renderArticle(b, false, loading))}
    </View>
  );
};

export default Articles;
