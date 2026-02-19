import {create} from 'zustand';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { LogOut } from 'lucide-react';
const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth:true,
    isSigningIn:false,
    isSigningUp:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    checkAuth: async () => {
        try {
            const response = await api.get('/auth/check');
            set({authUser: response.data})
        } catch (error) {
            console.error('Auth check failed:', error);
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signUp: async (data) => {
        set({isSigningUp: true})
        try {
            const response = await api.post('/user/register', data);
            set({authUser: response.data})
            toast.success('Account created successfully!')
        } catch (error) {
            toast.error(( error.response?.data?.message || error.message || "Sign up failed!!!"))
        } finally {
            set({isSigningUp: false})
        }
    },
    signIn: async (data) => {
        set({isSigningIn: true})
        try {
            const response = await api.post('/user/login', data);
            set({authUser:response.data})
            toast.success("Logged in successfully!")
            }
         catch (error){
            toast.error((error.response?.data?.message || error.message || "Login failed!"))
        } finally {
            set({isSigningIn: false})
        }
    },
    LogOut: async () => {
        try {
            const response = await api.post('/auth/logout');
            set({authUser: null})
            toast.success("Logged out successfully!")
        } catch (error) {
            toast.error("Logout failed!")
        }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile: true})
        try {
            const response = await api.put('/auth/profile',data)
            set({authUser: response.data})
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile!")
        } finally {
            set({isUpdatingProfile: false})
        }
    }
}))

export default useAuthStore;