import React, { useState, useCallback } from 'react';
import { X, Upload, Save, User, Users, Phone, Calendar, Home, FileText, Package } from 'lucide-react';

const API_URL = 'https://eps-school-management.vercel.app';

function StudentRegister({ onBack }) {
  const [formData, setFormData] = useState({
    registrationNo: 'REG-' + Date.now(),
    studentType: '',
    class: '',
    studentName: '',
    fatherName: '',
    motherName: '',
    fatherContact1: '',
    fatherContact2: '',
    dob: '',
    dobWords: '',
    gender: '',
    admissionDate: new Date().toISOString().split('T')[0],
    feeCategory: '',
    busVan: '',
    hostel: '',
    library: '',
    smsContact: '',
    address: '',
    village: '',
    district: '',
    state: '',
    studentPhoto: null,
    fatherPhoto: null,
    remarks: ''
  });

  const [loading, setLoading] = useState(false);

  const convertDateToWords = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' :
                   day === 2 || day === 22 ? 'nd' :
                   day === 3 || day === 23 ? 'rd' : 'th';
    
    return `${day}${suffix} ${month} ${year}`;
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

const handleChange = useCallback(async (e) => {
  const { name, value, files } = e.target;
  
  if (files && files[0]) {
    try {
      const base64 = await convertToBase64(files[0]);
      setFormData(prev => ({ ...prev, [name]: base64 }));
    } catch (error) {
      alert('Error uploading file');
      console.error(error);
    }
  } else {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'dob') {
        updated.dobWords = convertDateToWords(value);
      }
      return updated;
    });
  }
}, []);

  const handleSubmit = async () => {
    if (!formData.studentName || !formData.class || !formData.fatherName || !formData.fatherContact1) {
      alert('Please fill all required fields!');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Student registered successfully!\n\nRegistration No: ' + formData.registrationNo);
        // Reset form
        setFormData({
          registrationNo: 'REG-' + Date.now(),
          studentType: '',
          class: '',
          studentName: '',
          fatherName: '',
          motherName: '',
          fatherContact1: '',
          fatherContact2: '',
          dob: '',
          dobWords: '',
          gender: '',
          admissionDate: new Date().toISOString().split('T')[0],
          feeCategory: '',
          busVan: '',
          hostel: '',
          library: '',
          smsContact: '',
          address: '',
          village: '',
          district: '',
          state: '',
          studentPhoto: null,
          fatherPhoto: null,
          remarks: ''
        });
      } else {
        const error = await response.json();
        alert('Error: ' + (error.error || 'Failed to register student'));
      }
    } catch (error) {
      alert('Error registering student');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const FormSection = ({ title, icon: Icon, children }) => (
    <div className="form-section">
      <div className="section-header">
        <Icon className="section-icon" />
        <h3>{title}</h3>
      </div>
      <div className="section-content">
        {children}
      </div>
    </div>
  );

  const InputField = ({ label, name, type = "text", required = false, disabled = false, value, placeholder = "" }) => (
    <div className="input-field">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className={disabled ? 'disabled' : ''}
      />
    </div>
  );

  const SelectField = ({ label, name, options, required = false, value }) => (
    <div className="input-field">
      <label>
        {label} {required && <span className="required">*</span>}
      </label>
      <select name={name} value={value} onChange={handleChange}>
        <option value="">Select {label}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const FileUploadField = ({ label, name, accept = "image/*" }) => (
    <div className="input-field">
      <label>{label}</label>
      <div className="file-upload">
        <input
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          className="file-input"
          id={name}
        />
        <label htmlFor={name} className="file-label">
          <Upload size={16} />
          <span>{formData[name] ? 'Photo Selected ✓' : 'Choose File'}</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="student-register">
      <div className="register-header">
        <div className="header-content">
          <User size={24} />
          <h2>Student Registration Form</h2>
        </div>
        <button onClick={onBack} className="close-btn">
          <X size={20} />
        </button>
      </div>

      <div className="register-body">
        <FormSection title="Identity Information" icon={FileText}>
          <InputField
            label="Registration No."
            name="registrationNo"
            value={formData.registrationNo}
            disabled={true}
            required
          />
          <SelectField
            label="Student Type"
            name="studentType"
            value={formData.studentType}
            options={['New', 'Old']}
            required
          />
          <SelectField
            label="Class"
            name="class"
            value={formData.class}
            options={['Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10']}
            required
          />
          <InputField
            label="Student Name"
            name="studentName"
            value={formData.studentName}
            placeholder="Full Name"
            required
          />
        </FormSection>

        <FormSection title="Family Information" icon={Users}>
          <InputField
            label="Father's Name"
            name="fatherName"
            value={formData.fatherName}
            required
          />
          <InputField
            label="Mother's Name"
            name="motherName"
            value={formData.motherName}
            required
          />
        </FormSection>

        <FormSection title="Contact Information" icon={Phone}>
          <InputField
            label="Father Contact No. 1"
            name="fatherContact1"
            type="tel"
            value={formData.fatherContact1}
            placeholder="Primary Contact"
            required
          />
          <InputField
            label="Father Contact No. 2"
            name="fatherContact2"
            type="tel"
            value={formData.fatherContact2}
            placeholder="Secondary Contact (Optional)"
          />
          <InputField
            label="SMS Contact No."
            name="smsContact"
            type="tel"
            value={formData.smsContact}
            placeholder="For notifications"
          />
        </FormSection>

        <FormSection title="Personal Information" icon={Calendar}>
          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            required
          />
          <InputField
            label="Date of Birth (In Words)"
            name="dobWords"
            value={formData.dobWords}
            disabled={true}
          />
          <SelectField
            label="Gender"
            name="gender"
            value={formData.gender}
            options={['Male', 'Female', 'Other']}
            required
          />
        </FormSection>

        <FormSection title="Administrative Details" icon={Package}>
          <InputField
            label="Date of Admission"
            name="admissionDate"
            type="date"
            value={formData.admissionDate}
            required
          />
          <SelectField
            label="Fee Category"
            name="feeCategory"
            value={formData.feeCategory}
            options={['General', 'Subsidized', 'Free', 'Special']}
            required
          />
        </FormSection>

        <FormSection title="Facilities" icon={Package}>
          <SelectField
            label="Bus/Van Service"
            name="busVan"
            value={formData.busVan}
            options={['Yes', 'No']}
          />
          <SelectField
            label="Hostel"
            name="hostel"
            value={formData.hostel}
            options={['Yes', 'No']}
          />
          <SelectField
            label="Library"
            name="library"
            value={formData.library}
            options={['Yes', 'No']}
          />
        </FormSection>

        <FormSection title="Address Information" icon={Home}>
          <div className="full-width">
            <label>
              Student Address <span className="required">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Complete residential address"
            />
          </div>
          <InputField
            label="Village/City"
            name="village"
            value={formData.village}
            required
          />
          <InputField
            label="District"
            name="district"
            value={formData.district}
            required
          />
          <InputField
            label="State"
            name="state"
            value={formData.state}
            required
          />
        </FormSection>

        <FormSection title="Upload Documents" icon={Upload}>
          <FileUploadField label="Student Photo" name="studentPhoto" />
          <FileUploadField label="Father Photo" name="fatherPhoto" />
        </FormSection>

        <div className="form-section">
          <div className="section-header">
            <FileText className="section-icon" />
            <h3>Additional Notes</h3>
          </div>
          <div className="section-content">
            <div className="full-width">
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                rows="4"
                placeholder="Any special remarks or notes about the student..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button onClick={onBack} className="btn-cancel">
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-save" disabled={loading}>
            <Save size={18} />
            {loading ? 'Saving...' : 'Register Student'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentRegister;
