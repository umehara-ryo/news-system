import React, {useEffect, useState} from 'react'
import {Button, Table, Modal, Tag, Popover, Switch} from "antd";



export default function NewsPublish(props) {


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
            title: '操作',
            render: (item) => {
                return <div>
                   <Button>ボタン</Button>
                </div>
            }
        },
    ];


    return (
        <div>

            {
                props.dataSource && <Table dataSource={props.dataSource} columns={columns} rowKey={item=>item.id}
                                           pagination={{
                                               pageSize: 5
                                           }}
                />
            }

        </div>
    )
}
