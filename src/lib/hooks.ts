import { LinearContext } from "@/contexts/linear-context-provider";
import { useContext } from "react";


export function useLinearContext() {
    const context = useContext(LinearContext);
  
    if (!context) {
      throw new Error("useLinearContext must be used within a LinearContextProvider");
    }
    return context;
  }