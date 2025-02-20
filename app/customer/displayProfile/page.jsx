"use client";
import React, { useEffect, useState } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from "@/app/context/Formcontext";
import withAuth from '@/hooks/withAuth';

const DisplayProfilePage = ({ user, isAuthenticated }) => {
  const { formData, setFormData } = useFormContext();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(user); // Populate form data with user data if authenticated
    }
  }, [isAuthenticated, user, setFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).accessToken : ''}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      console.log('Updated profile:', data);
      localStorage.setItem('userProfile', JSON.stringify(data.user)); // Persist updated data
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profile_image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container max-w-4xl px-4 py-8 mx-auto">
      {isAuthenticated ? (
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? "default" : "outline"}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Image Section */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="flex items-center justify-center w-32 h-32 overflow-hidden bg-gray-100 rounded-full">
                    {formData.profile_image ? (
                      <img 
                        src={formData.profile_image} 
                        alt="Profile" 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Camera className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-2 text-white rounded-full cursor-pointer bg-primary">
                      <Camera className="w-4 h-4" />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {['firstname', 'lastname', 'email', 'phone'].map((field) => (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                    <Input
                      id={field}
                      name={field}
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field] || ''}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {['apartment_number', 'street_address', 'city', 'province', 'postalcode', 'country'].map((field) => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{field.replace('_', ' ').toUpperCase()}</Label>
                      <Input
                        id={field}
                        name={field}
                        value={formData[field] || ''}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div>You must be logged in to view your profile.</div>
      )}
    </div>
  );
};

export default withAuth(DisplayProfilePage);
