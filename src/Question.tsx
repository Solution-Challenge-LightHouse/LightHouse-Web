import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface QuestInfo {
    id: string;
    title: string;
    content: string;
    multipleChoice: string;
    imgPath: string;
    category: string;
}

const Question: React.FC = () => {
    const [quest, setQuest] = useState<QuestInfo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestData = async () => {
            try {
                // localstorage에 저장했던 토큰 가져오기
                const token = localStorage.getItem('token');

                // 헤더에 토큰 추가
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };

                // 서버에 사용자 정보 달라고 get 요청 보내기
                const response = await axios.get(`https://lighthouse1.site/examples/all`, config);
                setQuest(response.data);  // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것

            } catch (error) { // get 실패시 console 메시지 출력
                console.error('Error fetching data:', error);
                // navigate('/Login')
            }
        };

        fetchQuestData();
    }, [navigate]);  // id 추가

    if (!quest) {  // quest가 null인 경우 로딩 표시
        return <div>Loading...</div>;
    }

    return (
        <div>
            {quest.map((data: QuestInfo) => (
                <Link to={`/get/${data.id}/${data.category}`}>
                    <p>{data.id}</p>
                    <p>{data.title}</p>
                    <p>{data.content}</p>
                    <p>{data.multipleChoice}</p>
                    <p>{data.imgPath}</p>
                    <p>{data.category}</p>
                </Link>
            ))}
        </div>
    )
}

export default Question;
