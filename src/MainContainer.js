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

    console.log(recentlyPlayed[2].album)

    return (
        <main className="main-container dashed-border-blue scrollbar">
            <LoginButton />
            <HeaderNav />
            <h2>Recently Played</h2>
            <AlbumListUL playlist={recentlyPlayed}/>
            <h2>Creato per Alex90Jennings</h2>
            <p><span className="style-dark-grey bold pd-l">Più ascolti, più accurati saranno i suggerimenti</span></p>
            <div className="dashed-border-green pd-l">
                <ul className="card-list responsive-columns-large">
                    <li>
                        <button className="card wrapper">
                            <img className="album" src="./assets/album-covers/album-six.jpg" alt="album-six"/>
                            <h3>Tosca</h3>
                            <h4>Puccini (1990)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button className="card wrapper">
                            <img className="album" src="./assets/album-covers/album-seven.jpg" alt="album-seven"/>
                            <h3>L'incoronazione di Poppea</h3>
                            <h4>Monteverdi (1643)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                </ul>
                <div></div>
            </div>
            <h2>Artisti più popolari</h2>
            <p><span className="style-dark-grey bold pd-l">Più ascolti, più accurati saranno i suggerimenti</span></p>
            <div className="dashed-border-green pd-l">
                <ul className="card-list responsive-columns-large">
                    <li>
                        <button className="card card-circular wrapper">
                            <img className="album circular" src="./assets/album-covers/album-eight.jpg" alt="album-eight"/>
                            <h3>Don Giovanni</h3>
                            <h4>Mozart (1787)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                    <li>
                        <button className="card card-circular wrapper">
                            <img className="album circular" src="./assets/album-covers/album-nine.jpg" alt="album-nine"/>
                            <h3>Otello</h3>
                            <h4>Verdi (1887)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                </ul>
                <div></div>
            </div>
        </main>
    )
}

export default MainContainer


