import { useEffect, useState } from 'react';
import USMap from '../components/USMap';
import './Home.css';

function Home() {
  const [allCountiesTopo, setAllCountiesTopo] = useState(null);
  const [stateFips, setStateFips] = useState(null);
  const [selectedCountyId, setSelectedCountyId] = useState(null);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json')
      .then(res => res.json())
      .then(setAllCountiesTopo);
  }, []);

  return (
    <div className="home-container">
      <h1>🗳️ Politizen</h1>

      <div className="map-and-sidebar">
        <USMap
          stateView={{ stateFips, allCountiesTopo }}
          onStateClick={setStateFips}
          onCountyClick={setSelectedCountyId}
          onBack={() => {
            setStateFips(null);
            setSelectedCountyId(null);
          }}
        />

        <aside className="sidebar">
          {selectedCountyId ? (
            <div>
              <h3>County ID: {selectedCountyId}</h3>
              <p>API data here</p>
            </div>
          ) : stateFips ? (
            <p>Select a county to view details</p>
          ) : (
            <p>Select a state to explore counties</p>
          )}
        </aside>
      </div>
    </div>
  );
}

export default Home;
