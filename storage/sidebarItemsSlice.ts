import { ISidebarItem } from '@/utils/interfaces';
import { TrophyIcon } from '@heroicons/react/24/solid';
import { createSlice } from '@reduxjs/toolkit';

interface SidebarItemsState {
  items: ISidebarItem[];
}

const initialState: SidebarItemsState = {
  items: [],
};

const sidebarItemsSlice = createSlice({
  name: 'sidebarItems',
  initialState,
  reducers: {
    setSidebarItems: (state, action: { payload: ISidebarItem[] }) => {
      state.items = action.payload;
    },
    addSidebarItem: (state, action: { payload: ISidebarItem }) => {
      state.items.push(action.payload);
    },
    removeSidebarItem: (state, action: { payload: { href: string } }) => {
      state.items = state.items.filter(item => item.href !== action.payload.href);
    },
  },
});

export const { setSidebarItems, addSidebarItem, removeSidebarItem } = sidebarItemsSlice.actions;
export default sidebarItemsSlice.reducer;