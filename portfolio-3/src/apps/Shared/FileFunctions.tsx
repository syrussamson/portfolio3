import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";


const submitConfirmation = (params) => {
    
}


export function File({
  img,
  _title,
  whenSelected,
}: {
  img: string;
  title: string;
  whenSelected: any;
}) {
  const [isEditing, setIsEditing] = useState(true);
  const [title, setTitle] = useState(_title)
  return (
    <button className="file-component" onDoubleClick={whenSelected}>
      <img src={img} />
        {
            isEditing && (
                <ClickAwayListener onClickAway={(e) => {
                    console.log(e)
                    setTitle(e.target.value)
                    setIsEditing(false)
                }}>
                    <input placeholder={'test'}/>
                </ClickAwayListener>
            )
        }
        {
            !isEditing && (
                <a>{title}</a>
            )
        }
    </button>
  );
}

export default File;
