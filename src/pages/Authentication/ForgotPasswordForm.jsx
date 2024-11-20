import { useForm } from "react-hook-form";
import { forgotPassword } from "../../api/auth";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      alert("OTP sent to your email.");
    } catch (error) {
      alert("Error sending OTP.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 bg-white shadow rounded w-96"
      >
        <h2 className="text-2xl mb-6 text-center">Forgot Password</h2>
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="w-full p-2 border mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
