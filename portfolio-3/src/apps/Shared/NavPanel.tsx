import React from "react";
import up2 from "../../assets/up2.png";
import views from "../../assets/views.png";
import documents from "../../assets/documents.png";
import search from "../../assets/shell32.dll_14_23-4.png";
function NavPanel({
  path,
  backFunction,
}: {
  path: string;
  backFunction: () => void;
}) {
  return (
    <div className="browser-toolbar">
      <div className="nav-button-container back-button-container">
        <button
          className="nav-button back-button"
          style={{ background: path === "" ? "#cacaca" : "#27bb10" }}
          onClick={backFunction}
        >
          <i className="bi bi-arrow-left-short"></i>
        </button>
        <a>Back</a>
        <i className="bi bi-caret-down-fill"></i>
      </div>
      <div className="nav-button-container forward-button-container">
        <button className="nav-button forward-button">
          <i className="bi bi-arrow-right-short" />
        </button>
        <i className="b bi-caret-down-fill"></i>
      </div>
      <div className="toolbar-button divider">
        <div className="nav-button-flex">
          <img src={up2} />
          <p className="header-icon-text">up</p>
        </div>
      </div>
      <div className="nav-button-container toolbar-button">
        <div className="nav-button-flex">
          <img src={search} />
          <p className="header-icon-text">Search</p>
        </div>
      </div>
      <div className="nav-button-container divider toolbar-button">
        <div className="nav-button-flex">
          <img src={documents} />
          <p className="header-icon-text">Folders</p>
        </div>
      </div>
      <div className="nav-button-container toolbar-button">
        <div className="nav-button-flex">
          <img src={views} />
          <p className="header-icon-text">Views</p>
        </div>
      </div>
    </div>
  );
}

export default NavPanel;
