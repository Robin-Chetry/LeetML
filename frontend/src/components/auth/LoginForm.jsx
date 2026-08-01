import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { loginSchema } from "../../schemas/user";
import { loginUser } from "../../api/userApi";
import { loginSuccess } from "../../redux/userSlice";
import InputField from "../common/InputField";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await loginUser(data);

      // Save user in Redux
      dispatch(loginSuccess(response.user));

      toast.success(response.message);

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data || "Invalid Credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center">
            Welcome Back
          </h1>

          <p className="text-center text-base-content/70">
            Login to continue your coding journey.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <InputField
              label="Email"
              name="emailId"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              error={errors.emailId?.message}
              {...register("emailId")}
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="link link-primary font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;