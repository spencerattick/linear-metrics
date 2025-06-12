"use client";

import { LinearTicket } from "@/lib/types";
import React, { createContext, useState } from "react";

type LinearContextType = {
    linearData: LinearTicket[] | null;
}

//update the name to reflect what kind of data is being stored
export const LinearContext = createContext<LinearContextType | null>(null);

type LinearContextProviderProps = {
  children: React.ReactNode;
  data: LinearTicket[] | null;
};

export default function LinearContextProvider({
  children,
  data
}: LinearContextProviderProps) {
  // state
  const [linearData] = useState(data);

  // derived state

  // event handlers

  return (
    <LinearContext.Provider
      value={{
        linearData
      }}
    >
      {children}
    </LinearContext.Provider>
  );
}
