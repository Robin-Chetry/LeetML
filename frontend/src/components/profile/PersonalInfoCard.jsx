import { useSelector } from "react-redux";

function PersonalInfoCard() {
  const { profile } = useSelector((state) => state.profile);

  if (!profile) return null;

  const formattedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm opacity-60">First Name</p>
            <p className="font-semibold text-lg">{profile.firstName || "-"}</p>
          </div>

          <div>
            <p className="text-sm opacity-60">Last Name</p>
            <p className="font-semibold text-lg">{profile.lastName || "-"}</p>
          </div>

          <div>
            <p className="text-sm opacity-60">Age</p>
            <p className="font-semibold text-lg">{profile.age ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm opacity-60">Member Since</p>
            <p className="font-semibold text-lg">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoCard;