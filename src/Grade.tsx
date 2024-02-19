import { Link } from 'react-router-dom'
import './Grade.css'

const Grade = () => {

    return (
        <>
            <div className='Grade'>
                <div className="leftNav">
                    <Link to='/Grade1' className="Nav" id='Q1'>1학년 문제</Link><br />
                    <Link to='/Grade2' className="Nav">2학년 문제</Link><br />
                    <Link to='/Grade3' className="Nav">3학년 문제</Link>
                </div>
                <div className='Level'>
                    <Link to='/UploadQ' className="A">수와 연산</Link>
                    <Link to='/Question' className="B">문자와 식</Link>
                    <Link to='/' className="C">함수</Link>
                    <Link to='/' className="D">기하</Link>
                    <Link to='/' className="E">확률과 통계</Link>
                </div>
            </div>
        </>
    )
}

export default Grade;