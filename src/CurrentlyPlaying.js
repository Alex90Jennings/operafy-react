function CurrentlyPlaying () {
    return (
        <div className="four-columns__expand-two currently-playing dashed-border-green">
            <img className="icon" src="./assets/album-covers/album-five.jpg" alt="album-five"/>
            <div className="auto-rows">
                <h3>Peter Grimes</h3>
                <h4>Britten (1945)</h4>
            </div>
            <button className="footer-background no-border">
                <img className="icon-x-small" src="./assets/img/heart-grey.png" alt="heart-grey"/>
            </button>
            <button className="footer-background no-border">
                <img className="icon-x-small" src="./assets/img/folder-grey.png" alt="folder-grey"/>
            </button>
        </div>
    )
}

export default CurrentlyPlaying