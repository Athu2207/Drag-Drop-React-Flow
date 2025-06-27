import React, { useCallback, useState } from 'react'
import ReactFlow,{addEdge, applyNodeChanges, useReactFlow} from 'reactflow'

import "./Column.css"
import 'reactflow/dist/style.css';
export default function Column() {
   const {project }=useReactFlow();
   
   const[nodes,setNodes]=useState([])
   const[context,setContext]=useState(null)
  const[edges,setEdges]=useState([])
  
  const onNodesChange=(changes) => {
    setNodes((nds)=>applyNodeChanges(changes, nds));
  };
  const onConnect=(params)=>{
    const src=nodes.find((nd)=> nd.id===params.source)
    const trg=nodes.find((tr)=> tr.id===params.target)
    if(src?.data?.label==="A" && trg?.data?.label==="B"){
        setEdges((eds)=>addEdge({...params,animated:true},eds))
    }else{
        alert("Cannot connect B to A (B-->A edge is not permitted)")
    }
    
  }
  const onDragStart = (event,label) => {
  event.dataTransfer.setData('application/reactflow',JSON.stringify({label}));
  event.dataTransfer.effectAllowed = 'move';
  };
  const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  },[]);

  const onContext=useCallback((event,node)=>{
    event.preventDefault();
    const position=project({
        x: event.clientX,
        y: event.clientY,
    });
    setContext({
        x: position.x,
        y: position.y,
    })
  },[project])
  
  const onClick=()=>{
    setContext(null)
  }

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
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'A')}>
          A
        </div>
        <div className="sidebar-node" draggable onDragStart={(e) => onDragStart(e, 'B')}>
          B
        </div>
      </div>
      <div className="canvas" onDrop={onDrop} style={{background:"#3e87e1"}} onDragOver={onDragOver}>
        {context&& (
            <div className="context-menu">
                Hello World
            </div>
        )}
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          onContextMenu={onContext}
          onPaneClick={onClick}
          fitView
        >
         
        </ReactFlow>
      </div>
    </div>
  )
}

