import { useSelector } from "react-redux";

function WelcomeSection() {
  // Extract user using state.user.user (matching Navbar & ProfileDropdown)
  const user = useSelector((state) => state.user.currentUser);

  // Capitalize first letter and lowercase the rest (e.g. "rohit" -> "Rohit")
  const firstName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1).toLowerCase()
    : "User";

  return (
    <section className="mb-8">
      <h1 className="text-4xl font-bold">
        Welcome back,{" "}
        <span className="text-primary">
          {firstName}
        </span>
      </h1>

      <p className="mt-2 text-base-content/70">
        Continue your Machine Learning journey by solving new problems.
      </p>
    </section>
  );
}

export default WelcomeSection;