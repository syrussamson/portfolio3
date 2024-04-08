import React, { memo, useEffect, useMemo, useState } from "react";
import windows from "./assets/windows.png";
import start1 from "./assets/start1.png";
import start2 from "./assets/start2.png";
import sound from "./assets/sound.png";
import { OpenProcesses, StartButtonIsOpen } from "./Globals";
import { useAtom } from "jotai";

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
    <div className="left-item-parent">
      <div className="left-item-container">
        {isAllPrograms ? (
          <div className="is-all-programs" />
        ) : (
          <img className="left-item-icon" src={icon} />
        )}
      </div>
      <p className="left-item-text">{title}</p>
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

    // Clear interval on unmount
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
            <div className="start-button-header">header</div>
            <div className="start-button-main container-fluid">
              <div className="start-button-row row">
                <div className="col-6">
                  <LeftSideItem
                    title="hello"
                    icon={start1}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="hello"
                    icon={start1}
                    icon={start1}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="hello"
                    icon={start1}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="hello"
                    icon={start1}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="hello"
                    icon={start1}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="hello"
                    icon={start1}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="hello"
                    icon={start1}
                    isAllPrograms={false}
                  />
                  <LeftSideItem
                    title="All Programs"
                    icon={null}
                    isAllPrograms={true}
                  />
                  <div className="all-programs"></div>
                </div>
                <div className="col-6"></div>
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
