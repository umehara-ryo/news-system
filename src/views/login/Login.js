import React from 'react'
import Input from "antd/es/input/Input";
import {Button, Form, message} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.css';
import axios from "axios";

export default function Login(props) {

    const onFinish = (values) => {
        console.log(values);
        axios.get(`http://localhost:5000/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{

            if(res.data.length===1){
                localStorage.setItem('token',JSON.stringify(res.data[0]));
                //console.log(res.data[0]);
                props.history.push('/');
            }else {
                message.error("ユーザー名とパスワードを正しく入力してください！")
            }
        })

    }

    return (
        <div style={{
            //background:'#FDADCA',
            background:'rgb(35,39,65)',
            height:'100%'
        }}>

           <div className='formContainer'>
               <div　className='title'>グローバルニュースシステム</div>
               <Form
                   name="normal_login"
                   className="login-form"
                   onFinish={onFinish}
               >
                   <Form.Item
                       name="username"
                       rules={[
                           {
                               required: true,
                               message: 'ユーザー名をご入力ください!',
                           },
                       ]}
                   >
                       <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                   </Form.Item>
                   <Form.Item
                       name="password"
                       rules={[
                           {
                               required: true,
                               message: 'パスワードをご入力ください!',
                           },
                       ]}
                   >
                       <Input
                           prefix={<LockOutlined className="site-form-item-icon" />}
                           type="password"
                           placeholder="Password"
                       />
                   </Form.Item>
                   <Form.Item>
                       <Button type="primary" htmlType="submit" className="login-form-button">
                           Log in
                       </Button>
                   </Form.Item>
               </Form>
           </div>
        </div>
    )
}
