function AlbumListUL () {
    return (
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
    )
}

export default AlbumListUL