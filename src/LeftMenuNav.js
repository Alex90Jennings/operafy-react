function LeftMenuNav () {
    return (
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
    )
}

export default LeftMenuNav