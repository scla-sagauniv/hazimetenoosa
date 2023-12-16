import { create } from 'zustand'

type State = {
    selected: boolean;
};

type Action = {
    setSelected: (by: boolean) => void;
}

export const useStore = create<State & Action>()((set) => ({
    selected: false,
    setSelected: (by) => set((state) => ({ selected: state.selected = by })),
}))