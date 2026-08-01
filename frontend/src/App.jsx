import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import { checkAuth } from "./api/userApi";
import { loginSuccess, setLoading } from "./redux/userSlice";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      dispatch(setLoading(true));

      try {
        const response = await checkAuth();

        dispatch(loginSuccess(response.user));
      } catch (error) {
        console.log("User is not logged in");
      } finally {
        dispatch(setLoading(false));
      }
    };

    verifyUser();
  }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" />
      <AppRoutes />
    </>
  );
}

export default App;