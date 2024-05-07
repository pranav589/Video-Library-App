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
import Subscriptions from "./pages/Subscriptions/Subscriptions";
import SubscribedChannels from "./pages/SubscribedChannels/SubscribedChannels";
import ChannelDetails from "./pages/ChannelDetails/ChannelDetails";
import MyVideos from "./pages/MyVideos/MyVideos";
import PlayListDetails from "./pages/PlayListDetails/PlayListDetails";
import History from "./pages/History/History";
import TrendingVideos from "./pages/TrendingVideos/TrendingVideos";
import Shorts from "./pages/Shorts/Shorts";

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
                  path="/channelDetails/:channelId"
                  element={<ChannelDetails />}
                />
                <Route
                  path="/uploadVideo"
                  element={
                    <PrivateRoute>
                      <VideoUpload />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/subscriptions/:userId"
                  element={
                    <PrivateRoute>
                      <Subscriptions />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/subscribedChannels"
                  element={
                    <PrivateRoute>
                      <SubscribedChannels />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/myVideos"
                  element={
                    <PrivateRoute>
                      <MyVideos />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <PrivateRoute>
                      <History />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/playList/:playListId"
                  element={
                    <PrivateRoute>
                      <PlayListDetails />
                    </PrivateRoute>
                  }
                />
                <Route path="/trending" element={<TrendingVideos />} />
                <Route path="/shorts" element={<Shorts />} />
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
