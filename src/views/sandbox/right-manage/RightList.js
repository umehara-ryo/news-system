import React, {useEffect, useState} from 'react'
import {Table} from "antd";
import axios from "axios";

export default function RightList() {

    const [dataSource,setDataSourse] = useState( [])
    useEffect(()=>{
            axios.get('http://localhost:5000/rights').then(res=>{
                setDataSourse(res.data)
            })
    },[])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '権限名前',
            dataIndex: 'title',
        },
        {
            title: '権限パス',
            dataIndex: 'key',
        },
    ];

    return (
        <div>

            <Table dataSource={dataSource} columns={columns}/>;
        </div>
    )
}
