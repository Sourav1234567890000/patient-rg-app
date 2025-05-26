import React, { useState } from 'react';
import './registrationForm.css';
import { useDatabaseContext } from '../../context/DbContext';
import { useNavigate } from 'react-router-dom';

// Define the shape of form data
interface IFormInput {
  patientName: string;
  address: string;
  email: string;
  phoneNumber: string;
  gender: string;
}

const initialFormData: IFormInput = {
  patientName: '',
  address: '',
  email: '',
  phoneNumber: '',
  gender: '',
};

const PatientRegistration: React.FC = () => {
  const { isInitialized } = useDatabaseContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IFormInput>(initialFormData);
  const [errors, setErrors] = useState<Partial<IFormInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<IFormInput> = {};

    if (!formData.patientName.trim()) newErrors.patientName = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Enter a valid 10-digit number';
    if (!formData.gender || formData.gender === 'select')
      newErrors.gender = 'Select a gender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const registerPatient = async (data: IFormInput) => {
    console.log('Registering patient:', data);
    // TODO: Insert into database here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await registerPatient(formData);
      setSubmitSuccess(true);
      setFormData(initialFormData);
      setTimeout(() => {
        setSubmitSuccess(false);
        navigate('/register/patientdata');
      }, 2000);

    } catch (error) {
      console.error('Error registering patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isInitialized) return <div>Loading database...</div>;

  return (
    <div className="outer-body">
      <div className="inner-body-titl">
        <h1>Registration form</h1>
      </div>
      <div className="inner-body-cont">
        <form className="RG-form" onSubmit={handleSubmit}>
          <div className="RG-form-item">
            <label className="RG-form-label">Patient Name</label>
            <input
              name="patientName"
              type="text"
              className="RG-form-input"
              value={formData.patientName}
              onChange={handleChange}
            />
            {errors.patientName && <p className="error">{errors.patientName}</p>}
          </div>

          <div className="RG-form-item">
            <label className="RG-form-label">Address</label>
            <input
              name="address"
              type="text"
              className="RG-form-input"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="RG-form-item">
            <label className="RG-form-label">Email</label>
            <input
              name="email"
              type="email"
              className="RG-form-input"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="RG-form-item">
            <label className="RG-form-label">Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              className="RG-form-input"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>

          <div className="RG-form-item">
            <label className="RG-form-label">Gender</label>
            <select
              name="gender"
              className="RG-form-input"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="select">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          <div className="RG-form-item">
            <button className="button-86 RG-form-but-sm" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
            {submitSuccess && <p className="success-msg">Patient registered successfully!</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
