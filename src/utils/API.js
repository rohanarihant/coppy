/*
 * @file: API.js
 * @description: API Constants.
 * @date: 29.November.2018
 * @author: Rahul
 * */

const BASE_API  = 'https://creaseart.com/wtemplate/';
export const API_CONSTANT = {
    HOME_SCREEN_BANNER : `${BASE_API}itf_banner.php/`,
    LOGIN : `${BASE_API}itf_login.php/`,
    REGISTER: `${BASE_API}itf_register.php/`,
    FORGOT_PASSWORD: `${BASE_API}itf_forgot.php`,
    USERS : `${BASE_API}users/`,
    USER: `${BASE_API}user/{}`,
    ITF_VENDOR_LIST:  `${BASE_API}itf_vendor_list.php/`,
    PROFILE_DISPLAY: `${BASE_API}itf_profile.php`,
    USER_ORDER: `${BASE_API}itf_user_orders.php`,
    UPDATE_PROFILE:`${BASE_API}itf_profile_save.php`,
    ADD_ADDRESS:`${BASE_API}itf_add_address.php`,
    DELETE_ADDRESS:`${BASE_API}itf_delete_address.php`,
    ABOUT_CREASEART: `${BASE_API}itf_content.php`,
    USER_FEEDBACK: `${BASE_API}itf_user_feedback.php`,
    VENDOR_LOGIN: `${BASE_API}itf_vendor_login.php`,
    NEW_VENDOR_LIST:  `${BASE_API}vendor_order_list.php`,
       
    // https://creaseart.com/wtemplate/itf_vendor_login.php?email=stadhawk@creaseart.com&password=12121212
    // https://creaseart.com/wtemplate/itf_add_address.php?user_id=2&address_name=delhi%20new%20delhi
    // https://creaseart.com/wtemplate/itf_delete_address.php?user_id=2&id=2
    // https://creaseart.com/wtemplate/itf_user_feedback.php?user_id=3&message=this is the test feedback



};
