import {Button, Form, Input, Select, Steps} from 'antd';
import {useEffect, useRef, useState} from "react";
import style from './News.module.css'
import axios from "axios";
import NewsEditor from "../../../components/news-manage/NewsEditor";
const {Option} = Select;


export default function NewsAdd() {

    const NewForm = useRef(null);

    const [current, setCurrent] = useState(0);

    const [categoryList, setCategoryList] = useState([]);

    useEffect(()=>{
        axios.get(`/categories`).then(res=>{
            setCategoryList(res.data)
        })
    },[])

    const handleNext = () => {
        if(current === 0){
            NewForm.current.validateFields().then(res=>{
                setCurrent(current + 1);
            }).catch(err=>console.log(err))
        }
        else {
            return null
        }

    }
    const handlePrevious = () => {
        setCurrent(current - 1);
    }


    return (
        <div>
            <div style={{
                textAlign: 'left',
                fontSize: '25px',
                marginBottom: '20px'
            }}><b>ニュースを書く</b></div>
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

            <div className={current===0?'':style.hidden}> <Form
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
                    <Input />
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
                         categoryList.map(item=>{
                             return <Option key={item.id} value={item.id}>{item.title}</Option>
                         })
                     }
                 </Select>
                </Form.Item>
            </Form></div>
            <div className={current===1?'':style.hidden}>

                <NewsEditor getText={(value)=>{
                    console.log(value)

                }}> </NewsEditor>


            </div>
            <div className={current===2?'':style.hidden}>333</div>


            <div>

                {
                    current > 0 && <Button onClick={handlePrevious}>戻る</Button>
                }

                {
                    current < 2 && <Button type='primary' onClick={handleNext}>次へ</Button>
                }


                {
                    current === 2 && <span>
                        <Button type='primary'>下書き保存</Button>
                        <Button danger>審査申請</Button>
                    </span>
                }

            </div>


        </div>

    )

}