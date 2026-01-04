import { configureStore } from '@reduxjs/toolkit';
import alertSlice from './alertSlice';
import sidebarItemsSlice from './sidebarItemsSlice';

export const store = configureStore({
  reducer: {
    alert: alertSlice,
    sidebarItems: sidebarItemsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
