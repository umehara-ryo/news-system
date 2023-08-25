import React, { useState, useEffect,useRef,useContext } from 'react'
import {Button, Table, Modal, Form, Input, Tag} from 'antd'
import axios from 'axios'
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
const { confirm } = Modal
export default function NewsCategory() {
    const [dataSource, setdataSource] = useState([])

    useEffect(() => {
        axios.get("/categories").then(res => {
            setdataSource(res.data)
        })
    }, [])

    const handleSave = (record)=>{
        // console.log(record)

        setdataSource(dataSource.map(item=>{
            if(item.id===record.id){
                return {
                    id:item.id,
                    title:record.title,
                    value:record.title
                }
            }
            return item
        }))

        axios.patch(`/categories/${record.id}`,{
            title:record.title,
            value:record.title
        })
    }

    const columns = [
        {
            title: 'ニュースタイトル',
            dataIndex: 'title',
            render:(title,item)=>{
                return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
            }
        },
        {
            title: '作者',
            dataIndex: 'author',
            render: (author)=>{
                return  <Tag color='lightpink'>{author}</Tag>

            }
        },
        {
            title: 'ニュース分類',
            dataIndex: 'category',
            render: (category)=>{
                return  <i>{category.title}</i>
            }
        },
        {
            title: '審査状態',
            dataIndex: 'auditState',
            render: (auditState)=>{
                return <Tag >auditState</Tag>
            }
        },

        {
            title: "操作",
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                </div>
            }
        }
    ];


    const confirmMethod = (item) => {
        confirm({
            title: '削除されますか?',
            icon: <ExclamationCircleOutlined />,
            // content: 'Some descriptions',
            onOk() {
                //   console.log('OK');
                deleteMethod(item)
            },
            onCancel() {
                //   console.log('Cancel');
            },
        });

    }
    //削除
    const deleteMethod = (item) => {
        // console.log(item)
        setdataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`/categories/${item.id}`)
    }

    const EditableContext = React.createContext(null);

    const EditableRow = ({ index, ...props }) => {
        const [form] = Form.useForm();
        return (
            <Form form={form} component={false}>
                <EditableContext.Provider value={form}>
                    <tr {...props} />
                </EditableContext.Provider>
            </Form>
        );
    };

    const EditableCell = ({
                              title,
                              editable,
                              children,
                              dataIndex,
                              record,
                              handleSave,
                              ...restProps
                          }) => {
        const [editing, setEditing] = useState(false);
        const inputRef = useRef(null);
        const form = useContext(EditableContext);
        useEffect(() => {
            if (editing) {
                inputRef.current.focus();
            }
        }, [editing]);

        const toggleEdit = () => {
            setEditing(!editing);
            form.setFieldsValue({
                [dataIndex]: record[dataIndex],
            });
        };

        const save = async () => {
            try {
                const values = await form.validateFields();
                toggleEdit();
                handleSave({ ...record, ...values });
            } catch (errInfo) {
                console.log('Save failed:', errInfo);
            }
        };

        let childNode = children;

        if (editable) {
            childNode = editing ? (
                <Form.Item
                    style={{
                        margin: 0,
                    }}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }

        return <td {...restProps}>{childNode}</td>;
    };


    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                   pagination={{
                       pageSize: 5
                   }}
                   rowKey={item => item.id}

                   components={{
                       body: {
                           row: EditableRow,
                           cell: EditableCell,
                       }
                   }}

            />
        </div>
    )
}
