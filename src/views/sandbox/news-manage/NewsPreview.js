import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Drawer, theme} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import axios from "axios";
import moment from "moment";

export default function NewsPreview(props) {

    const [newsInfo, setNewsInfo] = useState({});

    useEffect(() => {
        console.log(props.match.params.id);
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
            .then(res => {
                setNewsInfo(res.data);
            })

    }, [props.match.params])

    const auditState = ['未審査', '審査中', '承認済み', '未承認']
    const publishState = ['未公開', '公開待ち', '公開中', '非公開']
    const colors = ['black','orange','green','red']

    const items = [
        {
            key: '1',
            label: '作成者',
            children: newsInfo.author,
        },
        {
            key: '2',
            label: '作成時間',
            children: moment(newsInfo.createTime).format('YYYY-MM-DD HH:mm'),
        },
        {
            key: '3',
            label: '公開時間',
            children: newsInfo.publishTime ? moment(newsInfo.publishTime).format('YYYY-MM-DD HH:mm') : '-',
        },
        {
            key: '4',
            label: '地域',
            children: newsInfo.region,
        },
        {
            key: '5',
            label: '審査状態',
            children: <span style={{color: colors[newsInfo.auditState]}}>{auditState[newsInfo.auditState]}</span>,
        },
        {
            key: '6',
            label: '公開状態',
            children: <span style={{color: colors[newsInfo.publishState]}}>{publishState[newsInfo.publishState]}</span>,
        },
        {
            key: '7',
            label: 'アクセス数',
            children: newsInfo.view,
        },
        {
            key: '8',
            label: 'いいねの数',
            children: newsInfo.star,
        },
        {
            key: '9',
            label: 'コメント数',
            children: 0,
        },
    ];


    const {token} = theme.useToken();
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
    const handleBack = () => {
        window.history.back();

    }

    return (
        <div>
            {
                newsInfo && <div>
                    <a onClick={handleBack}>
                        <LeftOutlined/>
                        戻る
                    </a>
                    <div style={containerStyle}>
                        <Descriptions title={newsInfo.title} items={items}/>

                        <div style={{
                            padding: 30,
                            textAlign: 'left',
                        }}>{newsInfo.content}</div>


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
                            keyboard='true'
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
            }
        </div>
    )
}