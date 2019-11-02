import React from "react";
import { View, Text, Image, TouchableOpacity, Share } from "react-native";

const ShareBottom = ({ isLiked, isFavorited, updateArticleAction, actionItems }) => {

  onShare = async articlerUrl => {
    try {
      const result = await Share.share({
        message: `I found an awesome article on theatre. You can read it here! ${articlerUrl}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          alert(result.activityType);
        } else {
          // shared
          alert("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        alert("Dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  handleBottomAction = action => {
    switch (action) {
      case "share": {
        onShare(
          "https://thetheatretimes.com/annie-bakers-the-antipodes-at-the-national-theatre/"
        );
        break;
      }
      case "favorite": {
        const update = (isFavorited == "y") ? "n" : "y";
        updateArticleAction("favorite", update);
        break;
      }
      case "like": {
        const update = isLiked === "y" ? "n" : "y";
        updateArticleAction("like", update);
        break;
      }
      case "comment": {
        alert("comment clicked");
        break;
      }
      default:
        alert("default clicked");
        break;
    }
  };

  return (
    <View style={{ margin: 16, padding: 16, backgroundColor: "#efefef" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: 16
        }}
      >
        {actionItems.map(e => {
          return (
            <TouchableOpacity
              key={e.key}
              onPress={() => handleBottomAction(e.key)}
            >
              <View style={{ alignItems: "center" }}>
                <Image style={{ width: 35, height: 35 }} source={e.icon} />
                <Text
                  style={{
                    marginTop: 6,
                    textTransform: "uppercase",
                    fontSize: 11
                  }}
                >
                  {e.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ShareBottom;
