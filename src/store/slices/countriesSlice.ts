import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/services/api";

export const fetchCountries = createAsyncThunk(
  "countries/fetchAll",
  async () => {
    const res = await apiClient.post("/general/countries");
    return [res.data.data];
  },
);

const countrySlice = createSlice({
  name: "countries",
  initialState: {
    countries: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      });
  },
});

export default countrySlice.reducer;
