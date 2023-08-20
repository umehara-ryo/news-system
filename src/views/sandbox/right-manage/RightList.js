import React, {useEffect, useState} from 'react'
import {Button, Table, Tag} from "antd";
import axios from "axios";
import { DeleteOutlined,EditOutlined} from '@ant-design/icons';

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
            render: (id)=>{
                return<b>{id}</b>
            }
        },
        {
            title: '権限名前',
            dataIndex: 'title',
            render: (title)=>{
                return <i>{title}</i>
            }
        },
        {
            title: '権限パス',
            dataIndex: 'key',
            render: (key)=>{
                return <Tag color='lightpink'>{key}</Tag>
            }
        },
        {
            title: '操作',
            render: ()=>{
                return　<div>
                    <Button type="primary" shape="circle" icon={<EditOutlined/>}></Button>
                    <Button danger shape="circle" icon={<DeleteOutlined/>}></Button>
                </div>
            }
        },
    ];

    return (
        <div>

            <Table dataSource={dataSource} columns={columns}/>;
        </div>
    )
}
