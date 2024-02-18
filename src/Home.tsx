import { Link, useNavigate } from "react-router-dom";
import './Home.css';
import React, { useEffect, useState } from "react";
import axios from "axios";

interface BoardInfo {
    id: string;
    userName: string;
    userLevel: string;
    title: string;
    content: string;
    creatAt: string;
}

const Home: React.FC = () => {
    const [data, setData] = useState<BoardInfo[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
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
                const response = await axios.get('https://lighthouse1.site/posts/find/list/all', config);

                setData(response.data);  // 요청 완료시 reponse변수에 서버에서 받은 사용자 정보가 저장될 것
            } catch (error) { // get 실패시 console 메시지 출력
                console.error('Error fetching data:', error);
                // navigate('/Home')
            }
        };

        fetchData();
    }, [navigate]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="home">
                <div className="leftNav">
                    <Link to='/Board' className="Nav" id="board1">전체 게시판</Link>
                    <hr />
                    <Link to='/Board' className="Nav" id="board2">1학년 게시판</Link><br />
                    <Link to='/Board' className="Nav">2학년 게시판</Link><br />
                    <Link to='/Board' className="Nav">3학년 게시판</Link>
                </div>
                <div className="middleList">
                    <h1>전체 게시판</h1>
                    <div>
                        <table className="boardList">
                            <thead>
                                <tr className="boardTitle">
                                    <th>No.</th>
                                    <th>Title</th>
                                    <th>User</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((data: BoardInfo) => (
                                    <tr key={data.id} className="boardContent">
                                        <td>{data.id}</td>
                                        <td>{data.title}</td>
                                        <td>Lv.{data.userLevel}&nbsp;{data.userName}</td>
                                        <td>{data.creatAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="rightNav">
                    <div id="grade">문제 바로가기</div>
                    <div>
                        <div>
                            <Link to='/grade1' className="question">
                                1학년 문제 &nbsp; {'>'}
                            </Link>
                            <div className='level'>
                                <Link to='/A1' className="a">수와 연산</Link>
                                <Link to='/' className="b">문자와 식</Link>
                                <Link to='/' className="c">함수</Link>
                                <Link to='/' className="d">기하</Link>
                                <Link to='/' className="e">확률과 통계</Link>
                            </div>
                        </div>
                        <div>
                            <Link to='/grade2' className="question">
                                2학년 문제 &nbsp; {'>'}
                            </Link>
                            <div className='level'>
                                <Link to='/A1' className="a">수와 연산</Link>
                                <Link to='/' className="b">문자와 식</Link>
                                <Link to='/' className="c">함수</Link>
                                <Link to='/' className="d">기하</Link>
                                <Link to='/' className="e">확률과 통계</Link>
                            </div>
                        </div>
                        <div>
                            <Link to='/grade3' className="question">
                                3학년 문제 &nbsp; {'>'}
                            </Link>
                            <div className='level'>
                                <Link to='/A1' className="a">수와 연산</Link>
                                <Link to='/' className="b">문자와 식</Link>
                                <Link to='/' className="c">함수</Link>
                                <Link to='/' className="d">기하</Link>
                                <Link to='/' className="e">확률과 통계</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;