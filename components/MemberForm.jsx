import {useState} from "react";
import axios from 'axios';
import { showToast } from "./ToastComponent";
// import { showToast } from '@/components/ToastComponent';
const MemberForm = () => {
  const [memberDetails, setMemberDetails] = useState({
    name: "",
    branch: "",
    email: "",
    phone: "",
    joiningDate: "",
    companyMobileNo: "",
  });

  const [workExperience, setWorkExperience] = useState({
    workExperience:false,
    lastCompanyWhereYouWork: "",
    workExperienceDescription: "",
    address: "",
  });

  const [personalFiles, setPersonalFiles] = useState({
    photo: null,
    AdharCard: null,
    PanCard: null,
    workExperienceCertificate: null,
    signature: null,
  });

  const [bankDetails, setBankDetails] = useState({
    fullName: "",
    ifscCode: "",
    accountNumber: "",
    branch: "",
    bankName: "",
  });

  const handleMemberChange = (e) => { 
    const { name, value } = e.target;
    setMemberDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleWorkExperienceChange = (e) => {
    const { name, value } = e.target;
    setWorkExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonalFileChange = (e) => {
    const { name, files } = e.target;
    setPersonalFiles((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formData = new FormData();
  
    // Append member details
    Object.entries(memberDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("password",memberDetails?.phone)
  
    // Append work experience details
    Object.entries(workExperience).forEach(([key, value]) => {
      if(key==="address"){
        formData.append(key, value);
      }else{
        formData.append(`personalInfo.${key}`, value);
      }
    });
  
    // Append personal files (images)
    Object.entries(personalFiles).forEach(([key, file]) => {
      if (file) {
        if(key==="photo"){
          formData.append(key, file);
        }else{
          formData.append(`personalInfo[${key}]`, file);
        }
      }
    });
  
    // Append bank details
    Object.entries(bankDetails).forEach(([key, value]) => {
      formData.append(`bankDetail.${key}`, value);
    });
  
    try {
      const response = await axios.post('http://localhost:5000/api/staff', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Response:', response.data);
      showToast('Data submitted successfully');
    } catch (error) {
      console.error('Error submitting data:', error);
      showToast('Failed to submit data');
    }
  };


  return (
    <>
    <button className="bg-red-600 cursor-pointer" onClick={()=>showToast.success('Data submitted successfully')}>click here</button>
    <form onSubmit={handleSubmit} className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Member Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[
          { label: "Name", name: "name" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone" },
          { label: "Joining Date", name: "joiningDate", type: "date" },
          { label: "Company Mobile No", name: "companyMobileNo" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:pt-1.5">
              {label}
            </label>
            <div className="mt-2 sm:col-span-2 sm:mt-0">
              <input
                id={name}
                name={name}
                type={type}
                value={memberDetails[name]}
                onChange={handleMemberChange}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:max-w-xs sm:text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
  <label htmlFor="branch" className="block text-sm font-medium text-gray-900 sm:pt-1.5">
    Branch
  </label>
  <div className="mt-2 sm:col-span-2 sm:mt-0">
    <select
      id="branch"
      name="branch"
      onChange={handleMemberChange}
      required
      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600 sm:max-w-xs sm:text-sm"
    >
      <option value="">Select Branch</option>
      <option value="umra">Umra</option>
      <option value="motavarchha">Motavarchha</option>
    </select>
  </div>
</div>

      <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
        <label className="block text-sm font-medium text-gray-900 sm:pt-1.5">Work Experience</label>
        <div className="mt-2 sm:col-span-2 sm:mt-0">
          <label className="mr-4">
            <input
              type="radio"
              name="workExperience"
              value="true"
              checked={workExperience.workExperience == "true"}
              onChange={handleWorkExperienceChange}
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="workExperience"
              value="false"
              checked={workExperience.workExperience == "false"}
              onChange={handleWorkExperienceChange}
            />{" "}
            No
          </label>
        </div>
      </div>

      {[
        { label: "Last Company Where You Worked", name: "lastCompanyWhereYouWork" },
        { label: "Work Experience Description", name: "workExperienceDescription" },
        { label: "Street Address", name: "address" },
      ].map(({ label, name }) => (
        <div key={name} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
          <label htmlFor={name} className="block text-sm font-medium text-gray-900 sm:pt-1.5">{label}</label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <textarea
              id={name}
              name={name}
              rows={3}
              value={workExperience[name]}
              onChange={handleWorkExperienceChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:max-w-2xl sm:text-sm"
            />
          </div>
        </div>
      ))}

      <h3 className="text-lg font-semibold">Personal Information</h3>
      {["photo", "AdharCard", "PanCard", "workExperienceCertificate", "signature"].map((field) => (
        <div key={field} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
          <label htmlFor={field} className="block text-sm font-medium text-gray-900 sm:pt-1.5">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              id={field}
              name={field}
              type="file"
              accept="image/*"
              onChange={handlePersonalFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      ))}

      <h3 className="text-lg font-semibold">Bank Details</h3>
      {["fullName", "ifscCode", "accountNumber", "branch", "bankName"].map((field) => (
        <div key={field} className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-2">
          <label htmlFor={field} className="block text-sm font-medium text-gray-900 sm:pt-1.5">
            {field.replace(/([A-Z])/g, " $1")}
          </label>
          <div className="mt-2 sm:col-span-2 sm:mt-0">
            <input
              id={field}
              name={field}
              type="text"
              value={bankDetails[field]}
              onChange={handleBankChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:max-w-xs sm:text-sm"
            />
          </div>
        </div>
      ))}

      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
    </>
  );
};

export default MemberForm;
