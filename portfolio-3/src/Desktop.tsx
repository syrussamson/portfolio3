import React, { useState } from "react";
import bus from "./assets/bus2.png";
import trash from "./assets/trash.ico";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
import Window from "./Window";

interface AppInterface {
  title: string;
  img: string;
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
  const [openProcesses, setOpenProcesses] = useState<string[]>([]);

  const apps: AppInterface[] = [
    { title: "Recycle Bin", img: trash },
    { title: "TTC Tracker (toronto)", img: bus },
  ];

  const handleSelectShortcut = (id: string) => {
    setSelectedShortcut(id);
  };

  const handleOpenProcess = (title: string) => {
    if (!openProcesses.includes(title)) {
      setOpenProcesses((prevProcesses) => [...prevProcesses, title]);
    }
  };

  const handlePurgeProcess = (title: string) => {
    setOpenProcesses((prevProcesses) => [
      ...prevProcesses.filter((process) => process !== title),
    ]);
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
      {openProcesses.map((process: string, index: number) => (
        <Window
          key={index}
          handlePurgeProcess={handlePurgeProcess}
          img={apps.find((app) => app.title === process)?.img || "null"}
          process={process}
        >
          {process}
        </Window>
      ))}
    </div>
  );
}

export default Desktop;
