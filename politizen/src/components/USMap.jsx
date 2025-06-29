import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';

// Public domain TopoJSON of U.S. states
const geoUrl =
  'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

function USMap() {
  const [selectedState, setSelectedState] = useState(null);

  const handleStateClick = (geo) => {
    const stateName = geo.properties.name;
    setSelectedState(stateName);
    console.log('Selected State:', stateName);
  };

  return (
    <section className="us-map">
      <h2>Explore the Map</h2>
      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        width={800}
        height={500}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleStateClick(geo)}
                style={{
                  default: {
                    fill: '#D6D6DA',
                    outline: 'none',
                  },
                  hover: {
                    fill: '#F53',
                    outline: 'none',
                  },
                  pressed: {
                    fill: '#E42',
                    outline: 'none',
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {selectedState && (
        <p style={{ marginTop: '1rem' }}>
          Selected: <strong>{selectedState}</strong>
        </p>
      )}
    </section>
  );
}

export default USMap;
