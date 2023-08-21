import React, {useEffect, useState} from 'react'
import {Button, Modal, Popover, Switch, Table} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from "@ant-design/icons";

export default function RoleList() {

   const [dataSource,setDataSource] = useState([]);
   const columns = [
       {
           title: 'ID',
           dataIndex: 'id',
           render: (id) => {
               return <b>{id}</b>
           }
       },
       {
           title: 'ロール名',
           dataIndex: 'roleName',
           render: (roleName)=>{
               return<i>{roleName}</i>
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

    useEffect(()=>{
        axios.get('http://localhost:5000/roles').then(res=>{
            console.log(res.data);
            setDataSource(res.data);
        })

    },[]);


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
            setDataSource(dataSource.filter(data => data.id !== item.id));
            axios.delete(`http://localhost:5000/roles/${item.id}`);

    }

    return (
        <div>
               <Table dataSource={dataSource} columns={columns} rowKey={(item)=>item.id}></Table>
        </div>
    )
}
