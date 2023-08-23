import React,{useState} from 'react'
import {Input} from "antd";
const { TextArea } = Input;

export default function NewsEditor(props) {

    const [text, setText] = useState('');
    const onBlur = (e) => {
        console.log('Change:', e.target.value);
        props.getText(e.target.value);
    };

    return(
        <div>
            <TextArea
                showCount
                maxLength={10000}
                style={{
                    height: 120,
                    marginBottom: 24,
                }}
                onBlur={onBlur}
                placeholder="can resize"
            />
        </div>


    )
}
