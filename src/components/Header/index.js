import React from 'react';
import './index.css';
import {inject, observer} from 'mobx-react';
import {ReactComponent as Logo} from '../../sendsay.svg'
import {ReactComponent as Logout} from './logout.svg';
import {ReactComponent as Fullscreen} from './fullscreen.svg';

const Header = ({sendsayStore}) => {
    return (
        <header className="header d-flex">
            <ul className="d-flex">
                <Logo/>
                <li>
                    <span className="header__title">API-консолька</span>
                </li>
            </ul>
            <ul className="d-flex ml-auto">
                <li>
                    <div className="header__user-info">
                        <span>{sendsayStore.account}</span>
                        {sendsayStore.account !== sendsayStore.sublogin && <span> : {sendsayStore.sublogin}</span>}
                    </div>
                </li>
                <li>
                    <button className="button button-transparent" onClick={sendsayStore.logout}>
                        <span>Выйти</span>
                        <Logout className="logout"/>
                    </button>
                </li>
                <li>
                    <button className="button button-transparent">
                        <Fullscreen/>
                    </button>
                </li>
            </ul>
        </header>
    );
};

export default inject("sendsayStore")(observer(Header));
