import Header from '../components/Header';
import Blurb from '../components/Blurb';
import USMap from '../components/USMap';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <Header />
      <Blurb />
      <USMap />
      <Footer />
    </div>
  );
}

export default Home;
