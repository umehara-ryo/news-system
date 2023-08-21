import React, {useEffect, useState} from 'react'
import {Button, Table, Modal, Tag, Popover, Switch, Form, Select} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import UserForm from "../../../components/user-manage/UserForm";


export default function UserList() {

    const [dataSource, setDataSourse] = useState([])
    const [open, setOpen] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5000/users?_expand=role').then(res => {
            setDataSourse(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/roles').then(res => {
            setRoleList(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5000/regions').then(res => {
            setRegionList(res.data)
        })
    }, [])


    const columns = [
        {
            title: '地域',
            dataIndex: 'region',
            render: (region) => {
                return <b>{region === "" ? 'グローバル' : region}</b>
            }
        },
        {
            title: 'ロール名',
            dataIndex: 'role',
            render: (role) => {
                return <i>{role?.roleName}</i>
            }
        },
        {
            title: 'ユーザー名',
            dataIndex: 'username',
        },
        {
            title: 'ユーザー状態',
            dataIndex: 'roleState',
            render: (roleState, item) => {
                return <Switch checked={{roleState}} disabled={item.default}></Switch>
            }

        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button type="primary" shape="circle" icon={<EditOutlined/>} disabled={item.default}
                    ></Button>
                    <Button danger shape="circle" icon={<DeleteOutlined/>} onClick={() => confirmDelete(item)}
                            disabled={item.default}></Button>
                </div>
            }
        },
    ];


    const {confirm} = Modal;
    const confirmDelete = (item) => {
        confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined/>,
            content: '削除しますか',
            okText: '削除',
            cancelText: 'キャンセル',
            onOk() {
                console.log('OK');
                deleteMethod(item);
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }
    const deleteMethod = (item) => {

    }

    return (
        <div>
            <Button type='primary' onClick={() => setOpen(true)}>新規追加</Button>

            <Modal
                open={open}
                title="新規追加"
                okText="追加"
                cancelText="キャンセル"
                onCancel={() => setOpen(false)}
                onOk={() => {
                    console.log('ok')
                }}
            >
                <UserForm regionList={regionList} roleList={roleList}></UserForm>
            </Modal>


            <Table dataSource={dataSource} columns={columns} rowKey={item => item.id}
                   pagination={{
                       pageSize: 5
                   }}
            />;
        </div>
    )
}
