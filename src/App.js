import NavBar from '../src/components/NavBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Course from './pages/Course';
import Module from './pages/Module';
import MyStudents from './pages/MyStudents';
import Chat from './pages/Chat';
import Progress from './pages/progress';
import Feedback from './pages/Feedback';
import UserDetails from './pages/UserDetails';
import ContactUs from './pages/ContactUs';
import useAuth from "../src/pages/CurrentUser";
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 
function App() {

  const { currentUser } = useAuth();

  return (
    <Router>
      <div>
      {currentUser && <NavBar />}
        <section>                              
            <Routes>
               <Route exact path="/" element={<Home/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
               <Route path="/course" element={<Course />}/>
               <Route path="/course/:moduleTitle" element={<Module/>}/>
               <Route path="/chat" element={<Chat />}/>
               <Route path="/progress" element={<Progress />}/>
               <Route path="/feedback" element={<Feedback />}/>
               <Route path="/userdetails" element={<UserDetails />}/>
               <Route path="/mystudents" element={<MyStudents />}/>
               <Route path="/contactUs" element={<ContactUs />}/>
            </Routes>               
        </section>
      </div>
    </Router>
  );
}
 
export default App;