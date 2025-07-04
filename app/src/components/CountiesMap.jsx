import React, { useEffect, useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import "./CountiesMap.css";

const US_COUNTIES = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

function CountiesMap({ stateFips, onCountyClick, onBack }) {
  const [allCountiesTopo, setAllCountiesTopo] = useState(null);

  useEffect(() => {
    fetch(US_COUNTIES)
      .then((res) => res.json())
      .then(setAllCountiesTopo);
  }, []);

  const filteredCountiesTopo = useMemo(() => {
    if (!stateFips || !allCountiesTopo) return null;

    const filtered = allCountiesTopo.objects.counties.geometries.filter((g) =>
      g.id.startsWith(stateFips)
    );

    return {
      type: "Topology",
      arcs: allCountiesTopo.arcs,
      transform: allCountiesTopo.transform,
      objects: {
        counties: {
          type: "GeometryCollection",
          geometries: filtered,
        },
      },
    };
  }, [stateFips, allCountiesTopo]);

  return (
    <div className="map-container">
      <button className="back-button" onClick={onBack}>
        ← Back to U.S. Map
      </button>

      <ComposableMap
        projection="geoMercator"
        width={800}
        height={600}
        projectionConfig={{
          center: [-83.5, 27.8], // Florida's center
          scale: 4000, // Increase/decrease as needed
        }}
      >
        {filteredCountiesTopo && (
          <Geographies geography={filteredCountiesTopo}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() =>
                    onCountyClick({
                      id: geo.id,
                      name: geo.properties.name || "Unknown",
                    })
                  }
                  className="county"
                />
              ))
            }
          </Geographies>
        )}
      </ComposableMap>
    </div>
  );
}

export default CountiesMap;
