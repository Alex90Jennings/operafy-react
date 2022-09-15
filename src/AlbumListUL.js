function AlbumListUL (props) {
    const playlist = props.playlist

    return (
        <div className="dashed-border-green pd-l">
            <ul className="card-list responsive-columns-large">
                {playlist.map((playlistItem)=> {
                    return (
                        <li className="wrapper">
                            <button className="card">
                                <img className="album" src={`./assets/album-covers/${playlistItem.album}.jpg`} alt={`${playlistItem.albumAlt}`}/>
                                <h3>{playlistItem.name}</h3>
                                <h4>{playlistItem.description}</h4>
                                <div className="overlay">
                                    <img className="play-white" src="./assets/img/play-white.png" alt="play-white"/>
                                </div>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default AlbumListUL