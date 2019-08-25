import React from 'react'
import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter();
    const { pid } = router.query;

    return (
        <div>
            pid는 {pid} 입니다
        </div>
    )
}

export default Post