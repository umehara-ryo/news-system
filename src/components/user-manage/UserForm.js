import {Form, Modal, Select} from "antd";
import Input from "antd/es/input/Input";
import {Option} from "antd/es/mentions";
import React, {forwardRef, useEffect, useState} from "react";

const UserForm = forwardRef((props,ref) =>{

    const {regionList,roleList, isUpdateDisabled} = props;

    const [isDisabled,setIsDisabled] = useState(false);

    useEffect(()=>{
        setIsDisabled(isUpdateDisabled);
    },[isUpdateDisabled])

    return(
            <Form ref={ref}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="ユーザー名"
                    rules={[
                        {
                            required: true,
                            message: 'ユーザー名をご入力ください!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="パスワード"
                    rules={[
                        {
                            required: true,
                            message: 'パスワードをご入力ください!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="region"
                    label="地域"
                    rules={isDisabled ? [] : [
                        {
                            required: true,
                            message: '地域をお選びください!',
                        },
                    ]}
                >
                    <Select disabled={isDisabled}>
                        {
                            regionList.map((item) => {
                                    return <Option value={item.value} key={item.id}>{item.title}</Option>
                                }
                            )

                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="ロール"
                    rules={[
                        {
                            required: true,
                            message: 'ロールをお選びください!',
                        },
                    ]}
                >
                    <Select onChange={(value)=>{

                        if(value === 1){
                            setIsDisabled(true);
                            ref.current.setFieldsValue({
                                region:""
                            })
                        }else {
                            setIsDisabled(false);
                            console.log(isDisabled);
                        }

                    }}>
                        {
                            roleList.map((item) => {
                                    return <Option value={item.id} key={item.id}>{item.roleName}</Option>
                                }
                            )
                        }
                    </Select>
                </Form.Item>
            </Form>
    )
})
export default UserForm;