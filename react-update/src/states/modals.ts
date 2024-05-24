import { IModal, IModals } from '@/types/modal';
import { create } from 'zustand';

interface ModalsState {
  modals: IModals;
  getCurrent: () => IModal | null;
  selectCurrent: () => void;
  isActive: () => boolean;
  close: () => void;
}

export const useModalsStore = create<ModalsState>()((set, get) => ({
  modals: [],
  getCurrent: () => {
    const { modals } = get();

    if (!modals.length) return null;

    return modals[modals.length - 1];
  },
  selectCurrent: () => {
    const { modals } = get();
    let selected = false;

    for (let i = modals.length - 1; i >= 0; i--) {
      // TODO: fix this
      const { blocker } = modals[i];

      if (blocker.current) {
        blocker.current.classList.toggle('current', !selected);
        blocker.current.classList.toggle('behind', selected);
        selected = true;
      }
    }
  },
  isActive: () => get().modals.length > 0,
  close: () => set((state) => ({ modals: state.modals.splice(-1) })),
}));
