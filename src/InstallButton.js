function InstallButton () {
    return (
        <button className="two-rows__expand-one border-bottom installa-app-button">
            <div></div>
            <div className="three-columns__expand-three dashed-border-green">
                <img className="icon-small" src="./assets/img/download.svg" alt="download-grey"/>
                <span className="">Installa app</span>
                <div></div>
            </div>
        </button>
    )
}

export default InstallButton