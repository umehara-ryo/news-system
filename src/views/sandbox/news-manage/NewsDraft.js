
    import React, {useEffect, useState} from 'react'
    import {Button, Table, Modal, Tag, Popover, Switch} from "antd";
    import axios from "axios";
    import { DeleteOutlined,EditOutlined,UploadOutlined} from '@ant-design/icons';
    import { ExclamationCircleOutlined } from '@ant-design/icons';


    export default function NewsDraft() {

        //localStorageからtokenを取り出す
        const user = JSON.parse(localStorage.getItem("token"));

        const [dataSource,setDataSourse] = useState( [])
        useEffect(()=>{
            //console.log(`/news/?author=${user.username}&auditState=0&_expand=category`)

            axios.get(`/news/?author=${user.username}&auditState=0&_expand=category`).then(res=>{
                setDataSourse(res.data)
            })
        },[user.username])



        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                render: (id)=>{
                    return<b>{id}</b>
                }
            },
            {
                title: 'ニュースタイトル',
                dataIndex: 'title',
                render:(title,item)=>{
                    return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
                }
            },
            {
                title: '作者',
                dataIndex: 'author',
                render: (author)=>{
                    return  <Tag color='lightpink'>{author}</Tag>

                }
            },
            {
                title: 'ニュース分類',
                dataIndex: 'category',
                render: (category)=>{
                    return  <i>{category.title}</i>
                }
            },

            {
                title: '操作',
                render: (item)=>{
                    return　<div>
                        <Button  shape="circle" icon={<EditOutlined/>}
                        ></Button>
                        <Button type="primary" shape="circle" icon={<UploadOutlined />}
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
           　　//1.ページ情報の同期
            setDataSourse(dataSource.filter(data=>data.id!==item.id));
            　　//2.データベース同期

                axios.delete(`/news/${item.id}`);
            }


        return (
            <div>

                <Table dataSource={dataSource} columns={columns} rowKey={(item)=>item.id}
                       pagination={{
                           pageSize:5
                       }}
                />;
            </div>
        )
    }
