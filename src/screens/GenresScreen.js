import React from 'react';
import styles from "../styles/genres.style";
import { Text, View, ScrollView, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ArticleFullDetails from '../components/ArticleFullDetails';

class GenresScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      categories: [],
      categoryContent: [],
      loader: false
    }
  }
  componentDidMount() {
    fetch("https://thetheatretimes.com/wp-json/wp/v2/categories").then((response) => {
      response.json().then((data) => {
        this._renderCategory(data[0].id)
        this.setState({categories: data.map(
          (category) => [category.id, category.name]
        )})
      })
    })
  }
  _renderCategory(category){
    this.setState({loader: true})
    fetch("https://thetheatretimes.com/wp-json/wp/v2/posts?categories=" + category).then((response) => {
      response.json().then((data) => {
        this.setState({
          categoryContent: data.map((post) => {
            return post
          })
        })
        this.setState({loader: false})
      })
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#00ff00" animating={this.state.loader} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 80}}>
          {this.state.categories.map((category) => {
            return (<TouchableOpacity
                style={[styles.genreItem, { textTransform: "uppercase" }]}
                key={category[0]}
                onPress = {() => this._renderCategory(category[0])}
              >
                <Text> {category[1]} </Text>
              </TouchableOpacity>)  
          })}
        </View>
        <ScrollView >
          {this.state.categoryContent.map((post) => {
            return (<ArticleFullDetails key={post.id} title={post.title.rendered} featuredImage={post.jetpack_featured_media_url} />)
          })} 
        </ScrollView>
        
      </View>
    );
  }
}

export default GenresScreen;
