import { Layout, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './index.css'
import {withRouter} from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('ホーム', '/home', <MailOutlined />),
    getItem('ユーザーマネジメント', '/user-manage', <AppstoreOutlined />, [
        getItem('ユーザーリスト', '/user-manage/list'),
    ]),
    {
        type: 'divider',
    },
    getItem('権限管理', '/right-manage', <SettingOutlined />, [
        getItem('ロールリスト', '/right-manage/role/list'),
        getItem('権限リスト', '/right-manage/right/list'),
    ]),
    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

function SideMenu(props){

    const {Sider} = Layout;
    const onClick = (e) => {
        console.log(props, e);
        props.history.push(e.key);
    };

    return(
        <Sider trigger={null} collapsible collapsed={false} >
            <div className="logo">グローバルニュース発信管理システム</div>
            <Menu
                theme='dark'
                onClick={onClick}
                style={{
                    width: 200,
                }}
                defaultSelectedKeys={['/home']}
                defaultOpenKeys={['/home']}
                mode="inline"
                items={items}
                //キミの
                //スべきであることを
                //しなくても
                //だいじなことをやると
                //いい

                //すればよいという
                //きもちを捨てても
                //だいじょうぶな
                //ような気がする
            />
        </Sider>
    )
}
export default withRouter(SideMenu);