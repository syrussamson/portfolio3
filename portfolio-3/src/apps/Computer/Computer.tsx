import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { OpenProcesses } from "../../Globals";
import NavPanel from "../Shared/NavPanel";
import FileTemplate, { FileTemplate as File } from "../Shared/FileTemplate";
import documents from "../../assets/documents.png";
import hd from "../../assets/harddrive.png";
import network from "../../assets/network.ico";
import { Menu } from "@mui/material";

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
          cursor: style === 'disabled' ? 'default' : ''
        }}
      >
        {label}
      </p>
    </button>
  );
}




const fetchDirectory = (path: string) => {
  fetch(`http://localhost:3333/root/${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => console.log(res))
      .then((res) => console.log(res));
}

const createNewFolder = (path: string) => {
  console.log(path)
  fetch(`http://localhost:3333/root/${path}`, {
    method: "POST", 
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      path: path
    })
  })
  .then((res) => res)
  .then((res) => console.log(res))
  .finally(() => fetchDirectory(path))
}


function Computer() {
  const [openProcesses, setOpenProcesses] = useAtom(OpenProcesses);
  const [error, setError] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuServiceType, setMenuServiceType] = useState<string | null>(null);
  const [isInRoot, setIsInRoot] = useState(true);
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
  const [relativePath, setRelativePath] = useState('')
  const [creating, setCreating] = useState(false)
  const openErrorDialogue = () => {
    setError(true);
  };

  const openServer = () => {
    setIsInRoot(false);
  };

  useEffect(() => {
    fetchDirectory(relativePath)
  }, [relativePath]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuPosition({ left: e.clientX, top: e.clientY });
    setOpenMenu(true);
    setMenuServiceType(e.target.id);
  };

  const handleClose = () => {
    setOpenMenu(false);
  };

  return (
    <div className="pc-wrapper">
      <NavPanel />
      <div className="filesystem-main">
        <div className="filesystem-command"></div>
        {isInRoot && (
          <div className="file-system-wrapper">
            <div className="filesystem-container">
              <h5>Files Stored on This Computer</h5>
              <File
                title="Shared Documents"
                img={documents}
                whenSelected={openErrorDialogue}
              />
            </div>
            <div className="filesystem-container">
              <h5>Hard Disk Drives</h5>
              <File
                title="Local Disc (C:)"
                img={hd}
                whenSelected={openErrorDialogue}
              />
            </div>
            <div className="filesystem-container">
              <h5>Local Network</h5>
              <File
                title="Node Server"
                img={network}
                whenSelected={openServer}
              />
            </div>
          </div>
        )}
        {!isInRoot && (
          <div
            className="filesystem-wrapper"
            id="directory"
            onContextMenu={handleContextMenu}
          >
            <div className="filesystem-container">
              {
                creating && (
                  <File img={documents} title={"New Folder"} />
                )
              }
              <Menu
                style={{ zIndex: 1000000, padding: 0, margin: 0 }}
                open={openMenu}
                onClose={handleClose}
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
                  {
                    menuServiceType === "process" && (
                      <ContextRow
                      label="Open"
                      id="open"
                      onClickFunction={null}
                      style={"bold"}
                    />
                    )
                  }
                  {
                    menuServiceType === "directory" && (
                      <ContextRow
                      label="New Folder"
                      id="open"
                      onClickFunction={() => {
                        setOpenMenu(false)
                        setCreating(true)
                      }}
                      style={"bold"}
                    />
                    )
                  }
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
                    onClickFunction={null}
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
      </div>
    </div>
  );
}

export default Computer;
