import { create } from "zustand";

export type region = "US" | "FR" | "RU";
interface ValuesState {
  region: region;
  error: number;
  seed: number;
  page: number;
  setRegion: (r: region) => void;
  setError: (e: number) => void;
  setSeed: (e: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

const useValueStore = create<ValuesState>((set) => ({
  region: "US",
  error: 0,
  seed: 0,
  page: 0,
  setRegion: (region) => set(() => ({ region, page: 0 })),
  setError: (error) => set(() => ({ error, page: 0 })),
  setSeed: (seed) => set(() => ({ seed, page: 0 })),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
}));

export default useValueStore;
