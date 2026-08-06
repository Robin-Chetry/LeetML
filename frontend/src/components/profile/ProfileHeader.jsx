import { useSelector } from "react-redux";

function ProfileHeader() {
  const { profile } = useSelector((state) => state.profile);

  if (!profile) return null;

  const initials = `${profile.firstName?.[0] ?? ""}${
    profile.lastName?.[0] ?? ""
  }`.toUpperCase();

  const fullName = [profile.firstName, profile.lastName]
    .filter(Boolean)
    .join(" ");

  const formattedRole = profile.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "";

  return (
    <div className="card bg-base-100 border border-base-300 shadow-sm">
      <div className="card-body">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Avatar - Refined to w-20 with text-3xl initials */}
          <div className="avatar shrink-0">
            <div
              className="w-20 h-20 rounded-full bg-primary text-primary-content ring-2 ring-primary ring-offset-2 ring-offset-base-100 shadow-lg flex items-center justify-center"
              title={fullName}
            >
              <span className="text-3xl font-black tracking-wide">
                {initials}
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            {/* Secondary Heading Level to keep page title dominant */}
            <h2 className="text-2xl font-bold">{fullName}</h2>

            <p className="text-base-content/60 mt-1">{profile.emailId}</p>

            <div className="mt-3">
              <span className="badge badge-primary">
                {formattedRole}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;