import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Course from './pages/Course';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
 
function App() {
 
  return (
    <Router>
      <div>
        <section>                              
            <Routes>                                                                        <Route path="/" element={<Home/>}/>
               <Route exact path="/" element={<Home/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
               <Route path="/course" element={<Course/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}
 
export default App;