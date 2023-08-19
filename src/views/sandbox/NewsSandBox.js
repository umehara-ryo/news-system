import React from 'react'
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import RoleList from "./right-manage/RoleList";
import RightList from "./right-manage/RightList";
import NoPermission from "./nopermission/NoPermisson";
import {Layout, theme} from "antd";
import {Content} from "antd/es/layout/layout";



export default function NewsSandBox() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <SideMenu></SideMenu>

            <Layout>
                <TopHeader></TopHeader>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/user-manager/list' component={UserList}></Route>
                        <Route path='/right-manager/role/list' component={RoleList}></Route>
                        <Route path='/right-manager/right/list' component={RightList}></Route>
                        <Redirect from='/' to='/home' exact></Redirect>
                        <Route path="*" component={NoPermission}></Route>
                    </Switch>

                </Content>

            </Layout>
        </Layout>
    )
}
