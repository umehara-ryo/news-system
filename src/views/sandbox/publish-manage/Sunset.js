import React, {useEffect, useState} from 'react'
import axios from "axios";
import NewsPublish from "../../../components/publish-manage/NewsPublish";

export default function Sunset() {

    const [dataSource, setdataSource] = useState([])

    const{username} = JSON.parse(localStorage.getItem('token'))
    useEffect(()=>{
        axios(`/news/?author=${username}&publishState=3&_expand=category`)
            .then(res=>{
                console.log(res.data)
                setdataSource(res.data);
            })
    },[username])

    return (
        <div>
            <NewsPublish dataSource={dataSource}> </NewsPublish>
        </div>
    )
}