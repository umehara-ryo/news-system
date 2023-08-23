import {Redirect, Route, Switch} from "react-router-dom";
import Home from "../../views/sandbox/home/Home";
import UserList from "../../views/sandbox/user-manage/UserList";
import RoleList from "../../views/sandbox/right-manage/RoleList";
import RightList from "../../views/sandbox/right-manage/RightList";
import NoPermission from "../../views/sandbox/nopermission/NoPermisson";
import NewsAdd from "../../views/sandbox/news-manage/NewsAdd";
import NewsDraft from "../../views/sandbox/news-manage/NewsDraft";
import NewsCategory from "../../views/sandbox/news-manage/NewsCategory";
import Audit from "../../views/sandbox/audit-manage/Audit";
import AuditList from "../../views/sandbox/audit-manage/AuditList";
import Unpublished from "../../views/sandbox/publish-manage/Unpublished";
import Published from "../../views/sandbox/publish-manage/Published";
import Sunset from "../../views/sandbox/publish-manage/Sunset";

export default function NewsRouter(){

    const localRouterListMap = {
        "/home":Home,
        "/user-manage/list":UserList,
        "/right-manage/role/list":RoleList,
        "/right-manage/right/list":RightList,
        "/news-manage/add":NewsAdd,
        "/news-manage/draft":NewsDraft,
        "/news-manage/category":NewsCategory,
        "/audit-manage/audit":Audit,
        "/audit-manage/list":AuditList,
        "/publish-manage/unpublished":Unpublished,
        "/publish-manage/published":Published,
        "/publish-manage/sunset":Sunset
    }

    return(


            <Switch>
                <Route path='/home' component={Home}></Route>
                <Route path='/user-manage/list' component={UserList}></Route>
                <Route path='/right-manage/role/list' component={RoleList}></Route>
                <Route path='/right-manage/right/list' component={RightList}></Route>
                <Redirect from='/' to='/home' exact></Redirect>
                <Route path="*" component={NoPermission}></Route>
            </Switch>


    )
}