import logo from "./logo.svg";
import { Container, Main, Wrapper } from "./styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme, lightTheme } from "./utils/theme";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isSideBarOpened, setIsSideBarOpened] = useState(true);

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
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
