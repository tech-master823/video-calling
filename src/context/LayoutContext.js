import { useState } from "react";
import { createContext } from "react";


const LayoutContext = createContext();

const LayoutProvider = ({ children }) => {
  const [layoutMode, setLayoutMode] = useState(1);

  const updateLayoutMode = (newMode) => {
    setLayoutMode(newMode);
  }

  return (
    <LayoutContext.Provider value={{ layoutMode, updateLayoutMode }}>
      {children}
    </LayoutContext.Provider>
  )
}

export { LayoutContext, LayoutProvider };