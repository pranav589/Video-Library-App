import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error?.response?.data?.err;
    return thunkAPI.rejectWithValue(message);
  }
});

//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message = error?.response?.data?.err;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get Logged User
export const getLoggedUser = createAsyncThunk(
  "auth/verify",
  async (user, thunkAPI) => {
    try {
      return await authService.getLoggedUser();
    } catch (error) {
      const message = error?.response?.data?.err;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//logout
export const logout = createAsyncThunk("auth/logout", () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getLoggedUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLoggedUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload?.Data?.user;
      })
      .addCase(getLoggedUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Something went wrong.";
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
