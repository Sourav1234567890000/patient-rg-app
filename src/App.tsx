import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './components/dashboard/DashBoard'
// import Header from './components/dashboard/Header'
import RegistrationForm from './components/registration_form/RegistrationForm'
import { DbProvider } from './context/DbContext';
import PatientData from './components/patient_data/PatientData';


function App() {

  return (
    <>
      <DbProvider>
        <Router>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/register/patientdata" element={<PatientData/>} />
          </Routes>
        </Router>
      </DbProvider>
    </>
  )
}

export default App
