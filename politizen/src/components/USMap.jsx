import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';

const US_STATES = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const US_COUNTIES = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';

const STATE_FIPS = {
  Florida: '12',
  Texas: '48',
  California: '06',
};

function USMap({ stateView, onStateClick, onCountyClick, onBack }) {
  const { stateFips, countiesTopo, allCountiesTopo } = stateView;

  const filteredCountiesTopo = React.useMemo(() => {
    if (!stateFips || !allCountiesTopo) return null;

    const filtered = allCountiesTopo.objects.counties.geometries.filter(
      (g) => g.id.startsWith(stateFips)
    );

    return {
      type: 'Topology',
      arcs: allCountiesTopo.arcs,
      transform: allCountiesTopo.transform,
      objects: {
        counties: {
          type: 'GeometryCollection',
          geometries: filtered,
        },
      },
    };
  }, [stateFips, allCountiesTopo]);

  return (
    <>
      {stateFips && <button onClick={onBack}>← Back to U.S. Map</button>}
      <ComposableMap projection="geoAlbersUsa" width={800} height={500}>
        <ZoomableGroup center={[-97, 37]} zoom={stateFips ? 3 : 1}>
          {!stateFips && (
            <Geographies geography={US_STATES}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.name;
                  const fips = STATE_FIPS[stateName];
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => fips && onStateClick(fips)}
                      style={geoStyle}
                    />
                  );
                })
              }
            </Geographies>
          )}

          {stateFips && filteredCountiesTopo && (
            <Geographies geography={filteredCountiesTopo}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => onCountyClick(geo.id)}
                    style={countyStyle}
                  />
                ))
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}

const geoStyle = {
  default: { fill: '#3d5a80', outline: 'none' },
  hover: { fill: '#e63946', outline: 'none' },
  pressed: { fill: '#e76f51', outline: 'none' },
};

const countyStyle = {
  default: { fill: '#6c8ebf', outline: 'none' },
  hover: { fill: '#e63946', outline: 'none' },
  pressed: { fill: '#ff9f1c', outline: 'none' },
};

export default USMap;
