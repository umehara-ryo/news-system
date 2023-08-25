import React from 'react'
import NewsPublish from "../../../components/publish-manage/NewsPublish";
import usePublish from "../../../components/publish-manage/usePublish";
import {Button} from "antd";

export default function Sunset() {

    const {dataSource,handleDelete} = usePublish(3);

    return (
        <div>
            <NewsPublish dataSource={dataSource} button={id=><Button type='primary' onClick={()=>handleDelete(id)} danger>削除</Button>}
                         > </NewsPublish>
        </div>
    )
}