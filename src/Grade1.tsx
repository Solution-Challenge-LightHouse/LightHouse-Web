import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './BoardDetail.css';

interface BoardInfo {
    id: string;
    userName: string;
    userLevel: string;
    title: string;
    content: string;
    creatAt: string;
}

const Grade1: React.FC = () => {
    const [data, setData] = useState<BoardInfo | null>(null);
    const { grade } = useParams<{ grade: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`https://lighthouse1.site/examples/find?${grade}`, config);
                setData(response.data);

            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/Login');
            }
        };

        fetchData();
    }, [navigate, grade]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <table>
                <thead>
                    <tr className="boardTitle">
                        <th>No.</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>User</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={data.id} className="boardContent">
                        <td>{data.id}</td>
                        <td>{data.title}</td>
                        <td>{data.content}</td>
                        <td>Lv.{data.userLevel}&nbsp;{data.userName}</td>
                        <td>{data.creatAt}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default Grade1;
