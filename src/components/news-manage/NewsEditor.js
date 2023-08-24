import React, {useEffect, useRef, useState} from 'react'
import {Input} from "antd";
const { TextArea } = Input;

export default function NewsEditor(props) {

    const textUpdate = useRef('');

    useEffect(()=>{
        console.log(props.content)
        console.log(textUpdate.current)
    })


    const onBlur = (e) => {
        console.log('Change:', e.target.value);
        props.getContent(e.target.value);
        //console.log(textUpdate.current)
    };

    return(
        <div>
            {
                props.content && <TextArea
                    defaultValue={props.content}
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
