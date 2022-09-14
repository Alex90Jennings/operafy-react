function Playlist () {
    return (
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
    )
}

export default Playlist