import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow,{addEdge, applyNodeChanges, Background, ReactFlowProvider, useReactFlow} from 'reactflow'

import "./Column.css"
import 'reactflow/dist/style.css';
export default function Column() {
   const {project }=useReactFlow();
   
   const[nodes,setNodes]=useState([])
  const[edges,setEdges]=useState([])
  
  const onNodesChange=(changes) => {
    setNodes((nds)=>applyNodeChanges(changes, nds));
  };
  const onConnect=(params)=>{
    setEdges((eds)=>addEdge({...params,animated:true},eds))
  }
  const onDragStart = (event,label) => {
  event.dataTransfer.setData('application/reactflow',JSON.stringify({label}));
  event.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  },[]);

  const onDrop = useCallback(
  (event) =>{
    event.preventDefault();
     const data=event.dataTransfer.getData('application/reactflow');
     if (!data) return;
    const {label} = JSON.parse(data)
    const position = project({
        x: event.clientX,
        y: event.clientY,
    });
    setNodes((nodes) => [
    ...nodes,
    {
      id:`${Date.now()}`,
      type: 'default',
      position,
      data:{label},
    },
    ]);
    },[project]);
  
  

  return (
    <div className="container">
      <div className="sidebar">
        <div className="heading">
            <h1>My Tasks</h1>
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'Study Chemistry')}>
          Study Chemistry
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'Study Maths')}>
          Study Maths
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'Extra activities')}>
            Extra activities
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'Sleep')}>
            Sleep
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, ' Play')}>
            Play
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'Eat Lunch')}>
            Eat Lunch
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'Eat Dinner')}>
            Eat Dinner
        </div>
      </div>
      <div className="canvas" onDrop={onDrop} style={{background:"#3e87e1"}} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          fitView
        >
         
        </ReactFlow>
      </div>
    </div>
  )
}

