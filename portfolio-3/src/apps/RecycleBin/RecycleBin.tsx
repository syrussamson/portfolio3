import bin from "../../assets/trash.ico";
import up from "../../assets/up.png";
import pc from "../../assets/mypc.png";
import documents from "../../assets/documents.png";
import NavPanel from "../Shared/NavPanel";
import { useAtom } from "jotai";
import { ErrorDialogue } from "../../Globals";
function RecycleBin() {
  const [_, setError] = useAtom(ErrorDialogue);
  return (
    <>
      <div className="rc-wrapper">
        <NavPanel backFunction={undefined} path={undefined} />
      </div>
      <div className="rc-main row">
        <div className="rc-commands">
          <div className="command-container tasks-container">
            <div className="command-header">
              <p>Recycle Bin Tasks</p>
              <button className="arrow-button">»</button>
            </div>
            <div className="command-row">
              <div
                onDoubleClick={() => {
                  setError({
                    open: true,
                    text: "Cannot Empty Recycle Bin. Access denied.",
                  });
                }}
              >
                <img src={bin} />
                <p>Empty the Recycle Bin</p>
              </div>
              <div
                onDoubleClick={() => {
                  setError({
                    open: true,
                    text: "Cannot Restore Items. Access denied.",
                  });
                }}
              >
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
              <div
                onDoubleClick={() => {
                  setError({
                    open: true,
                    text: "C:\\ Access denied.",
                  });
                }}
              >
                <img src={pc} />
                <p>My Computer</p>
              </div>
              <div
                onDoubleClick={() => {
                  setError({
                    open: true,
                    text: "C:\\My Documents\\ Access denied.",
                  });
                }}
              >
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
