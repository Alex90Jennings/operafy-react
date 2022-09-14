function ControlPanel () {
    return (
        <div className="seven-columns__expand-one-seven control-panel">
            <div></div>
            <button className="footer-background no-border ma-s">
                <img className="icon-x-small" src="./assets/img/random-white.png" alt="random-white"/>
            </button>
            <button className="footer-background no-border ma-s">
                <img className="icon-x-small" src="./assets/img/previous-white.png" alt="previous-white"/>
            </button>
            <button className="footer-background no-border ma-s">
                <img className="icon-small" src="./assets/img/play-white.png" alt="play-white"/>
            </button>
            <button className="footer-background no-border ma-s">
                <img className="icon-x-small" src="./assets/img/next-white.png" alt="forward-white"/>
            </button>
            <button className="footer-background no-border ma-s">
                <img className="icon-x-small" src="./assets/img/repeat-white.png" alt="repeat-white"/>
            </button>
            <div></div>
        </div>
    )
}

export default ControlPanel