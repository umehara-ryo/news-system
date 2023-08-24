import {Button, Form, Input, message, Select, Steps, notification} from 'antd';
import {useEffect, useRef, useState,} from "react";
import style from './News.module.css'
import axios from "axios";
import NewsEditor from "../../../components/news-manage/NewsEditor";
import {LeftOutlined} from "@ant-design/icons";

const {Option} = Select;

export default function NewsUpdate(props) {

    const NewForm = useRef(null);

    const [current, setCurrent] = useState(0);
    const [categoryList, setCategoryList] = useState([]);

    const [formInfo, setFormInfo] = useState({});
    const [content, setContent] = useState('');


    useEffect(() => {
        axios.get(`/categories`).then(res => {
            setCategoryList(res.data)
        })
    }, [])

    useEffect(() => {
        console.log(props.match.params.id);
        axios.get(`/news/${props.match.params.id}?_expand=category&_expand=role`)
            .then(res => {

                let {title,categoryId} = res.data;
                //フォームに値を代入
                NewForm.current.setFieldsValue(
                    {
                        title,
                        categoryId
                    }
                )

                //テキスト欄に値を代入
                setContent(res.data.content)
            })

    }, [props.match.params])

    const handleNext = () => {
        if (current === 0) {
            NewForm.current.validateFields().then(res => {
                console.log(res);
                setFormInfo(res);
                setCurrent(current + 1);
            }).catch(err => console.log(err))
        } else {
            console.log(formInfo, content);
            if (content === '') {
                message.error('ニュースの内容は空白にできません!')
            } else {
                setCurrent(current + 1);
            }
        }

    }
    const handlePrevious = () => {
        setCurrent(current - 1);
    }

    const handleUpdate = (auditState) => {
        axios.patch(`/news`, {
            ...formInfo,
            'content': content,
            "auditState": auditState,
        }).then(res => {
            props.history.push(auditState === 0 ? '/news-manage/draft' : 'audit-manage/list');
        })

        notification.info({
            message: `お知らせ`,
            description:
                `${auditState === 0 ? '下書き箱' : '審査リスト'}でニュースをご覧いただけます`,
            placement: "bottomRight",
        });
    }


    return (
        <div>
            <a href='#/news-manage/draft'>
                <LeftOutlined/>
                戻る
            </a>
            <div style={{
                textAlign: 'left',
                fontSize: '25px',
                marginBottom: '20px'
            }}><b>ニュースを更新</b></div>
            <Steps
                current={current}
                items={[
                    {
                        title: '基本情報',
                        description: 'タイトルや分類',
                    },
                    {
                        title: 'ニュース内容',
                        description: 'テーマ内容',
                    },
                    {
                        title: 'ニュースの提出',
                        description: '下書き保存または審査申請',
                    },
                ]}
            />

            <div className={current === 0 ? '' : style.hidden}>
                <Form
                name="basic"
                ref={NewForm}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                    remember: true,
                }}
                //onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="タイトル"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'タイトルをご入力ください!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="ニュース分類"
                    name="categoryId"
                    rules={[
                        {
                            required: true,
                            message: 'カテゴリーをお選びください!',
                        },
                    ]}
                >
                    <Select>
                        {
                            categoryList.map(item => {
                                return <Option key={item.id} value={item.id}>{item.title}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
            </Form></div>
            <div className={current === 1 ? '' : style.hidden}>

                <NewsEditor
                    content={content}
                    getContent={(value) => {
                    setContent(value);
                    console.log(value)
                }}> </NewsEditor>

            </div>

            <div className={current === 2 ? '' : style.hidden}></div>


            <div>

                {
                    current > 0 && <Button onClick={handlePrevious}>戻る</Button>
                }

                {
                    current < 2 && <Button type='primary' onClick={handleNext}>次へ</Button>
                }


                {
                    current === 2 && <span>
                        <Button type='primary' onClick={() => handleUpdate(0)}>下書き保存</Button>
                        <Button danger onClick={() => handleUpdate(1)}>審査申請</Button>
                    </span>
                }

            </div>


        </div>

    )

}