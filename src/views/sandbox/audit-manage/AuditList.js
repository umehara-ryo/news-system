import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Button,  notification, Table, Tag} from "antd";

export default function AuditList(props) {

    const {username} = JSON.parse(localStorage.getItem('token'))
    const [dataSource,setDataSourse] = useState( [])
    useEffect(()=>{
        axios.get(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`)
        //作者は自分で、下書き箱にない(!=0)、未公開(<=1)のニュース
            .then(res=>{
                console.log(res.data)
                setDataSourse(res.data);
            })
    },[username])


    const auditStates = ['未審査', '審査中', '承認済み', '未承認']
    const colors = ['black','orange','green','red']

    const columns = [

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
            title: '審査状態',
            dataIndex: 'auditState',
            render: (auditState)=>{
                return <Tag color={colors[auditState]}>{auditStates[auditState]}</Tag>
            }
        },

        {
            title: '操作',
            render: (item)=>{
                return　<div>
                    {
                        item.auditState===1 && <Button danger　onClick={()=>handleRevert(item)} >撤回</Button>
                    }

                    {
                        item.auditState===2 && <Button type='primary' onClick={()=>handlePublish(item.id)}>公開</Button>
                    }
                    {
                        item.auditState===3 &&<Button onClick={()=>handleUpdate(item.id)}>修正</Button>
                    }


                </div>
            }
        },
    ];

    const handleRevert = (item) => {

        //ページから削除
        setDataSourse(dataSource.filter(data=>data.id!=item.id));

        //データベースを更新
        axios.patch(`/news/${item.id}`,
            {
                auditState:0
            }).then(res=>{
            notification.info({
                message: `お知らせ`,
                description:
                    `下書き箱でニュースをご覧いただけます`,
                placement:"bottomRight",
            });
        })

    }
    const handleUpdate = (id) => {
        props.history.push(`/news-manage/update/${id}`)

    }
    const handlePublish = (id) => {
        axios.patch(`/news/${id}`,{
            publishState:2,
            publishTime:Date.now()
        }).then(res=>{
            props.history.push('/publish-manage/published');
            notification.info({
                message: `お知らせ`,
                description:
                    `「公開管理/公開済み」でニュースをご覧いただけます`,
                placement:"bottomRight",
            });
        })

    }

    const handleCheck = (id) => {
        axios.patch(`/news/${id}`,{
            auditState:1
        }).then(res=>{
            props.history.push('/audit-manage/list');
            notification.info({
                message: `お知らせ`,
                description:
                    `審査リストでニュースをご覧いただけます`,
                placement:"bottomRight",
            });
        })
    }




    return (
        <div>

            <Table dataSource={dataSource} columns={columns} rowKey={(item)=>item.id}
                   pagination={{
                       pageSize:5
                   }}
            />
        </div>
    )
}
