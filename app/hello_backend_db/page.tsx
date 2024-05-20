'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page() {
    const [data, setData] = useState({ message: "Loading..." })

    useEffect(() => {
        axios.get('/api/hello_db/backend').then((res) => {
            setData(res.data)
        })
    }, [])
    return <div>hello {data.message}!</div>
}