import {useEffect, useState} from "react";
import axios from "axios";
import {Header} from "antd/es/layout/layout";
import {Card, Col, List, Row} from "antd";
import _ from 'lodash';
export default function News(){

const [list,setList] = useState([]);
    useEffect(()=>{
        axios.get('/news?publishState=2&_expand=category').then(res=>{
            setList(Object.entries(_.groupBy(res.data,item=>item.category.title)));
            //map To Array
        })
    },[])

    return(
        <div style={{
            width:'100%',
            margin:'0 auto'
        }}>
           <Header>
               <b style={{
                   color:'white',
                   fontSize:'20px'
               }}>トップニュース</b>
           </Header>
            <Row gutter={[16,16]}>
                {
                    list.map((item)=> {
                        return <Col span={8} key={item[0]}>
                            <Card title={item[0]} bordered={false} hoverable={true}>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={item[1]}
                                    pagination={{
                                        pageSize: 2
                                    }}
                                    renderItem={(data) => <List.Item><a href={`#/detail/${data.id}`}>{data.title}</a></List.Item>}
                                />
                            </Card>
                        </Col>
                    })
                }

            </Row>
        </div>
    )
}