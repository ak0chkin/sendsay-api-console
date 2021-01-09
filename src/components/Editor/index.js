import React from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
import 'codemirror/mode/javascript/javascript';
import './index.css'

const Editor = ({title, config}) => {
    return (
        <div className="editor">
            <div className="editor__title">{title}</div>
            <CodeMirror
                className="editor-contentwrapper"
                value={config.value}
                options={config.options}
                onBeforeChange={config.onBeforeChange}
                onChange={config.onChange}
            />
        </div>
    )
}

export default Editor;
