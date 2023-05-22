import { Container, Main, Wrapper } from "./styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./utils/theme";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoggedUser } from "./redux/features/auth/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register/Register";
import VideoUpload from "./pages/VideoUpload/VideoUpload";
import VideoDetail from "./pages/VideoDetail/VideoDetail";

function App() {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpened, setIsSideBarOpened] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(getLoggedUser());
    }
  }, [dispatch, token]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Sidebar
            isSideBarOpened={isSideBarOpened}
            setIsSideBarOpened={setIsSideBarOpened}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
          />
          <Main>
            <Header setIsSideBarOpened={setIsSideBarOpened} />
            <Wrapper>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/video/:videoId" element={<VideoDetail />} />
                <Route
                  path="/uploadVideo"
                  element={
                    <PrivateRoute>
                      <VideoUpload />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/myVideos"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <ToastContainer />
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
