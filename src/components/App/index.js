import React from 'react';
import './index.css';
import Login from '../Login';
import {inject, observer} from 'mobx-react';

const App = ({sendsayStore}) => {
    return (
        <div className="App">
            {!sendsayStore.session ? <Login/> : <></>}
        </div>
    );
};

export default inject("sendsayStore")(observer(App));
