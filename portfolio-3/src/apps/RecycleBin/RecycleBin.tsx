import React from "react";

function RecycleBin() {
  return (
    <>
      <div className="rc-wrapper">
        <div className="browser-toolbar">
          <div className="nav-button-container back-button-container">
            <button className="nav-button back-button">
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
        </div>
      </div>
      <div className="rc-main row">
        <div className="rc-commands">
            <div className="command-container tasks-container">
                <div className="command-header">
                    <p>Recycle Bin Tasks</p>
                </div>
            </div>
            <div className="command-container places-container">
                <div className="command-header">

                </div>

            </div>
        </div>
        <div className="rc-window"></div>
      </div>
    </>
  );
}

export default RecycleBin;
