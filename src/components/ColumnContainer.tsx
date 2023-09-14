import { useSortable } from "@dnd-kit/sortable";
import { Column, Id } from "./types";
import { HiOutlineTrash } from "react-icons/hi";
import { CSS } from '@dnd-kit/utilities';
import { useState } from "react";

interface ColProps {
     col: Column;
     handleDeleteColumn: (id: Id) => void;
     updateColumn: (id: Id, title: string) => void;
}

const ColumnContainer = ({ col, handleDeleteColumn, updateColumn }: ColProps) => {
     const [editMode, setEditMode] = useState(false);


     const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
          id: col.id,
          data: {
               type: 'Column',
               col
          },
          disabled: editMode,
     })





     const style = {
          transform: CSS.Transform.toString(transform),
          transition,
     };

     if (isDragging) {
          return <div ref={setNodeRef} style={style} className="bg-slate-300 opacity-40 border-2 border-rose-500 w-[20rem] h-[32rem] max-h-[32rem] flex flex-col">

          </div>
     }

     return (
          <div ref={setNodeRef} onClick={() => setEditMode(true)} style={style} className="bg-slate-300 w-[20rem] h-[32rem] max-h-[32rem] flex flex-col">
               <div {...attributes} {...listeners} className="bg-slate-400 h-[60px] rounded-md rounded-b-none p-4 text-md font-bold border-slate-300 border-4 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                         <div className="bg-slate-300 flex justify-center items-center px-2 rounded-full">0</div>
                         {!editMode ? col.title
                              : <input
                                   className="bg-slate-300 focus:border-rose-500 outline-none p-2 rounded"
                                   value={col.title}
                                   onChange={(e) => updateColumn(col.id, e.target.value)}
                                   autoFocus
                                   onBlur={() => setEditMode(false)}
                                   onKeyDown={(e) => {
                                        if (e.key !== "Enter") return
                                        setEditMode(false)
                                   }}>
                              </input>}

                    </div>
                    <button className="text-2xl hover:text-red-600" onClick={() => handleDeleteColumn(col.id)}><HiOutlineTrash></HiOutlineTrash></button>
               </div>
               <div className="flex flex-grow">
                    content
               </div>
               <div>Footer</div>
          </div>
     );
};

export default ColumnContainer;