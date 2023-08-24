import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Drawer, theme} from 'antd';
import { LeftOutlined} from '@ant-design/icons';
import axios from "axios";

export default function NewsPreview(props) {

    const [newsInfo,setNewsInfo] = useState({});

    useEffect(()=>{
        console.log(props.match.params.id);
        axios.get(`/news/${props.match.params.id}&_expand=category&_expand=role`)
            .then(res=>{
                setNewsInfo(res.data);

            })

    },[props.match.params])

    const items = [
        {
            key: '1',
            label: '作成者',
            children: 'Zhou Maomao',
        },
        {
            key: '2',
            label: '作成時間',
            children: '1810000000',
        },
        {
            key: '3',
            label: '公開時間',
            children: 'Hangzhou, Zhejiang',
        },
        {
            key: '4',
            label: '地域',
            children: 'empty',
        },
        {
            key: '5',
            label: '審査状態',
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        },
        {
            key: '6',
            label: '公開状態',
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        },
        {
            key: '7',
            label: 'アクセス数',
            children: 'empty',
        },
        {
            key: '8',
            label: 'いいねの数',
            children: 'empty',
        },
        {
            key: '9',
            label: 'コメント数',
            children: 'empty',
        },
    ];


    const { token } = theme.useToken();
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const containerStyle = {
        position: 'relative',
        height: 400,
        padding: 30,
        overflow: 'hidden',
        textAlign: 'center',
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    return (
        <div>
            <a href='#/news-manage/draft' >
                <LeftOutlined />
                戻る
            </a>
            <div style={containerStyle}>
                <Descriptions title="User Info" items={items} />
                <div
                    style={{
                        marginTop: 16,
                    }}
                >
                    <Button type="primary" onClick={showDrawer}>
                        Open
                    </Button>
                </div>
                <Drawer
                    title="お知らせ"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    open={open}
                    getContainer={false}
                >
                    <p>大好きだよ！！！<br/>
                    無理しないでね、もう十分頑張ったのよ<br/>
                        私はずっとみててるからね
                    </p>
                </Drawer>
            </div>
        </div>
    )
}