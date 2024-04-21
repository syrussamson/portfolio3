import { useEffect, useState } from "react";
import start1 from "./assets/start1.png";
import start2 from "./assets/start2.png";
import sound from "./assets/sound.png";
import { OpenProcesses, StartButtonIsOpen } from "./Globals";
import { useAtom } from "jotai";
import trash from './assets/trash.ico'
import ttc from './assets/bus.png'
import ie from './assets/ie.ico'
import np from './assets/NOTEPAD.EXE_14_2-3.png'
import comp from './assets/mypc.png'
import mail from './assets/sendmail.dll_14_2001-3.png'
import documents from './assets/documents.png'
import gobutton from './assets/gobutton.png'
import menupic from './assets/menu-pic.png'
const LeftSideItem = ({
  icon,
  title,
  isAllPrograms,
}: {
  icon: string;
  title: string;
  isAllPrograms: boolean;
}) => {
  return (
    <div className={`left-item-parent ${isAllPrograms ? 'all-programs-parent' : ''}`}>
      <div className="left-item-container">
        {isAllPrograms ? (
<>
</>        ) : (
          <img className="left-item-icon" src={icon} />
        )}
      </div>
      <span className={`left-item-text ${isAllPrograms && 'all-program-item'}`} style={{
        fontWeight: isAllPrograms ? "900" : ''
        }}>{title}</span>
      <div className="left-item-container">
        {!isAllPrograms ? (
          <div className="is-all-programs" />
        ) : (
          <img className="left-item-icon" src={icon} />
        )}
      </div>
    </div>
  );
};

function Taskbar() {
  const [openProcesses, setOpenProcesses] = useAtom(OpenProcesses);
  const [time, setTime] = useState(new Date());
  const [startButtonIsOpen, setStartButtonIsOpen] = useAtom(StartButtonIsOpen);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="taskbar-container">
      <div className="taskbar-left">
        <div className="start-container">
          <button
            className="start-button"
            onClick={() => setStartButtonIsOpen((p) => !p)}
          >
            <img src={startButtonIsOpen ? start2 : start1} />
          </button>
        </div>
        {startButtonIsOpen && (
          <div className="start-button-root">
            <div className="start-button-header">Sy</div>
            <div className="start-button-main container-fluid">
              <div className="start-button-row row">
                <div className="col-6 menu-left">
                  <LeftSideItem
                    title="Recycle Bin"
                    icon={trash}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="TTC"
                    icon={ttc}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="Internet Explorer"
                    icon={ie}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="Notepad"
                    icon={np}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="Computer"
                    icon={comp}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="My Documents"
                    icon={documents}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="E-Mail"
                    icon={mail}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="All Programs"
                    icon={gobutton}
                    isAllPrograms={true}
                  />
                  <div className="all-programs">
                    
                  </div>
                </div>
                <div className="col-6 menu-right"></div>
                <img className='menu-pic' src={menupic} />
              </div>
            </div>
          </div>
        )}
        <div className="minimized-items">
          {openProcesses &&
            openProcesses.map((process) => (
              <button
                key={process.title}
                id={process.title}
                onClick={(e) =>
                  setOpenProcesses((prevProcesses) =>
                    prevProcesses.map((p) =>
                      p.title === (e.target as HTMLElement).id
                        ? { ...p, minimized: !p.minimized }
                        : p
                    )
                  )
                }
                className={`process-container ${
                  process.minimized && "minimized"
                }`}
              >
                <img className="process-img" src={process.img} />
                {process.title}
              </button>
            ))}
        </div>
      </div>
      <div className="control-panel-container">
        <img src={sound} className="sound-icon" />
        <p className="clock">
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
    </div>
  );
}

export default Taskbar;
