import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BoardWrite.css';

const BoardWrite: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const postData = async () => {
        const token = localStorage.getItem('token');
        axios.post('http://localhost:8080/posts/save', { title, content }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                alert('저장되었습니다.');
                navigate('/Board');
            })
            .catch(error => {
                console.error('Something went wrong', error);
            });
    };

    return (
        <div className='boardWrite'>
            <div className="leftNav">
                <Link to='/Board' className="Nav" id="board1">전체 게시판</Link>
                <hr />
                <Link to='/Board' className="Nav" id="board2">1학년 게시판</Link><br />
                <Link to='/Board' className="Nav">2학년 게시판</Link><br />
                <Link to='/Board' className="Nav">3학년 게시판</Link>
            </div>
            <div className='writing'>
                <p className='writingT'>
                    <label>제목: </label> &nbsp;&nbsp;
                    <input className='writingA' type="text" value={title} onChange={e => setTitle(e.target.value)} />
                </p>
                <p className='writingC'>
                    <label>내용: </label> &nbsp;&nbsp;
                    <textarea className='writingB' value={content} onChange={e => setContent(e.target.value)} />
                </p>
                <button onClick={postData} className='writingBtn'>저장</button>
            </div>
        </div>
    );
};

export default BoardWrite;
