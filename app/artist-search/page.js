"use client"

import React, { useEffect, useState } from 'react'


function Page() {
    const [search, setSearch] = useState('')
    const [artists, setArtists] = useState([])

    useEffect(() => {
        async function fetchArtists() {
            const {artists: res} = await (await fetch(`/api/artists?artist=${search}`)).json()
            setArtists(res.items)

        }

        fetchArtists()
    }, [search])
  return (
    <>
    <input type='text' value={search} onChange={(e) => setSearch(e.target.value)}></input>
    <div>{artists.map(a => (
        <h2 key={a.id}>{a.name}</h2>
    ))}</div>
    </>
  )
}

export default Page