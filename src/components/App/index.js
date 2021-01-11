import React, {useRef} from 'react';
import './index.css';
import Login from '../Login';
import {inject, observer} from 'mobx-react';
import Header from "../Header";
import Editor from "../Editor";
import Footer from "../Footer";

const App = ({sendsayStore}) => {
    const appRef = useRef();

    return (
        <div className="App" ref={appRef}>
            {!sendsayStore.session ? <Login/> :
                <>
                    <Header appRef={appRef}/>
                    <div className="editors-set">
                        <Editor title="Запрос:"
                                config={{
                                    value: sendsayStore.input,
                                    options: {
                                        mode: 'javascript',
                                        theme: 'material',
                                        lineWrapping: true
                                    },
                                    onBeforeChange: (editor, data, value) => {
                                        sendsayStore.change(value);
                                    },
                                    onChange: (editor, data, value) => {
                                    }
                                }}/>
                        <Editor title="Ответ:"
                                config={{
                                    value: sendsayStore.output,
                                    options: {
                                        mode: 'javascript',
                                        theme: 'material',
                                        lineWrapping: true
                                    },
                                    onBeforeChange: (editor, data, value) => {
                                    },
                                    onChange: (editor, data, value) => {
                                    }
                                }}/>
                    </div>
                    <Footer/>
                </>}
        </div>
    );
}

export default inject("sendsayStore")(observer(App));
