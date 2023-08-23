import React, {useEffect} from 'react'
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
import './NewsSandBox.css';
import NewsRouter from "../../components/sandbox/NewsRouter";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

export default function NewsSandBox() {

    NProgress.start();
    useEffect(()=>{
        NProgress.done();
    })

    const {
        token: {colorBgContainer},
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
                        overflow: 'auto'
                    }}
                >
                    <NewsRouter></NewsRouter>
                </Content>

            </Layout>
        </Layout>
    )
}
