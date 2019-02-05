import React, {Component} from 'react';
import { connect } from 'react-redux';
import HomeScreen from '../screen/HomeScreen';
import {fetchVendorList, fetchHomeSliderImage} from "../actions/HomeScreenAction";

class Home extends Component {

    componentDidMount(){
     this.fetchData()
    }

    fetchData(){
        const { fetchSliderImage, fetchVendorData } = this.props;
        fetchSliderImage();
        fetchVendorData();
    }

    render() {
        const { bannerImages, vendorList } = this.props;
        console.log("UNDEFINEDDD", bannerImages)
        return (
            <HomeScreen bannerImages={bannerImages} vendorList={vendorList} />
        );
    }
}


const mapStateToProps = state => {
    console.log("HOME STATE", state)
    const { bannerImages, vendorList } = state.HomeScreenReducer;
    return { bannerImages, vendorList }
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSliderImage: () => { dispatch( fetchHomeSliderImage() )},
        fetchVendorData: () => { dispatch( fetchVendorList() )}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);