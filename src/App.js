import './responsive.css';
import './grids.css';
import './style.css';

function App() {
  return (
    <div className="App main-body">
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

        {/* MAIN CONTAINER */}

        <main className="main-container dashed-border-blue scrollbar">
          <div className="header two-columns__expand-one dashed-border-green header mg-m">
              <div></div>
              <button className="effettua-lupgrade" id="login-button">
                  <p>LOGIN</p>
              </button>
          </div>

          <nav className="full-width dashed-border-green">
              <ul className="responsive-columns-small align-middle bold">
                  <li className="minwidth ma-m">
                      <a href="www.spotify.com">IN EVIDENZA</a>
                      <div className="underline"></div>
                  </li>
                  <li className="minwidth ma-m">
                      <a href="www.spotify.com">PODCAST</a>
                      <div className="underline"></div>
                  </li>
                  <li className="minwidth ma-m">
                      <a href="www.spotify.com">CLASSIFICHE</a>
                      <div className="underline"></div>
                  </li>
                  <li className="minwidth ma-m">
                      <a href="www.spotify.com">GENERI E MOOD</a>
                      <div className="underline"></div>
                  </li>
                  <li className="minwidth ma-m">
                      <a href="www.spotify.com">NUOVE USCITE</a>
                      <div className="underline"></div>
                  </li>
                  <li className="minwidth ma-m">
                      <a href="www.spotify.com">SCOPRI</a>
                      <div className="underline"></div>
                  </li>
              </ul>
          </nav>

          <h2>Recently Played</h2>

          <div className="dashed-border-green pd-l">
              <ul className="card-list responsive-columns-large">
                  <li className="wrapper">
                      <button className="card">
                          <img className="album" src="./assets/img/mixdaily.jpeg" alt="four-albums"/>
                          <h3>Opera Mix</h3>
                          <h4>Best of the 1880s and more</h4>
                          <div className="overlay">
                              <img className="play-white" src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
                  <li className="wrapper">
                      <button className="card">
                          <img className="album" src="./assets/album-covers/album-one.jpg" alt="album-one"/>
                          <h3>Marriage of Figaro</h3>
                          <h4>Mozart (1786)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
                  <li className="wrapper">
                      <button className="card">
                          <img className="album" src="./assets/album-covers/album-two.jpg" alt="album-two"/>
                          <h3>La Boheme</h3>
                          <h4>Puccini (1896)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
                  <li className="wrapper">
                      <button className="card">
                          <img className="album" src="./assets/album-covers/album-three.jpg" alt="album-three"/>
                          <h3>Der Rosenkavalier</h3>
                          <h4>Richard Strauss (1911)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
                  <li className="wrapper">
                      <button className="card"> 
                          <img className="album" src="./assets/album-covers/album-four.jpg" alt="album-four"/>
                          <h3>Wozzeck</h3>
                          <h4>Berg (1925)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
                  <li className="wrapper">
                      <button className="card">
                          <img className="album" src="./assets/album-covers/album-five.jpg" alt="album-five"/>
                          <h3>Peter Grimes</h3>
                          <h4>Britten (1945)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
              </ul>
          </div>

          <h2>Creato per Alex90Jennings</h2>
          <p><span className="style-dark-grey bold pd-l">Più ascolti, più accurati saranno i suggerimenti</span></p>

          <div className="dashed-border-green pd-l">
              <ul className="card-list responsive-columns-large">
                  <li>
                      <button className="card wrapper">
                          <img className="album" src="./assets/album-covers/album-six.jpg" alt="album-six"/>
                          <h3>Tosca</h3>
                          <h4>Puccini (1990)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
                  <li>
                      <button className="card wrapper">
                          <img className="album" src="./assets/album-covers/album-seven.jpg" alt="album-seven"/>
                          <h3>L'incoronazione di Poppea</h3>
                          <h4>Monteverdi (1643)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
              </ul>
              <div></div>
          </div>

          <h2>Artisti più popolari</h2>
          <p><span className="style-dark-grey bold pd-l">Più ascolti, più accurati saranno i suggerimenti</span></p>

          <div className="dashed-border-green pd-l">
              <ul className="card-list responsive-columns-large">
                  <li>
                      <button className="card card-circular wrapper">
                          <img className="album circular" src="./assets/album-covers/album-eight.jpg" alt="album-eight"/>
                          <h3>Don Giovanni</h3>
                          <h4>Mozart (1787)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
                  <li>
                      <button className="card card-circular wrapper">
                          <img className="album circular" src="./assets/album-covers/album-nine.jpg" alt="album-nine"/>
                          <h3>Otello</h3>
                          <h4>Verdi (1887)</h4>
                          <div className="overlay">
                              <img src="./assets/img/play-white.png" alt="play-white"/>
                          </div>
                      </button>
                  </li>
              </ul>
              <div></div>
          </div>

        </main>

        {/* FOOTER */}

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
    </div>
  );
}

export default App;
