import { useEffect, useState } from 'react';
import './BoardList.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface BoardInfo {
  id: string;
  userName: string;
  userLevel: string;
  title: string;
  content: string;
  creatAt: string;
}

// interface UserInfo {
//   name: string;
// }

const BoardList: React.FC = () => {
  const [data, setData] = useState<BoardInfo[]>([]);
  const [liked, setLiked] = useState(false); // 좋아요가 눌려 있는 상태를 저장하는 state
  const [likes, setLikes] = useState(0); // 좋아요 수를 저장하는 state
  const navigate = useNavigate();
  // const [currentUser, setCurrentUser] = useState<UserInfo | null>(null); // 현재 사용자의 userName을 저장할 state 추가
  // const { id } = useParams<{ id: string }>();

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

        // 현재 사용자 정보 가져오기
        // const userResponse = await axios.get('https://lighthouse1.site/users/my/info', config);
        // setCurrentUser(userResponse.data);

      } catch (error) { // get 실패시 console 메시지 출력
        console.error('Error fetching data:', error);
        // navigate('/Login')
      }
    };

    fetchData();
  }, [navigate]);

  const BoardWrite = () => {
    navigate('/BoardWrite')
  }

  // const deletePost = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     const deleteResponse = await axios.delete(`https://lighthouse1.site/posts/delete/${id}`, config);
  //     console.log(deleteResponse);
  //     navigate('/list');
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // }

  const handleLike = () => {
    setLiked(!liked); // 좋아요 상태를 반전
    setLikes(likes + (liked ? -1 : 1)); // 좋아요 상태에 따라 likes 값을 증가시키거나 감소시킴
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="background">
        <div className="leftNav">
          <Link to='/Board' className="Nav" id="board1">전체 게시판</Link>
          <hr />
          <Link to='/Board' className="Nav" id="board2">1학년 게시판</Link><br />
          <Link to='/Board' className="Nav">2학년 게시판</Link><br />
          <Link to='/Board' className="Nav">3학년 게시판</Link>
        </div>
        <div className="middleList">
          <h1>전체 게시판</h1>
          <div className="boardList">
            <table>
              <thead>
                <tr className="boardTitle">
                  <th>No.</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Like</th>
                </tr>
              </thead>
              <tbody className='boardContent'>
                {data.map((data: BoardInfo) => (
                  <>
                    <Link to={`/posts/find/${data.id}`}>
                      <td>{data.id}</td>
                      <td>{data.title}</td>
                      <td>Lv.{data.userLevel}&nbsp;{data.userName}</td>
                      <td>{formatDate(data.creatAt)}</td>
                    </Link>
                    <td>
                      <button onClick={handleLike}>
                        👍 {likes} {/* 좋아요 버튼. 좋아요 수를 표시 */}
                      </button>
                    </td>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='boardBtn'>
          <button onClick={BoardWrite} className='writeBtn'>글 작성</button>
          {/* {data.userName === currentUser?.name && (
            <div>
              <button onClick={deletePost}>Delete</button>
            </div>
          )} */}
        </div>
      </div>


    </>
  );
}


export default BoardList;
