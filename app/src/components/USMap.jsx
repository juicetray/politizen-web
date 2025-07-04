import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./USMap.css";

const US_STATES = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function USMap({ onStateClick }) {
  return (
    <div className="map-container">
      <ComposableMap
        projection="geoAlbersUsa"
        width={1000}
        height={600}
        projectionConfig={{ scale: 1000 }}
      >
        <Geographies geography={US_STATES}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => onStateClick(geo.properties.name)}
                className="state"
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default USMap;
