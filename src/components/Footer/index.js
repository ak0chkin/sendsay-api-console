import React from 'react';
import './index.css';
import {ReactComponent as Format} from './prettify.svg';
import {inject, observer} from 'mobx-react';

const Footer = ({sendsayStore}) => {
    return (
        <footer className="footer d-flex">
            <button type="button" className="button button-send" onClick={sendsayStore.fetch}>
                <span>Отправить</span>
            </button>
            <a className="gh-link" href="https://github.com/ak0chkin" target="_blank" rel="noreferrer">@akochkin</a>
            <button className="button button-transparent" onClick={sendsayStore.prettify}>
                <Format className="prettify"/>
                <span>Форматировать</span>
            </button>
        </footer>
    );
}

export default inject("sendsayStore")(observer(Footer));
