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

// interface UserInfo {
//     name: string;
// }

// interface CommentInfo {
//     id: string;
//     userName: string;
//     userLevel: string;
//     content: string;
//     createAt: string;
// }

const BoardDetail: React.FC = () => {
    const [data, setData] = useState<BoardInfo | null>(null);
    // const [commentShow, sestCommentShow] = useState<CommentInfo | null>(null);
    // const [content, setContent] = useState('');
    const [liked, setLiked] = useState(false); // 좋아요가 눌려 있는 상태를 저장하는 state
    const [likes, setLikes] = useState(0); // 좋아요 수를 저장하는 state
    // const [currentUser, setCurrentUser] = useState<UserInfo | null>(null); // 현재 사용자의 userName을 저장할 state 추가
    const { id } = useParams<{ id: string }>();
    const { postId } = useParams<{ postId: string }>();
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
                const response = await axios.get(`https://lighthouse1.site/posts/find/${id}`, config);
                setData(response.data);

                // 댓글 불러오기
                // const commentResponse = await axios.get(`https://lighthouse1.site/comments/find/${id}`, config);
                // sestCommentShow(commentResponse.data);

                // // 현재 사용자의 userName을 얻어오는 API 요청 추가
                // const userResponse = await axios.get('https://lighthouse1.site/users/my/info', config);
                // setCurrentUser(userResponse.data);

                // // userName 확인
                // console.log('Post userName:', response.data.userName);
                // console.log('Current userName:', userResponse.data.name);
            } catch (error) {
                console.error('Error fetching data:', error);
                navigate('/Login');
            }
        };

        fetchData();
    }, [navigate, id]);

    // const postCommentData = async () => {
    //     const token = localStorage.getItem('token');
    //     axios.post(`https://lighthouse1.site/comments/save/${id}`, { content }, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(() => {
    //             alert('저장되었습니다.');
    //             navigate('/Board');
    //         })
    //         .catch(error => {
    //             console.error('Something went wrong', error);
    //         });
    // };

    // const deletePost = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const config = {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         };
    //         const response = await axios.delete(`https://lighthouse1.site/posts/delete/${id}`, config);
    //         console.log(response);
    //         navigate('/list');
    //     } catch (error) {
    //         console.error('Error deleting post:', error);
    //     }
    // }

    // 좋아요 버튼 클릭시 동작할 함수 구현
    const handleLike = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // 좋아요 상태를 반전
            const newLiked = !liked;
            setLiked(newLiked);

            // 변경된 좋아요 상태를 서버에 전송
            const response = await axios.post(`https://lighthouse1.site/likes/${postId}`, { liked: newLiked }, config);

            // 서버로부터 받아온 새로운 좋아요 수를 설정
            setLikes(response.data.likes);
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };

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
            {/* 게시글 작성자와 현재 사용자가 같다면 삭제 버튼을 보여줌 */}
            {/* {data.userName === currentUser?.name && (
                <div>
                    <button onClick={deletePost}>Delete</button>
                </div>
            )} */}

            <button onClick={handleLike}>
                👍 {likes} {/* 좋아요 버튼. 좋아요 수를 표시 */}
            </button>

            {/* <div className="comment">
                <p className="commentWrite">
                    <label>댓글: </label>
                    <input className="commentA" type="text" value={content} onChange={e => setContent(e.target.value)} />
                </p>

                <button className="commentBtn" onClick={postCommentData}>저장</button>
                <div>
                    {commentShow?.id}<br />
                    {commentShow?.content}<br />
                    {commentShow?.userLevel}
                    {commentShow?.userName}
                </div>
            </div> */}
        </>
    );
};

export default BoardDetail;
