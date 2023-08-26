import React, {useEffect, useRef, useState} from 'react'
import {Input} from "antd";
const { TextArea } = Input;

export default function NewsEditor(props) {

    const textUpdate = useRef('');
    const [currentContent, setCurrentContent] = useState(0);

    useEffect(()=>{
        console.log(props.content)
        console.log(textUpdate.current)
        setCurrentContent(props.content);
    })


    const onBlur = (e) => {
        console.log('Change:', e.target.value);
        props.getContent(e.target.value);
        //console.log(textUpdate.current)
    };

    return(
        <div>
            {
                <TextArea
                    defaultValue={currentContent?currentContent:''}
                    ref={textUpdate}
                    showCount
                    maxLength={10000}
                    style={{
                        height: 120,
                        marginBottom: 24,
                    }}
                    onBlur={onBlur}
                    placeholder="can resize"
                />
            }
        </div>


    )
}
