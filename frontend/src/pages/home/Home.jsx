import { useSelector } from "react-redux";

function Home() {
  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome {currentUser?.firstName || "Guest"}
      </h1>
    </div>
  );
}

export default Home;