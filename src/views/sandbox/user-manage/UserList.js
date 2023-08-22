import React, {useEffect, useRef, useState} from 'react'
import {Button, Table, Modal, Tag, Popover, Switch, Form, Select} from "antd";
import axios from "axios";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import UserForm from "../../../components/user-manage/UserForm";


export default function UserList() {

    const [dataSource, setDataSource] = useState([])
    const [open, setOpen] = useState(false)
    const [roleList, setRoleList] = useState([])
    const [regionList, setRegionList] = useState([])
    const addForm = useRef(null);


    useEffect(() => {
        axios.get('http://localhost:5000/users?_expand=role').then(res => {
            setDataSource(res.data)
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
                return <Switch checked={item.roleState} disabled={item.default}
                onChange={()=>handleChange(item)}
                ></Switch>
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

    //状態変更
    const handleChange = (item) => {
      console.log(item);
      item.roleState = !item.roleState;
      setDataSource([...dataSource]);
      axios.patch(`http://localhost:5000/users/${item.id}`,{
          roleState: item.roleState
      })
    }


    const {confirm} = Modal;
    //データ削除
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
        setDataSource(dataSource.filter(data=>data.id!==item.id));
        axios.delete(`http://localhost:5000/users/${item.id}`);

    }
    const addFormOk = ()=>
    {
        console.log('ok');
        addForm.current.validateFields().then(value=>{
            console.log(value);

            axios.post(`http://localhost:5000/users`,{
                ...value,
                'roleState':true,
                'default':false,
            }).then(()=> axios.get('http://localhost:5000/users?_expand=role').then(res => {
                setDataSource(res.data)
            }));//axios.postのthenメソッドにaxios.getを重ねる


            //setDataSourceはデータベースに挿入し、IDを返す後の仕事
            setOpen(false);
        }).catch(err=>{
            console.log(err);
        });
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
                onOk={() => addFormOk()}
            >
                <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
            </Modal>


            <Table dataSource={dataSource} columns={columns} rowKey={item => item.id}
                   pagination={{
                       pageSize: 5
                   }}
            />;
        </div>
    )
}
