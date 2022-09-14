function Footer(){
    return (
        <footer className="dashed-border-blue">
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
            <div className="auto-rows dashed-border-green">
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
                <div className="three-columns__expand-all">
                    <span className="style-light-grey-small-bold align-right">0:25</span>
                    <input className="time-slider" type="range"/>
                    <span className="style-light-grey-small-bold">3:47</span>
                </div>
            </div>
            <div className="auto-columns dashed-border-green volume-rocker">
                <button className="footer-background no-border ma-xs">
                    <img className="icon-x-small" src="./assets/img/files-white.png" alt="files-white"/>
                </button>
                <button className="footer-background no-border ma-xs">
                    <img className="icon-x-small" src="./assets/img/computer-white.png" alt="computer-white"/>
                </button>
                <button className="footer-background no-border ma-xs">
                    <img className="icon-x-small" src="./assets/img/volume-white.png" alt="volume-white"/>
                </button>
                <input className="volume-slider" type="range" min="0" max="100" step="1"/>
            </div>
        </footer>
    )
}

export default Footer


