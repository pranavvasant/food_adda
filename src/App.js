import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminHome from "./admin/AdminHome";
import AdminLogin from "./admin/AdminLogin";
import MyNavbar from "./layout/MyNavbar";
import Login from "./login/Login";
import SignUp from "./login/SignUp";
import Welcome from "./login/Welcome";
import { CredsContextProvider } from "./store/CredsContext";
import SnackbarProvider from 'react-simple-snackbar'
import AddItem from "./admin/AddItem";

function App() {
  return (
    <CredsContextProvider>
      <SnackbarProvider>
        <Router>
          <MyNavbar/>
          <Routes>
            <Route path="/" element={<Welcome/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/admin" element={<AdminHome/>}></Route>
            <Route path="/admin/login" element={<AdminLogin/>}></Route>
            <Route path="/admin/additem" element={<AddItem/>}></Route>
            <Route path="/admin/additem/:id" element={<AddItem/>}></Route>
          </Routes>
        </Router>
      </SnackbarProvider>
    </CredsContextProvider>
  );
}

export default App;
