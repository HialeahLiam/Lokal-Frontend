import React from 'react'
import { getSpotifyAccessToken } from '../../lib/spotifyAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import { performance, PerformanceObserver } from 'perf_hooks'

async function Page() {

  
  const token = await getSpotifyAccessToken(1)
  
  // const obs = new PerformanceObserver((items) => {
  //   console.log(items.getEntries()[0].duration);
  //   performance.clearMarks();
  // });

  // obs.observe({type: 'measure'})s



  
  const spotifyWebApi = new SpotifyWebApi()
  spotifyWebApi.setAccessToken(token)

console.log('RADIOHEAD')
  console.log('--------------')
  
  
  performance.mark('A');
  const {items: albums} = await  (await fetch (`https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb/albums`, {
      headers: {Authorization: `Bearer ${token}`,
      next: {
        validate: 5
      }
    }
    })).json()
    performance.measure('A to Now', 'A');

    
    
    // console.log(`radiohead album fetch took ${(end - start)/1000} seconds`)
    
    performance.mark('B');
    
    await  (await fetch (`https://api.spotify.com/v1/artists/4Z8W4fKeB5YxbusRsdQVPb/albums`, {
      headers: {Authorization: `Bearer ${token}`}
    })).json()
    
    performance.measure('B to now', 'B')
    
    console.log(performance.getEntriesByType('measure'))
    performance.clearMeasures()
    performance.clearMarks()
  // console.log(`radiohead album SECOND fetch took ${(end - start)/1000} seconds`)
  return (
    <div>{albums.map(a => (
      <h2 key={a.id}>{a.name}</h2>
    ))}</div>
  )
}

export default Page