import { useState } from "react";
import USMap from "./components/USMap";
import CountiesMap from "./components/CountiesMap";

function App() {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCountyId, setSelectedCountyId] = useState(null);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>🗳️ Politizen</h1>

      {!selectedState ? (
        <USMap onStateClick={setSelectedState} />
      ) : (
        <CountiesMap
          stateFips={selectedState.id}
          onCountyClick={setSelectedCountyId}
          onBack={() => {
            setSelectedState(null);
            setSelectedCountyId(null);
          }}
        />
      )}

      {selectedState && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Selected State:</strong> {selectedState.name}
        </div>
      )}
    </div>
  );
}

export default App;
