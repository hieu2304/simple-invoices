import { useState, useEffect } from "react";
import {
  fetchAccessToken,
  AuthResponse,
  fetchUserProfile,
  UserProfile,
} from "../apis";

const useAuth = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const isAuthenticated = accessToken !== null;

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response: AuthResponse = await fetchAccessToken(username, password);
      setAccessToken(response.access_token);
      localStorage.setItem("accessToken", response.access_token);
      await getUserProfile(accessToken);
    } catch (err) {
      setError(`Login failed. Please check your credentials ${err}.`);
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async (accessToken: string) => {
    try {
      const response = await fetchUserProfile(accessToken);
      const profileData = response;
      localStorage.setItem("org_token", profileData.memberships[0].token);
      setUserProfile(profileData);
    } catch (err) {
      setError(`Failed to fetch user profile ${err}.`);
    }
  };

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      getUserProfile(accessToken);
    }
  }, [accessToken]);

  return {
    accessToken,
    error,
    loading,
    login,
    logout,
    isAuthenticated,
    userProfile,
  };
};

export default useAuth;
