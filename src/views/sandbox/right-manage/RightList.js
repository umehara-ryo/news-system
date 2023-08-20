import React, {useEffect, useState} from 'react'
import {Button, Table,Modal, Tag} from "antd";
import axios from "axios";
import { DeleteOutlined,EditOutlined} from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';


export default function RightList() {

    const [dataSource,setDataSourse] = useState( [])
    useEffect(()=>{
            axios.get('http://localhost:5000/rights?_embed=children').then(res=>{

                res.data.forEach(i=>{
                    if(i.children.length===0){
                        i.children = null;
                    }
                })
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
            title: '権限名',
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
            render: (item)=>{
                return　<div>
                    <Button type="primary" shape="circle" icon={<EditOutlined/>}
                    ></Button>
                    <Button danger shape="circle" icon={<DeleteOutlined/>}  onClick={()=>confirmDelete(item)}></Button>
                </div>
            }
        },
    ];

    const {confirm} = Modal;
    const confirmDelete = (item)=>{
       confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '削除しますか',
            okText: '削除',
            cancelText: 'キャンセル',
           onOk() {
               console.log('OK');
               deleteMethod(item);
           },
           onCancel() {
               console.log('Cancel');
           }
        });
    }
    const deleteMethod = (item)=>{
        console.log(item);
        setDataSourse(dataSource.filter(data=>data.id !== item.id));
        axios.delete(`http://localhost:5000/rights/${item.id}`);

    }

    return (
        <div>

            <Table dataSource={dataSource} columns={columns}　
            pagination={{
                pageSize:5
            }}
            />;
        </div>
    )
}
