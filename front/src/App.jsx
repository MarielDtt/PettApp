import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RegisterViews from './views/RegisterViews/RegisterViews';
import LoginViews from './views/LoginViews/LoginViews';
import NuevosTurnos from './views/NuevosTurnosViews/NuevosTurnosViews';
import MisTurnosViews from './views/MisTurnosViews/MisTurnosViews';

function App() {


  return (
    <div>
      
      <Navbar/>
          
      <Routes>    
          <Route path= "/turnos" element={<MisTurnosViews/>} />
          <Route path= "/registro" element={<RegisterViews/>}/>
          <Route path= "/" element={<LoginViews/>}/>
          <Route path= "/nuevo_turno" element= {<NuevosTurnos/>} />
      </Routes>
      
    </div>
  )
}

export default App;
