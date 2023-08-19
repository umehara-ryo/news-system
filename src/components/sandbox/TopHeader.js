import {Button, Layout, Menu, theme} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import {useState} from "react";



export default function TopHeader(){

    const {Header} = Layout;

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
            </Header>
        </div>
    )
}