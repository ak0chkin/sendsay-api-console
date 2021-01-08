import React from 'react';
import './index.css';
import Login from '../Login';
import {inject, observer} from 'mobx-react';
import Header from "../Header";

const App = ({sendsayStore}) => {
    return (
        <div className="App">
            {!sendsayStore.session ? <Login/> : <><Header/></>}
        </div>
    );
};

export default inject("sendsayStore")(observer(App));
