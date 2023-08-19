import React from 'react'
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./home/Home";
import UserList from "./user-manage/UserList";
import RoleList from "./right-manage/RoleList";
import RightList from "./right-manage/RightList";
import NoPermission from "./nopermission/NoPermisson";


export default function NewsSandBox() {
    return (
        <div>
            <SideMenu></SideMenu>
            <TopHeader></TopHeader>
            <Switch>
                <Route path='/home' component={Home}></Route>
                <Route path='/user-manager/list' component={UserList}></Route>
                <Route path='/right-manager/role/list' component={RoleList}></Route>
                <Route path='/right-manager/right/list' component={RightList}></Route>
                <Redirect from='/' to='/home' exact></Redirect>
                <Route path="*" component={NoPermission}></Route>
            </Switch>
        </div>
    )
}
