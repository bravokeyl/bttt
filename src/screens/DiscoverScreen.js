import React from 'react';
import {
  SafeAreaView,
  Platform,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import CarouselWrapper from '../components/CarouselWrapper';
import articlesData from '../static/articles';
import Section from '../components/Section';

const chatIcon = require('../assets/chat-bubble-50.png');
const openBookIcon = require('../assets/ic_discount_discover.png');
const coinIcon = require('../assets/ic_free_coin.png');
const popularIcon = require('../assets/ic_ranking.png');

const SLIDER_1_FIRST_ITEM = 1;

class DiscoverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  render() {
    console.log('DISCOVER SCREEN RENDER', this.state.slider1ActiveSlide);
    const actionItems = [
      {
        key: 'popular',
        name: 'Popular',
        icon: popularIcon,
      },
      {
        key: 'regions',
        name: 'Community',
        icon: chatIcon,
      },
      {
        key: 'free-now',
        name: 'Free Now',
        icon: openBookIcon,
      },
      {
        key: 'coins',
        name: 'Coins',
        icon: coinIcon,
      },
    ];
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <View>
            <CarouselWrapper />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingHorizontal: 16,
                height: 90,
              }}>
              {actionItems.map(e => {
                return (
                  <TouchableOpacity
                    key={e.key}
                    onPress={() => this.props.navigation.navigate(e.key)}>
                    <View style={{alignItems: 'center'}}>
                      <Image style={{width: 35, height: 35}} source={e.icon} />
                      <Text
                        style={{
                          marginTop: 6,
                          textTransform: 'uppercase',
                          fontSize: 11,
                        }}>
                        {e.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <Section
            data={articlesData}
            navigation={this.props.navigation}
            headingText="Latest"
            navigationKey="latest"
            mkey="latest"
            horizontal
          />
          <Section
            data={articlesData}
            navigation={this.props.navigation}
            headingText="Spotlight"
            navigationKey="spotlight"
            mkey="spotlight"
          />
          <Section
            data={articlesData}
            navigation={this.props.navigation}
            headingText="Editor's Picks"
            navigationKey="editor-picks"
            mkey="editor-picks"
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default DiscoverScreen;
