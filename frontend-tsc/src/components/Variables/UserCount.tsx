import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
//@ts-ignore
import Pluralize from 'react-pluralize'

const socket = io('http://ws.jjus.dev')

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
            {props.text ? <Pluralize singular={'Person'} plural={'People'} count={online} /> : <span>{ online }</span>}
        </>

    )
}

export default UserCount