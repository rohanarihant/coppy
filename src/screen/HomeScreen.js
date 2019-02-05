import React from 'react';
import {StyleSheet, Image, ScrollView, ImageBackground} from 'react-native';
import {
    Container,Icon, Thumbnail, Content, View, Text,Body,List, ListItem, Left, Right
} from 'native-base';
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';

import Header from '../component/Header';
import Padder from "../utils/Padder";

/*
 * Rahul
 * */

const styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: 'red'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    slide: {
        justifyContent: 'center',
        backgroundColor: 'red'
    },
});

const vendors = (vendorList) => {
    return vendorList.map((vendor, index) => {
        const { company_logo, company_name, tagline, pricing, rating, delivery } = vendor;
        console.log("INCREASING", company_logo)
        return(
        <List style={{backgroundColor: 'white'}} key ={index} >
            <ListItem thumbnail>
                <Left>
                    <Thumbnail style={{resizeMode: 'cover', height: 70, width: 70}} square source={{ uri: company_logo }} />
                </Left>
                <Body>
                    <Text style={{ fontWeight: 'bold' }}>{ company_name }   </Text>
                    <Text note numberOfLines={1}>{ tagline} </Text>
                    <Text note numberOfLines={1} style={{color: 'red'}}>{ pricing }</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Icon style={{ fontSize: 16 }} name="calendar" />
                        <Text note  style={{ color: '#273444', marginLeft:10 }}>{ delivery }</Text>
                    </View>
                </Body>
                <Right>
                    <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={Number(rating)}
                        starStyle={{padding: 1}}
                        starSize={16}
                        fullStarColor={'#F2C011'}
                    />
                    <Text style={{ fontSize: 12}}>Ratings({rating})</Text>
                </Right>
            </ListItem>
            <Padder size={5} bckcolor = '#F8F7FA' />
        </List>
        )})
};



const saleCategories = () => {
    return([1,2,3].map((index) => {
          return <View style={{height:150, width: 150, paddingLeft:20, paddingTop: 20, paddingBottom:10}} key={index} >
                      <ImageBackground source={{uri: 'https://www.gstatic.com/webp/gallery/4.jpg'}} style={{width: '100%', height: '100%'}}>
                          <View style={{position: 'absolute', backgroundColor:'black', left: 0, right: 0, bottom: 0, justifyContent: 'flex-end', alignItems: 'center'}}>
                              <Text style={{ color: 'white'}}>Wash & Fold</Text>
                              <Text style={{ color: 'white'}}>Min 8 Hours</Text>
                          </View>
                      </ImageBackground>
              </View>
      }))
};

const HomeScreen = ({ fetchSliderImage, bannerImages, vendorList }) => {
    console.log(bannerImages)
    return(
            <Container>
                <Content>
                    <View style={{height:240}}>
                        {bannerImages?
                            <Swiper autoplayTimeout={1.5} style={styles.wrapper} autoplay={true}>
                                <Image style={{flex: 1.5, height: undefined, resizeMode: 'contain',}} source={{uri:bannerImages[0].imagename}}/>
                                <Image style={{flex: 1.5, height: undefined, resizeMode: 'cover',}} source={{uri:bannerImages[1].imagename}}/>
                                <Image style={{flex: 1.5, resizeMode: 'cover',}} source={{uri:bannerImages[2].imagename}}/>
                            </Swiper> :
                            <Text>
                                Loading...
                            </Text>
                        }
                    </View>

                    <ScrollView  style={{flex: 1, flexDirection:'row', backgroundColor:'#F8F7FA'}} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {vendorList && saleCategories(vendorList)}
                    </ScrollView>
                    <Text style={{ color: '#273444', paddingLeft:20, paddingBottom:10,  backgroundColor:'#F8F7FA'}}>Near You</Text>

                    <View style={{flex: 2}}>
                        {vendorList ?
                            vendors(vendorList):
                            <View>
                                <Text> {/*Loading Vendors*/} </Text>
                            </View>
                        }
                    </View>
                </Content>
            </Container>

)};


export default HomeScreen;
