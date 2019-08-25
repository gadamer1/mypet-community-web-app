import React from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav'

const MainLayout = ({ children }) => {


    return (
        <>
            <Nav />
            <div>
                {children}
            </div>
        </>
    )
}


MainLayout.propTypes = {
    children: PropTypes.node,
}

export default MainLayout