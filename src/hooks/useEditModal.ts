import { create } from "zustand";

interface IEditModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditModal = create<IEditModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditModal;
