import React, {useEffect, useState} from 'react';
import './index.css';
import {inject, observer} from 'mobx-react';
import {ReactComponent as Logo} from '../../sendsay.svg'
import {ReactComponent as Logout} from './logout.svg';
import {ReactComponent as Fullscreen} from './fullscreen.svg';
import {ReactComponent as Windowed} from './windowed.svg';

const Header = ({sendsayStore, appRef}) => {
    const [fullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement));

    useEffect(() => {
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        }
    }, [])

    const handleFullscreenChange = () => {
        setFullscreen(state => !state);
    }

    const toggleFullscreen = (docEl) => {
        const requestFullscreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        const cancelFullscreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;

        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            requestFullscreen.call(appRef.current);
        } else {
            cancelFullscreen.call(document);
        }
    }

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
                    <button className="button button-transparent" onClick={() => {
                        toggleFullscreen(appRef.current)
                    }}>
                        {fullscreen ? <Windowed/> : <Fullscreen/>}
                    </button>
                </li>
            </ul>
        </header>
    );
};

export default inject("sendsayStore")(observer(Header));
