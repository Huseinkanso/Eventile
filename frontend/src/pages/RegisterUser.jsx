import { Link } from "react-router-dom";
import { useRegisterUserMutation } from "../slices/userApiSlice";
import { ErrorComponent, LoaderButton } from "../components";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const validateUser = Yup.object({
  name: Yup.string().min(8, "min 8 charactere").max("50", "max 50 charactere"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters minimun")
    .required("Required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match"
  ),
});

const RegisterUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerUser, { isLoading: loadingUser }] = useRegisterUserMutation();
  const formikUser = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validationSchema: validateUser,
    onSubmit: async (values) => {
      try {
        const res = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("registered Successfully");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error.error || "something wrong");
      }
    },
  });
  return (
    <form onSubmit={formikUser.handleSubmit}>
      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Your Name</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">Name</span>
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={formikUser.handleChange}
            value={formikUser.values.name}
          />
        </label>
        {formikUser.errors.name && (
          <ErrorComponent message={formikUser.errors.name} />
        )}
      </div>
      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Your Email</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">Email</span>
          <input
            type="text"
            id="email"
            placeholder="info@site.com"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={formikUser.handleChange}
            value={formikUser.values.email}
          />
        </label>
        {formikUser.errors.email && (
          <ErrorComponent message={formikUser.errors.email} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Your Password</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">Password</span>
          <input
            type="password"
            placeholder="*****"
            id="password"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={formikUser.handleChange}
            value={formikUser.values.password}
          />
        </label>
        {formikUser.errors.password && (
          <ErrorComponent message={formikUser.errors.password} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Your Password Confirmation</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">Confirm</span>
          <input
            type="password"
            placeholder="confirm password"
            id="password_confirmation"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={formikUser.handleChange}
            value={formikUser.values.password_confirmation}
          />
        </label>
        {formikUser.errors.password_confirmation && (
          <ErrorComponent message={formikUser.errors.password_confirmation} />
        )}
      </div>
      <div className="my-3">
        <button type="submit" className="btn btn-primary w-full justify-center">
          {loadingUser ? <LoaderButton /> : "Register "}
        </button>
      </div>
      <div className="text-end">
        old User ?{" "}
        <Link to="/signin" className="text-primary hover:text-secondary">
          signin
        </Link>
      </div>
    </form>
  );
};

export default RegisterUser;
