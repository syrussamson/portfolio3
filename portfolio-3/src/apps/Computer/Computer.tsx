import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { OpenProcesses, RelativePath } from "../../Globals";
import NavPanel from "../Shared/NavPanel";
import FileTemplate, { FileTemplate as FileMock } from "../Shared/FileTemplate";
import File from "../Shared/FileFunctions";
import documents from "../../assets/documents.png";
import hd from "../../assets/harddrive.png";
import network from "../../assets/network.ico";
import { Menu } from "@mui/material";
import file from "../../assets/txt.png";
import { v4 as uuidv4 } from "uuid";

const uuid = uuidv4;

const pathBacktracer = (path: string) => {
  console.log(path);
  let pathArray = path.split('/');
  if (pathArray.length === 1) {
    return '';
  }
  pathArray.pop();
  return pathArray.join('/');
};

const imgGetter = (type: string) => {
  switch (type) {
    case "folder":
      return documents;
    case "file":
      return file;
    default:
      return file;
  }
};

export interface Item {
  title: string;
  type: string;
  path: string;
}

function ContextRow({
  onClickFunction,
  id,
  label,
  style,
}: {
  onClickFunction: any;
  id: string;
  label: string;
  style: string;
}) {
  return (
    <button className="context-row" onClick={onClickFunction} id={id}>
      <p
        style={{
          fontWeight: style === "bold" ? "bolder" : "",
          color: style === "disabled" ? "gray" : "black",
          cursor: style === "disabled" ? "default" : "",
        }}
      >
        {label}
      </p>
    </button>
  );
}

function Computer() {
  const [openProcesses, setOpenProcesses] = useAtom(OpenProcesses);
  const [error, setError] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuServiceType, setMenuServiceType] = useState<string | null>(null);
  const [isInRoot, setIsInRoot] = useState(true);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
  const [relativePath, setRelativePath] = useAtom(RelativePath);
  const [items, setItems] = useState<Item[] | undefined>();
  const [creating, setCreating] = useState(false);
  const [targetToEdit, setTargetToEdit] = useState<Item | undefined>()
  const [editingTarget, setEditingTarget] = useState(false)

  const openErrorDialogue = () => {
    setError(true);
  };
  const openServer = () => {
    setIsInRoot(false);
  };
  useEffect(() => {
    fetchDirectory(relativePath);
  }, [relativePath]);

  const handleContextMenu = (e: any) => {
    e.preventDefault();
    setMenuPosition({ left: e.clientX, top: e.clientY });
    setOpenMenu(true);
    setMenuServiceType(e.target.id);
    console.log(e.target)
    const itemTarget = items?.find(item => e.target.alt === item.path || e.target.id === item.path)
    if (itemTarget) {
      console.log('target to edit: ', itemTarget)
      setTargetToEdit(itemTarget)
    }
  };

  const handleCreateNewFolder = (dir: string) => {
    createNewFolder(dir);
  };

  const selectHandler = (item: Item) => {
    console.log('select handler: ', item);
    if (item.type === "folder") {
      setRelativePath(item.path);
      return fetchDirectory("" + item.path);
    }
  };


  // GET then set to Items
  const fetchDirectory = (path: string) => {
    console.log(path);
    fetch(`http://localhost:3333/root/${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setItems(res));
  };


  // POST it then map to Items
  const createNewFolder = (path: string, type: string) => {
    console.log(path);
    fetch(`http://localhost:3333/root/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: path,
        type: type || 'folder'
      }),
    })
      .then((res) => res.json())
      .then((res) => setItems(res))
  };

    // PUT (rename) it then map to Items
    const renameNewFolder = (path: string, oldName: string, newName: string) => {
      console.log(path, oldName, newName);
      fetch(`http://localhost:3333/root/${path}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: path,
          oldName: oldName,
          newName: newName
        }),
      })
        .then((res) => res.json())
        .then((res) => setItems(res))
    };
  

  return (
    <div className="pc-wrapper">
      <NavPanel path={relativePath} backFunction={() => {
        fetchDirectory(pathBacktracer(relativePath))
        setRelativePath(pathBacktracer(relativePath))
      }} />
      <div className="filesystem-main">
        <div className="filesystem-command"></div>
        {!isInRoot && (
          <div
            className="filesystem-wrapper"
            id="directory"
            onContextMenu={handleContextMenu}
          >
            <div className="filesystem-container">
              {items && items.map((item, i) => (
                  <File
                    path={item.path}
                    title={item.title}
                    img={imgGetter(item.type)}
                    key={item.title + item.path}
                    whenSelected={() => {
                      console.log('item in map: ', item)
                      selectHandler(item)
                    }}
                    renameOnCreate={false}
                    relativePath={relativePath}
                    createNewFolder={createNewFolder}
                    setCreating={setCreating}
                    targetToEdit={targetToEdit}
                    editingTarget={editingTarget}
                    setEditingTarget={setEditingTarget}
                    renameNewFolder={renameNewFolder}
                  />
                ))}
                {
                  items && items.length === 0 && (
                    <p style={{color: '#aaa', fontSize:'0.7em', margin: 10}}>This folder is empty</p>
                  )
                }
              {creating && (
                <File 
                path={relativePath}
                targetToEdit={targetToEdit}
                img={documents} 
                title="New Folder" 
                whenSelected={null} 
                renameOnCreate={true}
                relativePath={relativePath}
                setCreating={setCreating}
                setEditingTarget={setEditingTarget}
                editingTarget={editingTarget}
                createNewFolder={(folderPath) => {
                  fetch(`http://localhost:3333/root/${folderPath}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      path: folderPath,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => console.log(res))
                    .finally(() => fetchDirectory(relativePath))
                }} 
                />
              )}
              <Menu
                style={{ zIndex: 1000000, padding: 0, margin: 0 }}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
                anchorReference="anchorPosition"
                anchorPosition={{
                  left: menuPosition.left,
                  top: menuPosition.top,
                }}
              >
                <div
                  className="context-menu"
                  style={{ border: "1px solid #ddd", padding: 0 }}
                >
                  {menuServiceType === "process" && (
                    <ContextRow
                      label="Open"
                      id="open"
                      onClickFunction={null}
                      style={"bold"}
                    />
                  )}
                  {menuServiceType === "directory" && (
                    <ContextRow
                      label="New Folder"
                      id="open"
                      onClickFunction={() => {
                        setOpenMenu(false);
                        setCreating(true);
                        () => handleCreateNewFolder(relativePath);
                      }}
                      style={"bold"}
                    />
                  )}
                  <ContextRow
                    label="Explore"
                    id="explore"
                    onClickFunction={null}
                    style={"disabled"}
                  />
                  <ContextRow
                    label="Extract files..."
                    id="explore"
                    onClickFunction={null}
                    style={"disabled"}
                  />
                  <ContextRow
                    label="Extract here"
                    id="explore"
                    onClickFunction={null}
                    style={"disabled"}
                  />
                  <ul />
                  <ContextRow
                    label="Create Shortcut"
                    id="create-shortcut"
                    onClickFunction={null}
                    style={"none"}
                  />
                  <ContextRow
                    label="Delete"
                    id="delete"
                    onClickFunction={null}
                    style={"none"}
                  />
                  <ContextRow
                    label="Rename"
                    id="rename"
                    onClickFunction={() => {
                      setOpenMenu(false)
                      setEditingTarget(true)
                    }}
                    style={"none"}
                  />
                  <ul />
                  <ContextRow
                    label="Properties"
                    id="properties"
                    onClickFunction={null}
                    style={"none"}
                  />
                </div>
              </Menu>
            </div>
          </div>
        )}
        {isInRoot && (
          <div className="file-system-home">
            <div className="filesystem-container2">
              <h5>Files Stored on This Computer</h5>
              <FileMock
                title="Shared Documents"
                img={documents}
                whenSelected={openErrorDialogue}
              />
            </div>
            <div className="filesystem-container2">
              <h5>Hard Disk Drives</h5>
              <FileMock
                title="Local Disc (C:)"
                img={hd}
                whenSelected={openErrorDialogue}
              />
            </div>
            <div className="filesystem-container2">
              <h5>Local Network</h5>
              <FileMock
                title="Node Server"
                img={network}
                whenSelected={openServer}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Computer;
