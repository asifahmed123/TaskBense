import { useMemo, useState } from "react";
import Card from "./Card";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { Column, Id } from "./types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from "react-dom";

const KanbanBoard = () => {
     const [columns, setColumns] = useState<Column[]>([]);
     const [activeColumns, setActiveColumns] = useState<Column | null>(null);

     const generateNewColumn = () => {
          const newColumn = {
               id: generateId(),
               title: `Column ${columns.length + 1}`
          }
          setColumns([...columns, newColumn]);
     }
     const generateId = () => {
          return Math.floor(Math.random() * 10001)
     }

     const handleDeleteColumn = (id: Id) => {
          const filteredColumn = columns.filter(col => col.id !== id)
          setColumns(filteredColumn)
     }

     const updateColumn = (id: Id, title: string) => {
          const newColumns = columns.map((col) => {
               if (col.id !== id) return col;
               return { ...col, title }
          })
          setColumns(newColumns)
     }


     const columnsId = useMemo(() => columns.map(col => col.id), [columns])

     const onDragStart = (event: DragStartEvent) => {
          if (event.active.data.current?.type === "Column") {
               setActiveColumns(event.active.data.current.col)
               return;
          }
     }

     const onDragEnd = (event: DragEndEvent) => {
          const { active, over } = event;
          if (!over) return;

          const activeColumnId = active.id;
          const overColumnId = over.id;

          if (activeColumnId === overColumnId) return;

          setColumns(columns => {
               const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);
               const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

               return arrayMove(columns, activeColumnIndex, overColumnIndex)
          })
     }

     const sensors = useSensors(
          useSensor(PointerSensor, {
               activationConstraint: {
                    distance: 3,
               }
          })
     )

     return (
          <div className="m-auto overflow-y-hidden overflow-x-auto min-h-screen flex items-center w-full">
               <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
                    <div className="m-auto flex gap-3">
                         <div className="flex gap-4">
                              <SortableContext items={columnsId}>
                                   {
                                        columns.map(col => <ColumnContainer handleDeleteColumn={handleDeleteColumn} updateColumn={updateColumn} key={col.id} col={col}></ColumnContainer>)
                                   }
                              </SortableContext>
                         </div>
                         <button onClick={() => { generateNewColumn() }} className="ring-fuchsia-300 hover:ring-2 transition duration-300 min-w-[10rem] min-h-[0.5rem] rounded-lg flex items-center justify-center bg-slate-300 p-2 font-semibold"><HiOutlinePlusCircle /> Add Column</button>
                         <Card></Card>
                    </div>
                    {createPortal(
                         <DragOverlay>
                              {activeColumns && <ColumnContainer col={activeColumns} handleDeleteColumn={handleDeleteColumn} updateColumn={updateColumn}></ColumnContainer>}
                         </DragOverlay>,
                         document.body
                    )}
               </DndContext>
          </div>
     );
};

export default KanbanBoard;