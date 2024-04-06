import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";

export function File({
  img,
  title,
  whenSelected,
  renameOnCreate,
  createNewFolder,
  relativePath,
  setCreating,
}: {
  img: string;
  title: string;
  whenSelected: any;
  renameOnCreate: boolean;
  relativePath: string;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  createNewFolder: (path: string, relativePath: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(renameOnCreate);
  const [fileTitle, setFileTitle] = useState(title);

  return (
    <button className="file-component" onDoubleClick={whenSelected}>
      <img src={img} />
      {isEditing && (
        <ClickAwayListener
          onClickAway={async (e) => {
            if ((e.target as HTMLElement).className === "file-component") {
              console.log("blocked event");
              return e.preventDefault();
            }
            setIsEditing(false);
            setCreating(false);
            createNewFolder(`${relativePath}/${fileTitle}`, relativePath);
            console.log("relative path in folder: ", relativePath);
          }}
        >
          <input
            className="file-edit-box"
            onChange={(e) => setFileTitle(e.target.value)}
            defaultValue={fileTitle}
          />
        </ClickAwayListener>
      )}
      {!isEditing && (
        <a onDoubleClick={() => setIsEditing(true)}>{fileTitle}</a>
      )}
    </button>
  );
}

export default File;
