import React, {useEffect, useState} from 'react';
import {Button, Descriptions, Drawer, theme} from 'antd';
import {LeftOutlined, HeartTwoTone} from '@ant-design/icons';
import axios from "axios";
import moment from "moment";

export default function Detail(props) {

    const [newsInfo, setNewsInfo] = useState({});

    useEffect(() => {
        console.log(props.match.params.id);
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
            .then(res => {
                setNewsInfo({
                    ...res.data,
                    view: res.data.view + 1
                })
                return res.data
            }).then(resData => axios.patch(`/news/${props.match.params.id}`, {
            view: resData.view + 1
        }))

    }, [props.match.params])

    const auditState = ['未審査', '審査中', '承認済み', '未承認']
    const publishState = ['未公開', '公開待ち', '公開中', '非公開']
    const colors = ['black', 'orange', 'green', 'red']

    const items = [
        {
            key: '1',
            label: '作成者',
            children: newsInfo.author,
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
        //height: 400,
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

    const handleStar = () => {

        setTimeout(()=>{
            setNewsInfo({
                ...newsInfo,
                star: newsInfo.star + 1
            });
            axios.patch(`/news/${props.match.params.id}`, {
                star: newsInfo.star + 1
            })
        })


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
                        <Descriptions title={<div>
                            {newsInfo.title}
                            <HeartTwoTone  onClick={handleStar} twoToneColor="#eb2f96"/>
                        </div>} items={items}></Descriptions>

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