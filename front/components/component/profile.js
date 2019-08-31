import React from 'react'
import {useSelector} from 'react-redux'

const Profile = () => {
    const { profile } = useSelector(state => state.user);
    return (
        <>
        </>
    )
}

export default Profile