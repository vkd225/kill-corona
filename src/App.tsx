import React from 'react';
import Routes from './components/Routes';
import './styles/App.css';
import { SprayProvider } from './context/SprayContext';


function App() {
  const data = { sprayValue: 0 }

  return (
    //@ts-ignore
    <SprayProvider value={data}>
      <Routes />
    </SprayProvider>
  );
}

export default App;