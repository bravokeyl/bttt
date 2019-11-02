import React from 'react';
import {Image} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

import {
  DiscoverScreen,
  GenresScreen,
  MineScreen,
  ProfileScreen,
  PopularScreen,
  RegionsScreen,
  ArticleScreen,
} from './src/screens';

// const DiscoverStack = createStackNavigator({
//   Discover: {
//     screen: DiscoverScreen,
//     navigationOptions: ({navigation}) => ({
//       headerShown: false,
//       headerBackTitle: null,
//     }),
//   },
//   // popular: {
//   //   screen: PopularScreen,
//   //   navigationOptions: ({navigation}) => ({
//   //     title: 'Popular',
//   //     headerBackTitle: null,
//   //   }),
//   // },
//   // regions: {
//   //   screen: RegionsScreen,
//   //   navigationOptions: ({navigation}) => ({
//   //     title: 'Regions',
//   //   }),
//   // },
// });

// DiscoverStack.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }

//   return {
//     tabBarVisible,
//   };
// };

const TabNavigator = createBottomTabNavigator(
  {
    Discover: DiscoverScreen,
    Genres: GenresScreen,
    Mine: MineScreen,
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let selectedIcon;
        let defaultIcon;
        if (routeName === 'Discover') {
          iconName = 'ios-globe';
          selectedIcon = require('./src/assets/ic_discover_selected.png');
          defaultIcon = require('./src/assets/ic_discover_default.png');
        }
        if (routeName === 'Genres') {
          iconName = `ios-radio`;
          selectedIcon = require('./src/assets/ic_genres_selected.png');
          defaultIcon = require('./src/assets/ic_genres_default.png');
        }
        if (routeName === 'Mine') {
          iconName = `ios-bookmark`;
          selectedIcon = require('./src/assets/ic_favourite_selected.png');
          defaultIcon = require('./src/assets/ic_favourite_default.png');
        }
        if (routeName === 'Profile') {
          iconName = `ios-person`;
          selectedIcon = require('./src/assets/ic_profile_selected.png');
          defaultIcon = require('./src/assets/ic_profile_default.png');
        }
        return (
          <Image
            style={{width: 25, height: 25}}
            source={focused ? selectedIcon : defaultIcon}
          />
        );
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AppStack = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
      headerBackTitle: null,
    }),
  },
  popular: {
    screen: PopularScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Popular',
      headerBackTitle: null,
      // headerLeft: null,
    }),
  },
  regions: {
    screen: RegionsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Regions',
      headerBackTitle: null,
    }),
  },
  article: {
    screen: ArticleScreen,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.getParam('title') || null}`,
      headerBackTitle: null,
    }),
  }
});

AppStack.navigationOptions = ({ navigation }) => {
  return {
    headerBackTitle: null,
    headerLeft: null,
  }
};

export default createAppContainer(AppStack);
