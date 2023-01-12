import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

// import Pluralize from 'react-pluralize'
import pluralize from 'pluralize'

const socket = io('https://ws.jjus.dev' , {secure: true})

function UserCount(props: { text: boolean }) {
    const [online, setOnline] = useState(0)
    useEffect(() => {
        socket.on("broadcast", (data: React.SetStateAction<number>) => {
            setOnline(data);
        });

    }, [socket]);
    useEffect(() => {
        socket.emit("connected")
    }, [])

    return (
        <>
            {props.text ? <span>{ online } {pluralize.plural('Person')}</span> : <span>{ online }</span>}
        </>

    )
}

export default UserCount