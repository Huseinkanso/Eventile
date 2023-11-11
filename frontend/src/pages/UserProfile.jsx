import { useFormik } from "formik";
import { useGetUserProfileQuery,useUpdateUserProfileMutation } from "../slices/userApiSlice";
import * as Yup from "yup";
import { ErrorComponent, Loader, LoaderButton } from "../components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
const validateUser = Yup.object({
    name: Yup.string().min(8, "min 8 charactere").max("50", "max 50 charactere").required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().min(8, "Must be 8 characters minimun").required("Required"),
    password_confirmation: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "password must match"
    ).required("Required"),
  });
const UserProfile = () => {
  const { data, isLoading, error } = useGetUserProfileQuery();
  const [updateUser, { isLoading: loadingUser }] = useUpdateUserProfileMutation();
  const dispatch=useDispatch()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(()=>{
    if(data){
      setName(data.name)
      setEmail(data.email)
    }
  },[data])
  
  const formikUser = useFormik({
    initialValues: {
      name: name,
      email: email,
      password: "",
      password_confirmation: "",
    },

    validationSchema: validateUser,
    enableReinitialize:true,
    onSubmit: async (values) => {
      try {
        const res = await updateUser({
          name: values.name,
          email: values.email,
          password: values.password,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
        toast.success("updated Successfully");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message || error.error || "something wrong");
      }
    },
  });
  return isLoading || !data ? (
    <Loader />
  ) : error ? (
    <ErrorComponent
      message={error.data.message || error.error || "Something went wrong"}
    />
  ) : (
    // design use profile and with edit
    // make a good design responsive
    <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8  min-h-screen">
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
          {formikUser.errors.email && (
            <ErrorComponent message={formikUser.errors.email} />
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
            <span className="label-text text-xl">
              Your Password Confirmation
            </span>
          </label>
          <label className="input-group">
            <span className="bg-primary">Confirm</span>
            <input
              type="password"
              placeholder="confirm password"
              id="password_confirmation"
              className="input input-bordered w-full"
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
          <button
            type="submit"
            className="btn btn-primary w-full justify-center"
          >
            {loadingUser ? <LoaderButton /> : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
