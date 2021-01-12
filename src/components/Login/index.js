import React from 'react';
import {Field, Form} from 'react-final-form'
import './index.css';
import validate from './validate';
import {inject, observer} from 'mobx-react';
import {ReactComponent as Logo} from '../../sendsay.svg'
import {ReactComponent as Meh} from './meh.svg';
import {ReactComponent as Loader} from './loader.svg'
import {useState} from 'react';


const fieldAdapter = ({input, type, label, annotation, placeholder, meta: {touched, error}}) => (
    <div className="input-group">
        <label className="input-group__label">{label}</label>
        <span className="input-group__annotation ml-auto">{annotation}</span>
        <input type={type} {...input} className="input-group__field" placeholder={placeholder}/>
        {touched && error && <span className="input-group__error">{error}</span>}
    </div>
)

const formAdapter = ({handleSubmit, message, submitting, valid}) => (
    <form onSubmit={handleSubmit}>
        <div className="login__title">API-консолька</div>
        {message && (
            <div className="alert alert_error">
                <Meh className="alert__img"/>
                <div className="alert__title">Вход не вышел</div>
                <div/>
                <div className="alert__text">{message}</div>
            </div>
        )}
        <Field name="login" component={fieldAdapter} type="text" label="Логин" placeholder="Логин"/>
        <Field name="sublogin" component={fieldAdapter} type="text" label="Сублогин" annotation="Опционально"
               placeholder="Сублогин (опционально)"/>
        <Field name="password" component={fieldAdapter} type="password" label="Пароль"
               placeholder="Пароль"/>
        <button type="submit" className="button button-send" disabled={!valid}>
            {!submitting
                ? <span>Войти</span>
                : <Loader/>}
        </button>
    </form>
)

const Login = ({sendsayStore}) => {
    const [message, setMessage] = useState(undefined);

    const handleLogin = async (values) => {
        setMessage(await sendsayStore.login(values));
    }

    return (
        <div className="login">
            <Logo className="login__logo"/>
            <div className="login-contentwrapper">
                <Form onSubmit={handleLogin} validate={validate} message={message}
                      initialValues={{login: "x_1606239365321773", sublogin: "testexercise", password: "Kek427386"}}
                      render={formAdapter}/>
            </div>
            <a className="gh-link" href="https://github.com/ak0chkin" target="_blank" rel="noreferrer">@ak0chkin</a>
        </div>
    );
}

export default inject("sendsayStore")(observer(Login));
