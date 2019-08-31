import React from 'react'
import Link from 'next/link'
import {useSelector} from 'react-redux'

const MyNav = () => {
    const {user} = useSelector(state=>state.user);
    return (
        <div className="nav">
            <ul>
                <Link href="/star"><a>스타</a></Link>
                <Link href="/shop"><a>샵</a></Link>       
                {user 
                ? 
                <Link href="/profile"><a>내 프로필</a></Link>
                :
                <Link href="/login"><a>로그인</a></Link>
                }          
            </ul>
        </div>
    )
}

export default MyNav