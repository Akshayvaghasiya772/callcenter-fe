'use client';

import { UserCircleIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

export default function Members() {
  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    role: '',
    email: '',
    phone: '',
    password: '',
    otp: '',
    address: '',
    photo: null,
    joiningDate: '',
    companyMobileNo: '',
    personalInfo: {
      AdharCard: null,
      PanCard: null,
      workExperienceCertificate: null,
      signature: null,
      workExperience: '',
      workExperienceDescription: '',
      lastCompanyWhereYouWork: '',
    },
    bankDetail: {
      fullName: '',
      ifscCode: '',
      accountNumber: '',
      branch: '',
      bankName: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      bankDetail: {
        ...prev.bankDetail,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handlePersonalFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: files[0],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Member Details</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: 'Name', name: 'name' },
          { label: 'Branch', name: 'branch' },
          { label: 'Role', name: 'role' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone', name: 'phone' },
          { label: 'Joining Date', name: 'joiningDate', type: 'date' },
          { label: 'Company Mobile No', name: 'companyMobileNo' },
        ].map(({ label, name, type = 'text' }) => (
          <div key={name} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:pt-1.5">
              {label}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                id={name}
                name={name}
                type={type}
                onChange={handleChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
        <label className="block text-sm font-medium text-gray-900 sm:pt-1.5">Work Experience</label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <label className="mr-4"><input type="radio" name="workExperience" value="yes" onChange={handlePersonalChange} /> Yes</label>
          <label><input type="radio" name="workExperience" value="no" onChange={handlePersonalChange} /> No</label>
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
        <label htmlFor="lastCompanyWhereYouWork" className="block text-sm font-medium text-gray-900 sm:pt-1.5">Last Company Where You Worked</label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <input
            id="lastCompanyWhereYouWork"
            name="lastCompanyWhereYouWork"
            type="text"
            onChange={handlePersonalChange}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 sm:max-w-xs sm:text-sm"
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
        <label htmlFor="workExperienceDescription" className="block text-sm font-medium text-gray-900 sm:pt-1.5">Work Experience Description</label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="remark"
                  name="remark"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-2xl sm:text-sm/6"
                  defaultValue={''}
                />
                <p className="mt-3 text-sm/6 text-gray-600">Write a Remark.</p>
              </div>
      </div>
      
    

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label htmlFor="remark" className="block text-sm/6 font-medium text-gray-900 sm:pt-1.5">
                Street Address
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <textarea
                  id="remark"
                  name="remark"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:max-w-2xl sm:text-sm/6"
                  defaultValue={''}
                />
                <p className="mt-3 text-sm/6 text-gray-600">Write a Remark.</p>
              </div>
            </div>
      
      <h3 className="text-lg font-semibold">Personal Information</h3>
      {['photo','AdharCard', 'PanCard', 'workExperienceCertificate', 'signature'].map((field) => (
        <div key={field} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
          <label htmlFor={field} className="block text-sm font-medium text-gray-900 sm:pt-1.5">
            {field.replace(/([A-Z])/g, ' $1')}
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              id={field}
              name={field}
              type="file"
              accept="image/*"
              onChange={handlePersonalFileChange}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      ))}
      
      <h3 className="text-lg font-semibold">Bank Details</h3>
      {['fullName', 'ifscCode', 'accountNumber', 'branch', 'bankName'].map((field) => (
        <div key={field} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
          <label htmlFor={field} className="block text-sm font-medium text-gray-900 sm:pt-1.5">
            {field.replace(/([A-Z])/g, ' $1')}
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              id={field}
              name={field}
              type="text"
              onChange={handleBankChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>
      ))}
      
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
    </form>
  );
}
