import {Form, Modal, Select} from "antd";
import Input from "antd/es/input/Input";
import {Option} from "antd/es/mentions";
import React from "react";

export default function UserForm(props){

    const {regionList,roleList} = props;

    return(
            <Form
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
                    rules={[
                        {
                            required: true,
                            message: 'パスワードをご入力ください!',
                        },
                    ]}
                >
                    <Select>
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
                            message: 'パスワードをご入力ください!',
                        },
                    ]}
                >
                    <Select>
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
}