function LeftMenu(){
    return (
        <aside className="left-menu dashed-border-blue">
            <div className="three-rows__expand-one-three logo">
                <div></div>
                <div className="three-columns__expand-three">
                    <img id="logo" src="./assets/img/logo.png" alt="logo"/>
                    <h1>Operafy</h1>
                    <div></div>
                </div>
                <div></div>
            </div>
            <nav className="dashed-border-green">
                <ul>
                    <li>
                        <a className="ma-m two-columns__expand-two" href="www.spotify.com">
                            <img className="icon-small" src="./assets/img/home.svg" alt="home-white"/>
                            <p><span className="pd-s">Home</span></p>
                        </a>
                    </li>
                    <li>
                        <a className="ma-m two-columns__expand-two" href="www.spotify.com">
                            <img className="icon-small" src="./assets/img/search.svg" alt="magnifying-glass-grey"/>
                            <p><span className="pd-s">Cerca</span></p>
                        </a>
                    </li>
                    <li>
                        <a className="ma-m two-columns__expand-two" href="www.spotify.com">
                            <img className="icon-small" src="./assets/img/libreria.svg" alt="libreria-grey"/>
                            <p><span className="pd-s">La tua liberia</span></p>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="playlist dashed-border-green">
                <h2>Playlist</h2>
                <button className="two-columns__expand-two crea-playlist-button">
                    <img className="icon pd-s grey-background" src="./assets/img/plus.png" alt="plus-grey"/>
                    <span className="style-font-size-normal">Crea Playlist</span>
                </button>
                <ul className="pd-m">
                    <li><a href="www.spotify.com">gym opera</a></li>
                    <li><a href="www.spotify.com">Mozart Madness</a></li>
                    <li><a href="www.spotify.com">dubstep-Opera-Vibes</a></li>
                    <li><a href="www.spotify.com">road trip opera</a></li>
                    <li><a href="www.spotify.com">opera hype</a></li>
                    <li><a href="www.spotify.com">summer 2019 opera tunes</a></li>
                    <li><a href="www.spotify.com">chilled out opera</a></li>
                    <li><a href="www.spotify.com">opera underground club mix</a></li>
                </ul>
            </div>
            <button className="two-rows__expand-one border-bottom installa-app-button">
                <div></div>
                <div className="three-columns__expand-three dashed-border-green">
                    <img className="icon-small" src="./assets/img/download.svg" alt="download-grey"/>
                    <span className="">Installa app</span>
                    <div></div>
                </div>
            </button>
            <button  className="three-columns__expand-three dashed-border-green profile-button">
                <img className="icon-small profile-outline" src="./assets/img/profile.svg" alt="profile-pic"/>
                <span className="style-white-bold">Alex90Jennings</span>
                <div></div>
            </button>
        </aside>
    )
}

export default LeftMenu


