import { useState } from "react";
import Draggable from "react-draggable";
import TTCTracker from "./apps/TTCTracker/TTCtracker";
import IE from "./apps/IE/IE";
import RecycleBin from "./apps/RecycleBin/RecycleBin";
import Notepad from "./apps/Notepad/Notepad";
import Server from "./apps/Server/Server";
import { ErrorDialogue, RelativePath } from "./Globals";
import { useAtom } from "jotai";
import Error from "./apps/Shared/Error";
 
const positionGetter = (program: string) => {
  if (program === "Toronto Transit Commission") {
    return { x: 500, y: -140 };
  }
  if (program === "Recycle Bin") {
    return { x: 300, y: -100 };
  }
  if (program === "Internet Explorer") {
    return { x: 200, y: -100 };
  }
  if (program === "Notepad") {
    return { x: 200, y: -300 };
  }
  if (program === "error") {
    return { x: 220, y: -200 };
  }
  if (program === "3D Pinball for Windows - Space Cadet") {
    return { x: 220, y: -200 };
  }
  return { x: 70, y: -379 };
};
interface WindowProcesses {
  process: string;
  minimized: boolean;
  handleZindex: (process: string) => void | undefined;
  handleMinimizeProcess: (process: string) => void;
  handlePurgeProcess: (process: string) => void;
  zIndex: number;
  img: string;
}

function Window(props: WindowProcesses) {
  const [, setFullScreen] = useState(false);
  const [relativePath] = useAtom(RelativePath);
  const [error] = useAtom(ErrorDialogue);

  return (
    <Draggable
      handle="strong"
      defaultPosition={positionGetter(props.process)}
      onStart={() => props.handleZindex(props.process)}
    >
      <div
        className={`window-root ${props.process === "error" && "error-root"}`}
        style={{
          position: "absolute",
          display: props.minimized ? "none" : "block",
          zIndex: props.zIndex,
        }}
        onDoubleClick={() => props.handleZindex(props.process)}
      >
        <strong>
          <div className="window-header-container">
            <div className="window-header">
              <div className="window-header-left">
                <img src={props.img} />
                <p className="process-text-main">
                  {props.process === "Computer"
                    ? `${props.process}/${relativePath}`
                    : props.process}
                </p>
              </div>
              <div className="window-header-right">
                <button
                  className="minimize-button"
                  onClick={() => props.handleMinimizeProcess(props.process)}
                >
                  <i className="icon bi bi-dash"></i>
                </button>
                <button
                  className="fullscreen-button"
                  onClick={() => setFullScreen((fs) => !fs)}
                >
                  <i className="icon bi bi-square"></i>
                </button>
                <button
                  className="x-button"
                  onClick={() => props.handlePurgeProcess(props.process)}
                >
                  <i className=" icon bi bi-x" />
                </button>
              </div>
            </div>
          </div>
        </strong>
        <div className="application-wrapper">
          {props.process !== "error" && (
            <div className="command-bar">
              <a>File</a>
              <a>Edit</a>
              <a>View</a>
              <a>Tools</a>
              <a>Help</a>
            </div>
          )}
          {props.process === "Toronto Transit Commission" && <TTCTracker />}
          {props.process === "Internet Explorer" && <IE />}
          {props.process === "Recycle Bin" && <RecycleBin />}
          {props.process === "Notepad" && <Notepad />}
          {props.process === "Computer" && <Server />}
          {error.open && <Error />}
        </div>
      </div>
    </Draggable>
  );
}

export default Window;
