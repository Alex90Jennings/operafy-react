function Playlist (props) {
    const playlistUL = props.playlistUL

    return (
        <div className="playlist dashed-border-green">
            <h2>Playlist</h2>
            <button className="two-columns__expand-two crea-playlist-button">
                <img className="icon pd-s grey-background" src="./assets/img/plus.png" alt="plus-grey"/>
                <span className="style-font-size-normal">Crea Playlist</span>
            </button>
            <ul className="pd-m">
                {playlistUL.map((playlistItem)=> {
                    return (
                        <li key={`${playlistItem.name}`}><a href="www.spotify.com">{`${playlistItem.name}`}</a></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Playlist