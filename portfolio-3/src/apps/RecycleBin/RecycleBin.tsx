import React from "react";
import bin from "../../assets/trash.ico";
import up from "../../assets/up.png";
import up2 from "../../assets/up2.png";
import views from "../../assets/views.png";
import pc from "../../assets/mypc.png";
import documents from "../../assets/documents.png";
import search from "../../assets/shell32.dll_14_23-4.png";
import NavPanel from "../Shared/NavPanel";
function RecycleBin() {
  return (
    <>
      <div className="rc-wrapper">
        <NavPanel />
      </div>
      <div className="rc-main row">
        <div className="rc-commands">
          <div className="command-container tasks-container">
            <div className="command-header">
              <p>Recycle Bin Tasks</p>
              <button className="arrow-button">»</button>
            </div>
            <div className="command-row">
              <div>
                <img src={bin} />
                <p>Empty the Recycle Bin</p>
              </div>
              <div>
                <img
                  src={up}
                  style={{ transform: "rotate(180deg) scale(0.7)" }}
                />
                <p>Restore all items</p>
              </div>
            </div>
          </div>
          <div className="command-container places-container">
            <div className="command-header">
              <p>Other Places</p>
              <button className="arrow-button">»</button>
            </div>
            <div className="command-row">
              <div>
                <img src={pc} />
                <p>My Computer</p>
              </div>
              <div>
                <img src={documents} />
                <p>My Documents</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rc-window"></div>
      </div>
    </>
  );
}

export default RecycleBin;
