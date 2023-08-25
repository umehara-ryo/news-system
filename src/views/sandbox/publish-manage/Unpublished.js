import React  from 'react'
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";
import {Button} from "antd";

export default function Unpublished() {

    const {dataSource,handlePublish} = usePublish(1);

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={(id)=><Button onClick={()=>handlePublish(id)}　type='primary'>公開</Button>}
                         > </NewsPublish>
        </div>
    )
}
