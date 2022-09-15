function VolumeSlider () {
    return (
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
    )
}

export default VolumeSlider