import React from 'react';
import { View } from 'native-base';

const Padder = ({ size, bckcolor }) => (
    <View style={{ height: size, backgroundColor:bckcolor ||'white', }} />
);

export default Padder;
