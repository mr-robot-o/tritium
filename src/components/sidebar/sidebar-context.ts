import { createContext, useContext } from 'react';

export type SidebarContextValue = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** Toggles the sidebar: the sheet on small screens, expanded/collapsed otherwise. */
  toggleSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextValue | null>(null);

/** Reads and controls the sidebar from inside a `SidebarProvider`. */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used inside a <SidebarProvider>.');
  return context;
}

