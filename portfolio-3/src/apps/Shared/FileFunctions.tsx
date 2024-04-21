import { ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import { Item } from "../Server/Server";

export function File({
  img,
  title,
  whenSelected,
  renameOnCreate,
  createNewFolder,
  relativePath,
  setCreating,
  targetToEdit,
  path,
  editingTarget,
  setEditingTarget,
  renameNewFolder,
}: {
  img: string;
  title: string;
  whenSelected?: ((item: Item) => void) | any;
  renameOnCreate: boolean;
  relativePath: string;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
  createNewFolder: (path: string, relativePath: string) => void;
  targetToEdit: Item | undefined;
  path: string;
  editingTarget: boolean;
  setEditingTarget: React.Dispatch<React.SetStateAction<boolean>>;
  renameNewFolder: (path: string, oldName: string, newName: string) => void;
  deleteFolder: (path: string, relativePath: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(renameOnCreate);
  const [fileTitle, setFileTitle] = useState(title);
  return (
    <button
      id={path}
      className="file-component"
      onDoubleClick={whenSelected}
    >
      <img alt={path} src={img} />
      {isEditing && !editingTarget && (
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
      {!isEditing &&
        editingTarget &&
        targetToEdit &&
        targetToEdit.path === path && (
          <ClickAwayListener
            onClickAway={async (e) => {
              if ((e.target as HTMLElement).className === "file-component") {
                console.log("blocked event");
                return e.preventDefault();
              }
              setIsEditing(false);
              setCreating(false);
              setEditingTarget(false);
              console.log("relative path in folder: ", relativePath);
              renameNewFolder(`${relativePath}/${path}`, path, fileTitle);
            }}
          >
            <input
              className="file-edit-box"
              onDoubleClick={(e) => e.stopPropagation()}
              onChange={(e) => setFileTitle(e.target.value)}
              defaultValue={fileTitle}
            />
          </ClickAwayListener>
        )}
      {!isEditing && !editingTarget && (
        <a onDoubleClick={() => setIsEditing(true)}>{fileTitle}</a>
      )}
      {!isEditing &&
        editingTarget &&
        targetToEdit &&
        targetToEdit.path !== path && <a>{fileTitle}</a>}
    </button>
  );
}

export default File;
