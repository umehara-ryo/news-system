import {Button, Steps} from 'antd';
import {useState} from "react";
import style from './News.module.css'

export default function NewsAdd() {

    const [current, setCurrent] = useState(2);

    const handleNext = () => {
        setCurrent(current + 1);
    }
    const handlePrevious = () => {
        setCurrent(current - 1);
    }


    return (
        <div>
            <div style={{
                textAlign: 'left',
                fontSize: '25px',
                marginBottom: '20px'
            }}><b>ニュースを書く</b></div>
            <Steps
                current={current}
                items={[
                    {
                        title: '基本情報',
                        description: 'タイトルや分類',
                    },
                    {
                        title: 'ニュース内容',
                        description: 'テーマ内容',
                    },
                    {
                        title: 'ニュースの提出',
                        description: '下書き保存または審査申請',
                    },
                ]}
            />
            <div className={current===0?'':style.hidden}>111</div>
            <div className={current===1?'':style.hidden}>222</div>
            <div className={current===2?'':style.hidden}>333</div>


            <div>

                {
                    current > 0 && <Button onClick={handlePrevious}>戻る</Button>
                }

                {
                    current < 2 && <Button type='primary' onClick={handleNext}>次へ</Button>
                }


                {
                    current === 2 && <span>
                        <Button type='primary'>下書き保存</Button>
                        <Button danger>審査申請</Button>
                    </span>
                }

            </div>


        </div>

    )

}