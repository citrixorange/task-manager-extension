import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TabPage from './TabPage';

ReactDOM.render(
    <DndProvider backend={HTML5Backend}>
        <TabPage/>
    </DndProvider>, 
    document.getElementById('root')
);