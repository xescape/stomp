import React, { useState } from 'react';
import './App.css';

const items = [
  'a1.png',
  'a2.png',
  'a3.png',
  'a4.png',
  'a5.png',
]

const desc = [
  'homework',
  'zzz',
  'running',
  'cereal',
  'tissue',
]

const balloonPositions = [
  [5, 15, 0],
  [8, 75, 1],
  [20, 20, 2],
  [25, 80, 1],
  [45, 10, 2],
  [50, 28, 1],
  [55, 75, 2],
  [65, 15, 0],
  [62, 85, 1],
  [70, 70, 0],
]

const balloonColorMap = {
  0: 'green',
  1: 'red',
  2: 'yellow',
}

const Background = () => (
  <div className="bg-container">
    <img
      className="hbd-text"
      src="assets/hbd.png"
      alt="Happy birthday!"
    />
    {
      balloonPositions.map((e, i) => (
        <img
          key={i}
          className="balloon"
          src={`assets/balloon-${balloonColorMap[e[2]]}.png`}
          style={{ top: `${e[0]}%`, left: `${e[1]}%`, animationDelay: `${Math.random().toFixed(2)}s` }}
          alt="balloon"
        />
      ))
    }
  </div>
)

const MainImg = ({ legUp, selected }) => {
  const n = legUp ? 2 : 1;
  const mammothZ = (selected && !legUp) ? 10 : 1;
  return (
    <div className="main-container">
      {
        selected &&
        <img
          className={(selected && !legUp) ? 'stomp-target  flat' : 'stomp-target'} 
          src={'assets/' + selected}
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
  <div className="bottom-container">
    <div className="bottom-bar">
      {
        items.map((e, i) => (
          <img
            key={i}
            className="bottom-bar-item"
            src={'assets/' + e}
            alt={desc[i]}
            onClick={() => selectCallback(e)}
          />
        ))
      }
    </div>
    <img
      className="stomp-text"
      src="assets/stomp-text.png"
      alt="stomp"
    />
  </div>
)

function App() {
  const [legUp, setLegUp] =  useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (toSelect) => {
    if(selected) return;
    setLegUp(true);
    setSelected(toSelect);
    setTimeout(() => {
      setLegUp(false);
      setTimeout(() => {
        setSelected(null);
      }, 2000)
    }, 1000)
  }

  return (
    <div className="viewport">
      <MainImg
        legUp={legUp}
        selected={selected}
      />
      <BottomBar
        selectCallback={handleSelect}
      />
      <Background />
    </div>
  );
}

export default App;

