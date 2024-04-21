import { useAtom } from "jotai";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { ErrorDialogue, RelativePath } from "../../Globals";
import NavPanel from "../Shared/NavPanel";
import { FileTemplate as FileMock } from "../Shared/FileTemplate";
import File from "../Shared/FileFunctions";
import documents from "../../assets/documents.png";
import hd from "../../assets/harddrive.png";
import network from "../../assets/network.ico";
import pc from "../../assets/network.png";
import globe from "../../assets/globe.webp";
import { Menu } from "@mui/material";
import file from "../../assets/txt.png";

const pathBacktracer = (path: string) => {
  console.log(path);
  const pathArray = path.split("/");
  if (pathArray.length === 1) {
    return "";
  }
  pathArray.pop();
  return pathArray.join("/");
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
  onClickFunction: MouseEventHandler<HTMLButtonElement> | undefined;
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

function Server() {
  const [, setError] = useAtom(ErrorDialogue);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuServiceType, setMenuServiceType] = useState<string | null>(null);
  const [isInRoot, setIsInRoot] = useState(true);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
  const [relativePath, setRelativePath] = useAtom(RelativePath);
  const [items, setItems] = useState<Item[] | undefined>();
  const [creating, setCreating] = useState(false);
  const [targetToEdit, setTargetToEdit] = useState<Item | undefined>();
  const [editingTarget, setEditingTarget] = useState(false);

  const openServer = () => {
    setIsInRoot(false);
  };
  useEffect(() => {
    fetchDirectory(relativePath);
  }, [relativePath]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setMenuPosition({ left: e.clientX, top: e.clientY });
    setOpenMenu(true);
    setMenuServiceType((e.target as HTMLDivElement).id);
    console.log(e.target);
    const itemTarget = items?.find(
      (item) =>
        (e.target as HTMLImageElement).alt === item.path ||
        (e.target as HTMLDivElement).id === item.path
    );
    if (itemTarget) {
      console.log("target to edit: ", itemTarget);
      setTargetToEdit(itemTarget);
    }
  };

  const handleCreateNewFolder = (dir: string) => {
    createNewFolder(dir);
  };

  const selectHandler = (item: Item) => {
    console.log("select handler: ", item);
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

  const createNewFolder = (path: string) => {
    fetch(`http://localhost:3333/root/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: path,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .finally(() => fetchDirectory(relativePath));
  };

  // DELETE it then map to Items
  const deleteFolder = (path: string) => {
    console.log(path);
    fetch(`http://localhost:3333/root/${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .finally(() => fetchDirectory(relativePath));
  };

  // PUT (rename) it then map to Items
  const renameFolder = (path: string, oldName: string, newName: string) => {
    console.log("Request Body:", {
      path: path,
      oldName: oldName,
      newName: newName,
    });
    fetch(`http://localhost:3333/root/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: path,
        oldName: oldName,
        newName: newName,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .finally(() => fetchDirectory(relativePath));
  };

  return (
    <div className="pc-wrapper">
      <NavPanel
        path={relativePath}
        backFunction={() => {
          fetchDirectory(pathBacktracer(relativePath));
          setRelativePath(pathBacktracer(relativePath));
        }}
      />
      <div className="filesystem-main">
        <div className="filesystem-command">
          <div className="rc-commands">
            <div className="command-container-wrapper">
              <div className="command-container tasks-container">
                <div className="command-header">
                  <p>File and Folder Tasks</p>
                  <button className="arrow-button">»</button>
                </div>
                <div className="command-row">
                  <div
                    onDoubleClick={() => {
                      setError({
                        open: true,
                        text: "Access denied.",
                      });
                    }}
                  >
                    <img src={network} />
                    <p>Publish the folder</p>
                  </div>
                  <div
                    onDoubleClick={() => {
                      setError({
                        open: true,
                        text: "Sharing access denied.",
                      });
                    }}
                  >
                    <img
                      src={globe}
                      style={{ transform: "rotate(180deg) scale(0.7)" }}
                    />
                    <p>Share the folder</p>
                  </div>
                </div>
              </div>
              <div className="command-container places-container">
                <div className="command-header">
                  <p>Other Places</p>
                  <button className="arrow-button">»</button>
                </div>
                <div className="command-row">
                  <div
                    onDoubleClick={() => {
                      setError({
                        open: true,
                        text: "Access denied.",
                      });
                    }}
                  >
                    <img src={pc} />
                    <p>My Network</p>
                  </div>
                  <div
                    onDoubleClick={() => {
                      setError({
                        open: true,
                        text: "C:\\ Access denied.",
                      });
                    }}
                  >
                    <img src={documents} />
                    <p>My Documents</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {!isInRoot && (
          <div
            className="filesystem-wrapper"
            id="directory"
            onContextMenu={handleContextMenu}
          >
            <div className="filesystem-container">
              {items &&
                items.map((item) => (
                  <File
                    path={item.path}
                    title={item.title}
                    img={imgGetter(item.type)}
                    key={item.title + item.path}
                    whenSelected={() => {
                      selectHandler(item);
                    }}
                    renameOnCreate={false}
                    relativePath={relativePath}
                    createNewFolder={createNewFolder}
                    setCreating={setCreating}
                    targetToEdit={targetToEdit}
                    editingTarget={editingTarget}
                    setEditingTarget={setEditingTarget}
                    renameNewFolder={renameFolder}
                    deleteFolder={deleteFolder}
                  />
                ))}

              {creating && (
                <File
                  renameNewFolder={renameFolder}
                  path={relativePath}
                  targetToEdit={targetToEdit}
                  img={documents}
                  title="New Folder"
                  whenSelected={undefined}
                  renameOnCreate={true}
                  relativePath={relativePath}
                  setCreating={setCreating}
                  setEditingTarget={setEditingTarget}
                  editingTarget={editingTarget}
                  deleteFolder={deleteFolder}
                  createNewFolder={createNewFolder}
                  
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
                      onClickFunction={undefined}
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
                    onClickFunction={undefined}
                    style={"disabled"}
                  />
                  <ContextRow
                    label="Extract files..."
                    id="explore"
                    onClickFunction={undefined}
                    style={"disabled"}
                  />
                  <ContextRow
                    label="Extract here"
                    id="explore"
                    onClickFunction={undefined}
                    style={"disabled"}
                  />
                  <ul />
                  <ContextRow
                    label="Create Shortcut"
                    id="create-shortcut"
                    onClickFunction={undefined}
                    style={"none"}
                  />
                  <ContextRow
                    label="Delete"
                    id="delete"
                    onClickFunction={() => {
                      setOpenMenu(false);
                      deleteFolder(targetToEdit?.path || "");
                    }}
                    style={"none"}
                  />
                  <ContextRow
                    label="Rename"
                    id="rename"
                    onClickFunction={() => {
                      setOpenMenu(false);
                      setEditingTarget(true);
                    }}
                    style={"none"}
                  />
                  <ul />
                  <ContextRow
                    label="Properties"
                    id="properties"
                    onClickFunction={undefined}
                    style={"none"}
                  />
                </div>
              </Menu>
            </div>
          </div>
        )}
        {isInRoot && (
          <div className="file-system-home">
            <div
              className="filesystem-container2 "
              onDoubleClick={() => {
                setError({
                  open: true,
                  text: "C:\\Shared Documents\\ Access denied.",
                });
              }}
            >
              <h5>Files Stored on This Computer</h5>
              <FileMock
                title="Shared Documents"
                img={documents}
                whenSelected={() =>
                  setError({
                    open: true,
                    text: "Access denied.",
                  })
                }
              />
            </div>
            <div
              className="filesystem-container2"
              onDoubleClick={() => {
                setError({
                  open: true,
                  text: "C:\\ Access denied.",
                });
              }}
            >
              <h5>Hard Disk Drives</h5>
              <FileMock
                title="Local Disc (C:\)"
                img={hd}
                whenSelected={() =>
                  setError({
                    open: true,
                    text: "Local Disc (C:\\ Access Deined.",
                  })
                }
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

export default Server;
