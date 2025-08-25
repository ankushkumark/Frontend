import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: false,
    active: "Overview",
  },
  reducers: {
    toggleSidebar(state) { state.sidebarOpen = !state.sidebarOpen; },
    closeSidebar(state) { state.sidebarOpen = false; },
    setActive(state, action) { state.active = action.payload; },
  },
});

export const { toggleSidebar, closeSidebar, setActive } = uiSlice.actions;
export default uiSlice.reducer;
