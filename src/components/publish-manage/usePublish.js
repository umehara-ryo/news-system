import axios from "axios";
import {useEffect, useState} from "react";
import {notification} from "antd";

function usePublish(type,props) {


    const [dataSource, setdataSource] = useState([])

    const {username} = JSON.parse(localStorage.getItem('token'))
    useEffect(() => {
        axios(`/news/?author=${username}&publishState=${type}&_expand=category`)
            .then(res => {
                console.log(res.data)
                setdataSource(res.data);
            })
    }, [username, type])

    const handlePublish = (id) => {
        console.log(id);
        setdataSource(dataSource.filter(data => data.id != id));

        axios.patch(`/news/${id}`, {
            publishState: 2,
            publishTime: Date.now()
        }).then(res => {
            notification.info({
                message: `お知らせ`,
                description:
                    `「公開管理/公開済み」でニュースをご覧いただけます`,
                placement: "bottomRight",
            });

        })
    }
    const handleSunset = (id) => {
        console.log(id);
        setdataSource(dataSource.filter(data => data.id != id));

        axios.patch(`/news/${id}`, {
            publishState: 3,
        }).then(res => {
           // props.history.push('/publish-manage/published');
            notification.info({
                message: `お知らせ`,
                description:
                    `「公開管理/利用不可」でニュースをご覧いただけます`,
                placement: "bottomRight",
            });
        })
    }
    const handleDelete = (id) => {
        console.log(id);
        setdataSource(dataSource.filter(data => data.id != id));
        axios.delete(`/news/${id}`);
        notification.info({
            message: `お知らせ`,
            description:
                `ニュースを削除しました`,
            placement: "bottomRight",
        });

    }

    return {

        dataSource,
        handlePublish,
        handleSunset,
        handleDelete

    }
}

export default usePublish;