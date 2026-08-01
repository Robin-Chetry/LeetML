import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signupSchema } from "../../schemas/user";
import InputField from "../common/InputField";
import { signupUser } from "../../api/userApi";

function SignupForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Submitted");
    console.log(data);
    setLoading(true);

    try {
      const { confirmPassword, ...userData } = data;
      const response = await signupUser(userData);
      console.log(response);

      toast.success(response?.message || "Registered Successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data ||
          "Something went wrong"
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
            Create Account
          </h1>

          <p className="text-center text-base-content/70">
            Start your coding journey today.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <InputField
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register("firstName")}
            />

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
              autoComplete="new-password"
              error={errors.password?.message}
              {...register("password")}
            />

            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;