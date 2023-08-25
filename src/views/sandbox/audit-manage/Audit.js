import React, {useEffect, useState} from 'react'
import axios from "axios";
import {Button, notification, Table, Tag} from "antd";

export default function Audit() {

    const [dataSource, setDataSource] = useState([])
    const {roleId, region} = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        axios.get(`/news?auditState=1&_expand=category`).then(res => {
            setDataSource(
                res.data.filter(item => {
                    return roleId === 2 && region === item.region || roleId === 1
                }))
        })

    }, [roleId, region])

    const auditStates = ['未審査', '審査中', '承認済み', '未承認']
    const colors = ['black', 'orange', 'green', 'red']

    const columns = [

        {
            title: 'ニュースタイトル',
            dataIndex: 'title',
            render: (title, item) => {
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
            render: (author) => {
                return <Tag color='lightpink'>{author}</Tag>

            }
        },
        {
            title: 'ニュース分類',
            dataIndex: 'category',
            render: (category) => {
                return <i>{category.title}</i>
            }
        },
        {
            title: '審査状態',
            dataIndex: 'auditState',
            render: (auditState) => {
                return <Tag color={colors[auditState]}>{auditStates[auditState]}</Tag>
            }
        },

        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type='primary' shape='circle' onClick={() => handlePass(item)}>許可</Button>
                    <Button danger shape='circle' onClick={() => handleReject(item)}>拒絶</Button>
                </div>
            }
        },
    ];


    const handlePass = (item) => {
        setDataSource(dataSource.filter(data => data.id != item.id));
        axios.patch(`/news/${item.id}`, {
            auditState: 2,
            publishState: 1,
        }).then(res => {
            notification.info({
                message: `お知らせ`,
                description:
                    `許可いたしました`,
                placement: "bottomRight",
            });
        })
    }

    const handleReject = (item) => {
        setDataSource(dataSource.filter(data => data.id != item.id));
        axios.patch(`/news/${item.id}`, {
            auditState: 3,
        }).then(res => {
            notification.info({
                message: `お知らせ`,
                description:
                    `拒絶いたしました`,
                placement: "bottomRight",
            });
        })
    }


    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id}
                   pagination={{
                       pageSize: 5
                   }}
            />
        </div>
    )
}
