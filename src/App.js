
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

let initialData = [
  {
    id:1,
    value: 100,
    color: "brown"
  },
  {
    id:2,
    value: 200,
    color: "blue"
  },
  {
    id:3,
    value: 300,
    color: "violet"
  },
  {
    id:4,
    value: 400,
    color: "indigo"
  },
  {
    id:5,
    value: 500,
    color: "cream"
  },
  {
    id:6,
    value: 600,
    color: "yellow"
  },
  {
    id: 7,
    value: 700,
    color: "green"
  },
  {
    id: 8,
    value: 800,
    color: "purple"
  },
  {
    id: 9,
    value: 900,
    color: "pink"
  }
]
function App() {
  const [cells, updatecells] = useState(initialData);
  const [currentIndex, updateCurrentIndex] = useState({source:0, destination:0});

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(cells);
    const sourceId = result.source.index;
    const destinationId = result.destination.index;
    // Swipe arrays
    [items[sourceId], items[destinationId]] = [items[destinationId], items[sourceId]];
    
    // Update array list
    updatecells(items)

    // after successfully moving record current positions
    updateCurrentIndex({source: sourceId, destination:destinationId});

  }

  function addCell(){
    const newCells = [];
    for (let index = 1; index <= 3; index++) {
      const lastItem = {...cells[cells.length-1]};
      // Add object
      const newCell = {
        id: lastItem.id + index,
        value: lastItem.value + (100 * index),
        color: "green"
      }
      newCells.push(newCell)
    }
    const copyOfCells = [...cells, ...newCells];
    updatecells(copyOfCells)
  }

  function undoCell(){
    const items = Array.from(cells);
    [items[currentIndex.source], items[currentIndex.destination]] = [items[currentIndex.destination], items[currentIndex.source]];

    // Update array list
    updatecells(items)
  }

  return (
    <div className="App">
      <div className='button-container'>
        <div><button onClick={addCell}>Add Button</button></div>
        <div><button onClick={undoCell}>Undo Button</button></div>
      </div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="cells">
            {(provided) => (
              <div className="container" {...provided.droppableProps} ref={provided.innerRef}>
                {cells.map(({id, color, value}, index) => {
                  return (
                    <Draggable key={id} draggableId={id.toString()} index={index}>
                      {(provided) => (
                        <div className='cell' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className={`rectangle`} style={{backgroundColor: color}}>{value}</div>
                        </div>                        
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
     
    </div>
  );
}

export default App;

