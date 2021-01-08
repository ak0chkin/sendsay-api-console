import React from 'react';
import {Field, Form} from 'react-final-form'
import './index.css';
import validate from './validate';
import {inject, observer} from 'mobx-react';
import meh from './meh.svg';
import loading from './loading.svg';


const fieldAdapter = ({input, type, label, placeholder, meta: {asyncValidating, touched, error}}) => (
    <div className="input-group">
        <label className="input-group__label">{label}</label>
        <div className={asyncValidating ? "async-validating" : ""}>
            <input type={type} {...input} className="input-group__field" placeholder={placeholder}/>
            {touched && error && <span className="input-group__error">{error}</span>}
        </div>
    </div>
)

const formAdapter = inject("sendsayStore")(observer(({sendsayStore, handleSubmit, submitting, valid}) => (
    <form onSubmit={handleSubmit}>
        {sendsayStore.message && (
            <div className="alert alert_error">
                <img src={meh} alt="meh"/>
                <div className="alert__title">Вход не вышел</div>
                <div/>
                <div className="alert__text">{sendsayStore.message}</div>
            </div>
        )}
        <Field name="login" component={fieldAdapter} type="text" label="Логин" placeholder="Логин"/>
        <Field name="sublogin" component={fieldAdapter} type="text" label="Сублогин"
               placeholder="Сублогин (опционально)"/>
        <Field name="password" component={fieldAdapter} type="password" label="Пароль"
               placeholder="Пароль"/>
        <button type="submit" className="btn-send" disabled={!valid}>
            {!submitting
                ? "Войти"
                : <img src={loading} alt="loading"/>}
        </button>
    </form>
)))

const Login = ({sendsayStore}) => {

    const handleLogin = async (values) => {
        await sendsayStore.login(values);
    }

    return (
        <div className="Login">
            <Form onSubmit={handleLogin} validate={validate}
                  initialValues={{login: "x_1606239365321773", password: "Hui427386"}}
                  component={formAdapter}/>
        </div>
    );
}

export default inject("sendsayStore")(observer(Login));
