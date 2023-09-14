import { useSortable } from "@dnd-kit/sortable";
import { Column, Id } from "./types";
import { HiOutlineTrash } from "react-icons/hi";
import {CSS} from '@dnd-kit/utilities';

interface ColProps {
     col: Column;
     handleDeleteColumn: (id : Id) => void;
}

const ColumnContainer = ({ col, handleDeleteColumn }: ColProps) => {

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
          id: col.id,
          data: {
               type: 'Column',
               col
          }
     })

     const style = {
          transform: CSS.Transform.toString(transform),
          transition,
        };

        if(isDragging){
          return <div ref={setNodeRef} style={style} className="bg-slate-300 opacity-40 border-2 border-rose-500 w-[20rem] h-[32rem] max-h-[32rem] flex flex-col">
               
          </div>
        }

     return (
          <div ref={setNodeRef} style={style} className="bg-slate-300 w-[20rem] h-[32rem] max-h-[32rem] flex flex-col">
               <div {...attributes} {...listeners} className="bg-slate-400 h-[60px] rounded-md rounded-b-none p-4 text-md font-bold border-slate-300 border-4 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                         <div className="bg-slate-300 flex justify-center items-center px-2 rounded-full">0</div>
                         {col.title}
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