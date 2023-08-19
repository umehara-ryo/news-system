import {HashRouter, Route} from "react-router-dom";
import Login from "../views/login/Login";
import NewsSandBox from "../views/sandbox/NewsSandBox";

export default function IndexRouter(){
    return(

        <HashRouter>
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={NewsSandBox}></Route>
        </HashRouter>
    )
}