import React from 'react';
import { useResumeStore } from '../../store/resumeStore';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  const handleChange = (e) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Personal Information</h2>
        <p className="text-sm text-gray-500 mt-1">Start with the basics. HR needs to know how to reach you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700">Full Name</label>
          <input
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700">Email Address</label>
          <input
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="hello@johndoe.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700">Phone Number</label>
          <input
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700">Location</label>
          <input
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700">LinkedIn URL</label>
          <input
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-gray-700">Portfolio / Website</label>
          <input
            name="website"
            value={personalInfo.website}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="johndoe.com"
          />
        </div>
      </div>
    </div>
  );
}
