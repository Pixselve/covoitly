import { twc } from "react-twc";
import { Rowdies } from "next/font/google";
const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });
export default twc.h1`text-5xl ${rowdies.className}`;
