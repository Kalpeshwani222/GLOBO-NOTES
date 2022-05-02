import { Spinner } from 'react-bootstrap'
import React from 'react'

const Loading = ({size=100}) => {
    return (
        <>
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"100%",
            height:"100%",
        }}>
            <Spinner style={{
                width:size,
                height:size,
            }} animation='border'>

            </Spinner>
        </div>
            
        </>
    )
}

export default Loading
