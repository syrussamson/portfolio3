import { useAtom } from "jotai";
import React, { useState } from "react";
import { OpenProcesses } from "../../Globals";
import NavPanel from "../Shared/NavPanel";
import { FileTemplate as File } from "../Shared/FileTemplate";
import documents from "../../assets/documents.png";
import hd from "../../assets/harddrive.png";

function Computer() {
  const [openProcesses, setOpenProcesses] = useAtom(OpenProcesses);
  const [error, setError] = useState<boolean>(false);

  const openErrorDialogue = () => {
    setError(true);
  };
  return (
    <div className="pc-wrapper">
      <NavPanel />
      <div className="filesystem-main">
        <div className="filesystem-command">

        </div>
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
            title="Network"
            img={documents}
            whenSelected={openErrorDialogue}
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default Computer;
