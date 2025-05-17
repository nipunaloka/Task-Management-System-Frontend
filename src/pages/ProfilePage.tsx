import React from 'react';
import Layout from '../components/layout/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Mail } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout>
      <div className="mb-6 animate-fade-in">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">
          View and manage your account information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 animate-slide-up">
          <Card className="text-center p-6">
            <div className="mx-auto h-24 w-24 mb-4">
              {user?.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="h-24 w-24 rounded-full border-4 border-white shadow"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-3xl">
                  {user?.name.charAt(0)}
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-semibold text-gray-900 mt-2">
              {user?.name}
            </h2>
            
            <p className="text-gray-500 mt-1">{user?.email}</p>
            
            <div className="mt-6">
              <Button
                variant="danger"
                onClick={handleLogout}
                icon={<LogOut size={16} />}
                className="w-full"
              >
                Logout
              </Button>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Card>
            <h3 className="text-lg font-medium mb-4">Account Information</h3>
            
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 pb-4">
                <div className="flex items-center sm:w-1/3 mb-2 sm:mb-0">
                  <User size={18} className="text-gray-400 mr-2" />
                  <span className="text-gray-600">Full Name</span>
                </div>
                <div className="sm:w-2/3 font-medium text-gray-900">
                  {user?.name}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-gray-100 pb-4">
                <div className="flex items-center sm:w-1/3 mb-2 sm:mb-0">
                  <Mail size={18} className="text-gray-400 mr-2" />
                  <span className="text-gray-600">Email</span>
                </div>
                <div className="sm:w-2/3 font-medium text-gray-900">
                  {user?.email}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center py-2">
                <div className="flex items-center sm:w-1/3 mb-2 sm:mb-0">
                  <span className="text-gray-600">Account ID</span>
                </div>
                <div className="sm:w-2/3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">{user?.id}</code>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;