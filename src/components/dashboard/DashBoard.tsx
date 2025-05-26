import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './dashBoard.css';
import { getAllPatients } from '../../services/DB'
import PatientData from '../patient_data/PatientData';

interface Patient {
  id: number;
  patientName: string;
  address: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

function DashBoard() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (error) {
        console.error('Failed to fetch patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="outer-Db-page">
      <div className="header-title">
        <h1>DashBoard</h1>
        <span>
          <p>Welcome to MedicBlocks, your patient registration system</p>
        </span>
      </div>

      <div className="pat-div-style pat-count">
        <div className="tot-pat">
          <Link to="/registerpatientdata">
            <h3>Total Patients</h3>
          </Link>
        </div>
        <div className="patient-count">
          <span>{loading ? 'Loading...' : patients.length}</span>
        </div>
      </div>

      {/* <div>
        <h2>All Patients</h2>
        {loading ? (
          <p>Loading patients...</p>
        ) : patients.length === 0 ? (
          <p>No patients registered yet.</p>
        ) : (
          <ul>
            {patients.map((patient) => (
              <li key={patient.id}>
                {patient.patientName} — {patient.email} — {patient.phoneNumber}
              </li>
            ))}
          </ul>
        )}
      </div> */}

      <div className="other-tabs">
        <Link to={"/register"}>
          <div className="Rg-other-tabs Rg-pat pat-div-style">
            <span>Register patients</span>
          </div>
        </Link>
        {/* <div className="Rg-other-tabs query-rec pat-div-style">
          <span>Register patients</span>
        </div>

        <div className="Rg-other-tabs db-stat pat-div-style">
          <span>Register patients</span>
        </div> */}
      </div>
    </div>
  );
}

export default DashBoard;
