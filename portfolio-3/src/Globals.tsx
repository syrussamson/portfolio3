import { atom } from "jotai";
import { Process } from "./Desktop";

export const OpenProcesses = atom<Process[] | []>([]);
export const IsConnected = atom<boolean>(false);
export const StartButtonIsOpen = atom<boolean>(false);
export const RelativePath = atom<string>("");
export const ErrorDialogue = atom<{ open: boolean; text: string }>({
  open: false,
  text: "",
});
