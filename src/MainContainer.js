import AlbumListUL from "./AlbumListUL"
import HeaderNav from "./HeaderNav"
import LoginButton from "./LoginButton"
import { useState } from "react";

function MainContainer(){
    const [recentlyPlayed,] = useState([
        {name: "Opera Mix", description: "Best of the 1880s and more", album: "mixdaily", albumAlt: "four-albums"},
        {name: "Marriage of Figaro", description: "Mozart (1786)", album: "albumone", albumAlt: "album-one"}, 
        {name: "La Boheme", description: "Puccini (1896)", album: "albumtwo", albumAlt: "album-two"}, 
        {name: "Der Rosenkavalier", description: "Richard Strauss (1911)", album: "albumthree", albumAlt: "album-three"}, 
        {name: "Wozzeck", description: "Berg (1925)", album: "albumfour", albumAlt: "album-four"}, 
        {name: "Peter Grimes", description: "Britten (1945)", album: "albumfive", albumAlt: "album-five"}     
    ])

    const [createdForUser, ] = useState([
        {name: "Tosca", description: "Puccini (1990)", album: "albumsix", albumAlt: "album-six"},
        {name: "L'incoronazione di Poppea", description: "Monteverdi (1643)", album: "albumseven", albumAlt: "album-seven"} 
    ])

    const [popularArtists, ] = useState([
        {name: "Don Giovanni", description: "Mozart (1787)", album: "albumeight", albumAlt: "album-eight"},
        {name: "Otello", description: "Verdi (1887)", album: "albumnine", albumAlt: "album-nine"} 
    ])

    return (
        <main className="main-container dashed-border-blue scrollbar">
            <LoginButton />
            <HeaderNav />
            <h2>Recently Played</h2>
            <AlbumListUL playlist={recentlyPlayed}/>
            <h2>Creato per Alex90Jennings</h2>
            <p><span className="style-dark-grey bold pd-l">Più ascolti, più accurati saranno i suggerimenti</span></p>
            <AlbumListUL playlist={createdForUser}/>
            <h2>Artisti più popolari</h2>
            <p><span className="style-dark-grey bold pd-l">Più ascolti, più accurati saranno i suggerimenti</span></p>
            <AlbumListUL playlist={popularArtists}/>
        </main>
    )
}

export default MainContainer


