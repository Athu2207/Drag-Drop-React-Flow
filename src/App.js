import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import Column from './Column';

function App() {
  return (
    <ReactFlowProvider>
      <Column/>
    </ReactFlowProvider>
  );
}

export default App;