import { createContext, type RefObject } from 'react';

export type MenubarContextValue = {
  rootRef: RefObject<HTMLDivElement | null>;
  /** The id of the menu that is open, if any. */
  openId: string | null;
  setOpenId: (id: string | null) => void;
};

export const MenubarContext = createContext<MenubarContextValue | null>(null);
