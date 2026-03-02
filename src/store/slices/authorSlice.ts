import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/services/api";
import { API_ENDPOINTS } from "@/config/api";
import type { Author } from "@/types/author";

interface AuthorState {
  authors: Author[];
  loading: boolean;
  error: string | null;
  selectedAuthor: Author | null;
  total: number;
}

const initialState: AuthorState = {
  authors: [],
  loading: false,
  error: null,
  selectedAuthor: null,
  total: 0,
};

/* ===============================
   FETCH (SEARCH)
=============================== */
export const fetchAuthors = createAsyncThunk(
  "authors/fetchAll",
  async (
    params: { search?: string; page?: number; size?: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.post(
        API_ENDPOINTS.AUTHOR_SEARCH,
        params,
      );

      // Your backend returns:
      // response.data.data.data = { count, rows }

      return response.data.data.data;
    } catch (error: unknown) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

/* ===============================
   CREATE
=============================== */
export const createAuthor = createAsyncThunk(
  "authors/create",
  async (author: Partial<Author>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.AUTHORS, author);
      return response.data.data.author;
    } catch (error: unknown) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

/* ===============================
   UPDATE
=============================== */
export const updateAuthor = createAsyncThunk(
  "authors/update",
  async (
    { id, author }: { id: string; author: Partial<Author> },
    { rejectWithValue },
  ) => {
    try {
      const response = await apiClient.put(
        API_ENDPOINTS.AUTHOR_BY_ID(id),
        author,
      );
      return response.data.data.author;
    } catch (error: unknown) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

/* ===============================
   DELETE
=============================== */
export const deleteAuthor = createAsyncThunk(
  "authors/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(API_ENDPOINTS.AUTHOR_BY_ID(id));
      return id;
    } catch (error: unknown) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    setSelectedAuthor: (state, action: PayloadAction<Author | null>) => {
      state.selectedAuthor = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthors.fulfilled, (state, action: unknown) => {
        state.loading = false;
        state.authors = action.payload.rows || [];
        state.total = action.payload.count || 0;
      })
      .addCase(fetchAuthors.rejected, (state, action: unknown) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createAuthor.fulfilled, (state, action: unknown) => {
        state.authors.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateAuthor.fulfilled, (state, action: unknown) => {
        const index = state.authors.findIndex(
          (a) => a.author_id === action.payload.author_id,
        );
        if (index !== -1) {
          state.authors[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteAuthor.fulfilled, (state, action: unknown) => {
        state.authors = state.authors.filter(
          (a) => a.author_id !== action.payload,
        );
      });
  },
});

export const { setSelectedAuthor, clearError } = authorSlice.actions;
export default authorSlice.reducer;
