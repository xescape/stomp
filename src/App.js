import React, { useState, useRef } from 'react';
import './App.css';

const items = [
  'a1.jpeg',
  'a2.jpeg',
  'a3.jpeg',
  'a4.jpeg',
]

const desc = [
  'homework',
  'zzz',
  'running',
  'cereal',
]

const MainImg = ({ legUp, selected }) => {
  const n = legUp ? 2 : 1;
  const scale = (selected && !legUp) ? 0.2 : 1;
  const mammothZ = (selected && !legUp) ? 10 : 1;
  return (
    <div className="main-container">
      {
        selected &&
        <img
          className="stomp-target" 
          src={'assets/' + selected}
          style={{ transform: `scaleY(${scale})` }}
          alt="Stomped"
        />
      }
      <img
        className="mammoth-sheep"
        src={`assets/p${n}.png`}
        style={{ zIndex: mammothZ }}
        alt="Mammoth and Sheep!"
      />
    </div>
  )
}

const BottomBar = ({ selectCallback }) => (
  <div className="bottom-bar">
    {
      items.map((e, i) => (
        <img
          className="bottom-bar-item"
          src={'assets/' + e}
          alt={desc[i]}
          onClick={() => selectCallback(e)}
        />
      ))
    }
  </div>
)

function App() {
  const [legUp, setLegUp] =  useState(false);
  const [selected, setSelected] = useState(null);
  const [revision, setRevision] = useState(0);
  const revisionRef = useRef();
  revisionRef.current = revision;

  const handleSelect = (toSelect) => {
    if(legUp) return;
    setRevision((prev) => prev + 1)
    setLegUp(true);
    setSelected(toSelect);
    setTimeout(() => {
      setLegUp(false);
      setTimeout(() => {
        if(revisionRef.current === revision) setSelected(null);
      }, 2000)
    }, 1000)
  }

  return (
    <div>
      <MainImg
        legUp={legUp}
        selected={selected}
      />
      <BottomBar
        selectCallback={handleSelect}
      />
    </div>
  );
}

export default App;

