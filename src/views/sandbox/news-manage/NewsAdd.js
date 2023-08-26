import {Button, Form, Input, message, Select, Steps,notification} from 'antd';
import {useEffect, useRef, useState, } from "react";
import style from './News.module.css'
import axios from "axios";
import NewsEditor from "../../../components/news-manage/NewsEditor";
const {Option} = Select;

export default function NewsAdd(props) {

    const NewForm = useRef(null);

    const [current, setCurrent] = useState(0);
    const [categoryList, setCategoryList] = useState([]);

    const [formInfo, setFormInfo] = useState({});
    const [content, setContent] = useState('');

    useEffect(()=>{
        axios.get(`/categories`).then(res=>{
            setCategoryList(res.data)
        })
    },[])

    const handleNext = () => {
        if(current === 0){
            NewForm.current.validateFields().then(res=>{
                console.log(res);
                setFormInfo(res);
                setCurrent(current + 1);
            }).catch(err=>console.log(err))
        }
        else {
            console.log(formInfo,content);
            if(content===''){
                message.error('ニュースの内容は空白にできません!')
            }else {
                setCurrent(current + 1);
            }
        }

    }
    const handlePrevious = () => {
        setCurrent(current - 1);
    }

    //localStorageからtokenを取り出す
    const user = JSON.parse(localStorage.getItem("token"));

    const handleSave = (auditState) => {
      axios.post(`/news`,{
          ...formInfo,
          'content':content,
          "region": user.region?user.region:'グローバル',
          "author": user.username,
          "roleId": user.roleId,
          "auditState": auditState,
          "publishState": 0,
          "createTime": Date.now(),
          "star": 0,
          "view": 0,
          "publishTime": 0
      }).then(res=>{
          props.history.push(auditState===0?'/news-manage/draft':'/audit-manage/list');
      })

        notification.info({
            message: `お知らせ`,
            description:
                `${auditState===0?'下書き箱':'審査リスト'}でニュースをご覧いただけます`,
            placement:"bottomRight",
        });
    }


    return (
        <div>
            <div style={{
                textAlign: 'left',
                fontSize: '25px',
                marginBottom: '20px'
            }}><b>ニュースを編纂</b></div>
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

                <NewsEditor getContent={(value)=>{
                    setContent(value);
                    console.log(value)
                }}></NewsEditor>
            </div>
            <div className={current===2?'':style.hidden}></div>


            <div>

                {
                    current > 0 && <Button onClick={handlePrevious}>戻る</Button>
                }

                {
                    current < 2 && <Button type='primary' onClick={handleNext}>次へ</Button>
                }


                {
                    current === 2 && <span>
                        <Button type='primary' onClick={()=>handleSave(0)}>下書き保存</Button>
                        <Button danger onClick={()=>handleSave(1)}>審査申請</Button>
                    </span>
                }

            </div>


        </div>

    )

}