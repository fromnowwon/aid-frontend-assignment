import create from "zustand";

interface BatchState {
  isBatchActive: boolean;
  setBatchActive: (isActive: boolean) => void;
}

export const useBatchStore = create<BatchState>((set) => ({
  isBatchActive: false,
  setBatchActive: (isActive) => set({ isBatchActive: isActive }),
}));
