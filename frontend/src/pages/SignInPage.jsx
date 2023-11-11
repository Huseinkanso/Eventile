import { Link } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { ErrorComponent, LoaderButton } from "../components";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const validate = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters minimun")
    .required("Required"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      try {
        const res = await login(values).unwrap();
        console.log(res);
        dispatch(setCredentials({ ...res }));
        toast.success("Login Successfully");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    },
  });

  return (
    <>
      <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8  h-screen">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={formik.handleSubmit}>
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
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </label>
              {formik.errors.email && <ErrorComponent message={formik.errors.email} />}
            </div>

            <div className="my-3">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-primary hover:text-secondary"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
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
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </label>
                {formik.errors.password && <ErrorComponent message={formik.errors.password} />}
            </div>

            <div className="my-3">
              <button
                type="submit"
                className="btn btn-primary w-full justify-center"
              >
                {isLoading ? <LoaderButton /> : "Sign in"}
              </button>
            </div>
            <div className="text-end">
              new User ?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-secondary"
              >
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SignInPage;
