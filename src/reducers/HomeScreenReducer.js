import { FETCH_HOME_SLIDER_IMAGE, FETCH_VENDOR_LIST } from '../utils/Constants'

const HomeScreenReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOME_SLIDER_IMAGE:
        {
            return {
                ...state,
                bannerImages: action.data.data.itfdata
            };
        }

        case FETCH_VENDOR_LIST:{
            return {
                ...state,
                vendorList: action.data.data.vendor_list
            };
        }

        default:
            return state;
    }
};

export default HomeScreenReducer;