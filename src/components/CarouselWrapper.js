import React from 'react';
import {
  View,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import SliderEntry from '../components/SliderEntry';
import styles, {colors} from '../styles/index.style';
import {sliderWidth, itemWidth} from '../styles/SliderEntry.style';
import {ENTRIES1, ENTRIES2} from '../static/entries';

const SLIDER_1_FIRST_ITEM = 1;

class CarouselWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  navigateToScreen = screen => {
    this.props.navigation.navigation(screen);
  };

  render() {
    console.log('CarouselWrapper RENDER', this.state.slider1ActiveSlide);
    return (
      <View>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={ENTRIES1}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={sliderWidth}
          firstItem={SLIDER_1_FIRST_ITEM}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
        />
      </View>
    );
  }
}

export default CarouselWrapper;
