import './responsive.css';
import './grids.css';
import './style.css';
import LeftMenu from './LeftMenu';
import MainContainer from './MainContainer';
import Footer from './Footer';

function App() {
  return (
    <div className="App main-body">
        <LeftMenu />
        <MainContainer />
        <Footer />
    </div>
  );
}

export default App;
