function MainContainer(){
    return (
        <main className="main-container dashed-border-blue scrollbar">
            <div className="header two-columns__expand-one dashed-border-green header mg-m">
                <div></div>
                <button className="effettua-lupgrade" id="login-button">
                    <p>LOGIN</p>
                </button>
            </div>
            <nav className="full-width dashed-border-green">
                <ul className="responsive-columns-small align-middle bold">
                    <li className="minwidth ma-m">
                        <a href="www.spotify.com">IN EVIDENZA</a>
                        <div className="underline"></div>
                    </li>
                    <li className="minwidth ma-m">
                        <a href="www.spotify.com">PODCAST</a>
                        <div className="underline"></div>
                    </li>
                    <li className="minwidth ma-m">
                        <a href="www.spotify.com">CLASSIFICHE</a>
                        <div className="underline"></div>
                    </li>
                    <li className="minwidth ma-m">
                        <a href="www.spotify.com">GENERI E MOOD</a>
                        <div className="underline"></div>
                    </li>
                    <li className="minwidth ma-m">
                        <a href="www.spotify.com">NUOVE USCITE</a>
                        <div className="underline"></div>
                    </li>
                    <li className="minwidth ma-m">
                        <a href="www.spotify.com">SCOPRI</a>
                        <div className="underline"></div>
                    </li>
                </ul>
            </nav>
            <h2>Recently Played</h2>
            <div className="dashed-border-green pd-l">
                <ul className="card-list responsive-columns-large">
                    <li className="wrapper">
                        <button className="card">
                            <img className="album" src="./assets/img/mixdaily.jpeg" alt="four-albums"/>
                            <h3>Opera Mix</h3>
                            <h4>Best of the 1880s and more</h4>
                            <div className="overlay">
                                <img className="play-white" src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                    <li className="wrapper">
                        <button className="card">
                            <img className="album" src="./assets/album-covers/album-one.jpg" alt="album-one"/>
                            <h3>Marriage of Figaro</h3>
                            <h4>Mozart (1786)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                    <li className="wrapper">
                        <button className="card">
                            <img className="album" src="./assets/album-covers/album-two.jpg" alt="album-two"/>
                            <h3>La Boheme</h3>
                            <h4>Puccini (1896)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                    <li className="wrapper">
                        <button className="card">
                            <img className="album" src="./assets/album-covers/album-three.jpg" alt="album-three"/>
                            <h3>Der Rosenkavalier</h3>
                            <h4>Richard Strauss (1911)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                    <li className="wrapper">
                        <button className="card"> 
                            <img className="album" src="./assets/album-covers/album-four.jpg" alt="album-four"/>
                            <h3>Wozzeck</h3>
                            <h4>Berg (1925)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                    <li className="wrapper">
                        <button className="card">
                            <img className="album" src="./assets/album-covers/album-five.jpg" alt="album-five"/>
                            <h3>Peter Grimes</h3>
                            <h4>Britten (1945)</h4>
                            <div className="overlay">
                                <img src="./assets/img/play-white.png" alt="play-white"/>
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
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


