import { atom } from "jotai";
import { Process } from "./Desktop";

export const OpenProcesses = atom<Process[] | []>([])
