import { Link, useNavigate } from "react-router-dom"
import lighthouse2 from './lighthouse2.png';
import { FC } from "react";
import './Header.css'

const Header: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="header">
                <div className="title">
                    <Link to='/' className='title_name'>
                        <div>
                            <p className="logo_text">Light</p>
                            <p className="logo_text">House</p>
                        </div>
                        <img src={lighthouse2} className="logo" alt="logo" />
                    </Link>
                </div>
                <div className='title_nav'>
                    <Link to='/BoardList' className="nav">게시판</Link>
                    <Link to='/Question' className="nav">문제</Link>
                    <Link to='/Rank' className="nav">랭킹</Link>
                    <Link to='/User' className="nav">내 페이지</Link>
                </div>
                <div className="title_login">
                    <button onClick={() => navigate('/Login')}>Login</button>

                </div>
            </div>

            <hr />
        </>
    )
}

export default Header;