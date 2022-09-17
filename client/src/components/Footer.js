import React from 'react'
import PropTypes from 'prop-types'

export default function Navbar(props) {
    let c = () => { if(props.mode === 'dark') return 'white'; else return 'black'; }
    return (
        <div className={`navbar-${props.mode} bg-${props.mode} fixed-bottom`} id='nav' style={{ padding: '3px'}}>
            <h6 style={{ textAlign: 'center', color:c()}}>
                &copy;Copyright Error404
            </h6>
        </div>
    )
}

Navbar.propsType = {
    title: PropTypes.string,
    about: PropTypes.string,
    a: PropTypes.string
}

Navbar.defaultProps = {
    title: "Set title here",
    about: "About",
    a: "a"
};