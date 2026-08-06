import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/userProfileSlice";
import { fetchDashboardStats } from "../../redux/dashboardSlice";
import ProfileHeader from "../../components/profile/ProfileHeader";
import PersonalInfoCard from "../../components/profile/PersonalInfoCard";
import ProfileStats from "../../components/profile/ProfileStats";

function Profile() {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center text-error">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <h1 className="text-4xl font-bold">My Profile</h1>

      <ProfileHeader />

      <PersonalInfoCard />

      <ProfileStats />
    </div>
  );
}

export default Profile;