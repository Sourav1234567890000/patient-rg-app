import { useEffect, useState } from 'react';
import { getAllPatients } from '../../services/DB';

interface Patient {
  id: number;
  patientName: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  gender: string;
  created_at?: string;
}

function PatientData() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPatients() {
      try {
        const data = await getAllPatients();
        console.log('Fetched patients:', data); 
        setPatients(data);
      } catch (err) {
        setError('Failed to fetch patient data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>{error}</p>;
  if (patients.length === 0) return <p>No patients found.</p>;

  return (
    <div>
      <h2>All Patients</h2>
      <ul>
        {patients.map(({ id, patientName, address, email, phoneNumber, gender }) => (
          <li key={id}>
            <strong>{patientName}</strong> — {email || 'No email'} — {phoneNumber || 'No phone'} — {gender || 'No gender'} — {address || 'No address'}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientData;
