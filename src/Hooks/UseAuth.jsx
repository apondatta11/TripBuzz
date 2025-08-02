import React, { use } from 'react';
import { AuthContext } from '../provider/AuthContext';

const UseAuth = () => {
    const authInfo = use(AuthContext);
    return authInfo
};

export default UseAuth;