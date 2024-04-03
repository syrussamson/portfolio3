import React, { useState } from "react";
import bus from "./assets/bus2.png";
import trash from "./assets/trash.ico";
import ie from './assets/ie.ico'
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import Window from "./Window";

interface AppInterface {
  title: string;
  img: string;
}
interface Process {
  title: string;
  zIndex: number
}

function Shortcut(
  props: AppInterface & {
    selected: boolean;
    onSelect: () => void;
    openProcess: () => void;
  }
) {
  const { title, img, selected, onSelect, openProcess } = props;

  const handleClick = () => {
    onSelect();
  };
  const handleDoubleClick = () => {
    openProcess();
  };

  return (
    <Draggable>
      <div
        className={`shortcut-container ${selected && "highlighted"}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div
          className="shortcut-icon-container"
          style={{ backgroundImage: `url(${img})` }}
        />
        <p>{title}</p>
      </div>
    </Draggable>
  );
}

function Desktop() {
  const [selectedShortcut, setSelectedShortcut] = useState<string | null>(null);
  const [openProcesses, setOpenProcesses] = useState<Process[]>([]);

  const handleZindex = (processTitle: string) => {
    setOpenProcesses((prevProcesses) => {
      return prevProcesses.map((process) => {
        return {
          ...process,
          zIndex: process.title === processTitle ? process.zIndex + 1 : 0,
        };
      });
    });
  };

  const apps: AppInterface[] = [
    { title: "Recycle Bin", img: trash },
    { title: "Toronto Transit Commission", img: bus },
    { title: "Internet Explorer", img: ie },
  ];

  const handleSelectShortcut = (title: string) => {
    setSelectedShortcut(title);
  };

  const handleOpenProcess = (title: string) => {
    if (!openProcesses.find((process) => process.title === title)) {
      setOpenProcesses((prevProcesses) => [
        ...prevProcesses,
        { title: title, zIndex: 10000 },
      ]);
    }
  };

  const handlePurgeProcess = (title: string) => {
    setOpenProcesses((prevProcesses) => prevProcesses.filter((process) => process.title !== title));
  };

  return (
    <div className="desktop-root">
      {/* Desktop apps */}
      {apps.map((app: AppInterface, index: number) => (
        <Shortcut
          key={index}
          title={app.title}
          img={app.img}
          selected={selectedShortcut === app.title}
          onSelect={() => handleSelectShortcut(app.title)}
          openProcess={() => handleOpenProcess(app.title)}
        />
      ))}
      {/* Open processes */}
      {openProcesses.map((process: Process, index: number) => (
        <Window
          key={index}
          handlePurgeProcess={handlePurgeProcess}
          img={apps.find((app) => app.title === process.title)?.img || "null"}
          process={process.title}
          handleZindex={handleZindex}
          zIndex={process.zIndex}
        >
          {process.title}
        </Window>
      ))}
    </div>
  );
}



export default Desktop;
