import {Button, Layout, Menu,Space, theme} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined
} from '@ant-design/icons';
import {useState} from "react";
import Dropdown from "antd/es/dropdown/dropdown";
import type { MenuProps } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import {withRouter} from 'react-router-dom'

function TopHeader(props){

    const [collapsed, setCollapsed] = useState(false);

    const {role:{roleName},username} = JSON.parse(localStorage.getItem('token'));


    const {Header} = Layout;
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const items = [
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    {roleName}
                </a>
            ),
            icon: <SmileOutlined />
        },
        {
            key: '4',
            danger: true,
            label:  (
                <a onClick={()=>{
                    localStorage.removeItem('token');
                    props.history.replace('/login');
                }}>
                    戻る
                </a>
            ),
        },
    ];

    return(
        <div>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                }}
            >
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />

                <div style={{float:"right"}}>
                    <span>{username}、ようこそ</span>

                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                <Avatar size={30} icon={<UserOutlined />} />
                                <DownOutlined></DownOutlined>
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </Header>

        </div>
    )
}
export default withRouter(TopHeader);