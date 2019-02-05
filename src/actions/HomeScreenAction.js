import {
    FETCH_HOME_SLIDER_IMAGE, HOME_SLIDER_IMAGE_SUCCESS, HOME_SLIDER_IMAGE_FAILURE, FETCH_VENDOR_LIST,
} from '../utils/Constants'
import axios from 'axios';
import {API_CONSTANT} from "../utils/API";

/*
 * @file: HomeScreenAction.js
 * @description: To define actions of home screen
 * @date: 29.November.2018
 * @author: Rahul
 * */



export const fetchHomeSliderImage = () => {
    return (dispatch) => {

        axios.get(API_CONSTANT.HOME_SCREEN_BANNER)
            .then((data)=>{
            console.log("IMAGES", data)
            dispatch({
                type: FETCH_HOME_SLIDER_IMAGE,
                data: data,
            })
        }).catch((error)=>{
            console.warn(error, "Action Banner")
        })
    }
};

export const fetchVendorList = () => {
    return (dispatch) => {
        axios.get(API_CONSTANT.ITF_VENDOR_LIST)
            .then((data)=>{
                dispatch({
                    type: FETCH_VENDOR_LIST,
                    data: data,
                })
            }).catch((error)=>{
            console.warn(error, "Action vendor")
        })
    }
};

export const homeSliderImageBegin = () => ({
    type: FETCH_HOME_SLIDER_IMAGE
});

export const homeSliderImageSuccess = image => ({
    type: HOME_SLIDER_IMAGE_SUCCESS,
    payload: { image }
});

export const homeSliderImageFailure = error => ({
    type: HOME_SLIDER_IMAGE_FAILURE,
    payload: { error }
});

export default { fetchHomeSliderImage, fetchVendorList } ;