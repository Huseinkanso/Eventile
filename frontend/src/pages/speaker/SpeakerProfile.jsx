import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ErrorComponent, LoaderButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice"; 
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useGetUserProfileQuery, useUpdateSpeakerProfileMutation,useUploadImageMutation } from "../../slices/userApiSlice";
const validateSpeaker = Yup.object({
  name: Yup.string().min(8, "min 8 charactere").max("50", "max 50 charactere"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters minimun")
    .required("Required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match"
  ),
  description: Yup.string().min(50, "min 50 charactere").required("required"),
  linkedin: Yup.string().url().required("required"),
  twitter: Yup.string().url().required("required"),
  website: Yup.string().url().required("required"),
  company: Yup.string().required("required"),
  position: Yup.string().required(),
});
const SpeakerProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [uploadImage, { isLoading: loadingImage }] = useUploadImageMutation();
  const [updateSpeaker, { isLoading: loadingSpeaker }]=useUpdateSpeakerProfileMutation();
  const { data, isLoading, error } = useGetUserProfileQuery();


  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setDescription(data.description);
      setLinkedin(data.linkedin);
      setTwitter(data.twitter);
      setWebsite(data.website);
      setCompany(data.company);
      setPosition(data.position);
    }
  }, [data]);

  const handleImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setImageUrl(res.image);
      toast.success("image uploaded successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.error || "something wrong");
    }
  };

  const formikSpeaker = useFormik({
    initialValues: {
      name: name,
      email: email,
      password: "",
      password_confirmation: "",
      description: description,
      linkedin: linkedin,
      twitter: twitter,
      website: website,
      company: company,
      position: position,
    },
    validationSchema: validateSpeaker,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const res2 = await registerSpeaker({ ...values, imageUrl }).unwrap();
        dispatch(setCredentials({ ...res2 }));
        toast.success("registered Successfully");
        navigate("/");
      } catch (error) {
        toast.error(error?.data?.message || error.error || "something wrong");
      }
    },
  });
  return (
    <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8  min-h-screen">
      <form onSubmit={formikSpeaker.handleSubmit}>
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
              onChange={formikSpeaker.handleChange}
              value={formikSpeaker.values.name}
            />
          </label>
          {formikSpeaker.errors.email && (
            <ErrorComponent message={formikSpeaker.errors.email} />
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
              onChange={formikSpeaker.handleChange}
              value={formikSpeaker.values.email}
            />
          </label>
          {formikSpeaker.errors.email && (
            <ErrorComponent message={formikSpeaker.errors.email} />
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
              onChange={formikSpeaker.handleChange}
              value={formikSpeaker.values.password}
            />
          </label>
          {formikSpeaker.errors.password && (
            <ErrorComponent message={formikSpeaker.errors.password} />
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
              required
              autoComplete="on"
              onChange={formikSpeaker.handleChange}
              value={formikSpeaker.values.password_confirmation}
            />
          </label>
          {formikSpeaker.errors.password_confirmation && (
            <ErrorComponent
              message={formikSpeaker.errors.password_confirmation}
            />
          )}
        </div>
        <div className="my-3">
            <label className="label">
                <span className="label-text text-xl">Your Current Image</span>
            </label>
            <div className="img">
                <img src={imageUrl} alt="img" />
            </div>
        </div>
        <div className="my-3">
          <label className="label">
            <span className="label-text text-xl">Your Image</span>
          </label>
          <label className="input-group">
            <span className="bg-primary">Image</span>
            <input
              type="file"
              placeholder="add an image"
              id="image"
              className="input input-bordered w-full"
              required
              autoComplete="on"
              onChange={handleImage}
              value={formikSpeaker.values.image}
            />
          </label>
          {formikSpeaker.errors.image && (
            <ErrorComponent message={formikSpeaker.errors.image} />
          )}
        </div>
        <div className="my-3">
          <label className="label">
            <span className="label-text text-xl">Your description</span>
          </label>
          <textarea
            placeholder="description"
            value={formikSpeaker.values.description}
            onChange={formikSpeaker.handleChange}
            id="description"
            className="textarea textarea-bordered textarea-lg w-full"
          ></textarea>
          {formikSpeaker.errors.description && (
            <ErrorComponent message={formikSpeaker.errors.description} />
          )}
        </div>

        <div className="my-3">
          <label className="label">
            <span className="label-text text-xl">Your Linkedin url </span>
          </label>
          <label className="input-group">
            <span className="bg-primary">Linkedin</span>
            <input
              type="text"
              placeholder="add an linkedin url"
              id="linkedin"
              className="input input-bordered w-full"
              required
              autoComplete="on"
              value={formikSpeaker.values.linkedin}
              onChange={formikSpeaker.handleChange}
            />
          </label>
          {formikSpeaker.errors.linkedin && (
            <ErrorComponent message={formikSpeaker.errors.linkedin} />
          )}
        </div>

        <div className="my-3">
          <label className="label">
            <span className="label-text text-xl">Your Twitter url </span>
          </label>
          <label className="input-group">
            <span className="bg-primary">twitter</span>
            <input
              type="text"
              placeholder="add an twitter url"
              id="twitter"
              className="input input-bordered w-full"
              required
              autoComplete="on"
              value={formikSpeaker.values.twitter}
              onChange={formikSpeaker.handleChange}
            />
          </label>
          {formikSpeaker.errors.twitter && (
            <ErrorComponent message={formikSpeaker.errors.twitter} />
          )}
        </div>

        <div className="my-3">
          <label className="label">
            <span className="label-text text-xl">Your website url </span>
          </label>
          <label className="input-group">
            <span className="bg-primary">website</span>
            <input
              type="text"
              placeholder="add an website url"
              id="website"
              className="input input-bordered w-full"
              required
              autoComplete="on"
              value={formikSpeaker.values.website}
              onChange={formikSpeaker.handleChange}
            />
          </label>
          {formikSpeaker.errors.website && (
            <ErrorComponent message={formikSpeaker.errors.website} />
          )}
        </div>

        <div className="my-3">
          <label className="label">
            <span className="label-text text-xl">Your Position </span>
          </label>
          <label className="input-group">
            <span className="bg-primary">position</span>
            <input
              type="text"
              placeholder="your current position"
              id="position"
              className="input input-bordered w-full"
              required
              autoComplete="on"
              value={formikSpeaker.values.position}
              onChange={formikSpeaker.handleChange}
            />
          </label>
          {formikSpeaker.errors.position && (
            <ErrorComponent message={formikSpeaker.errors.position} />
          )}
        </div>

        <div className="my-3">
          <label className="label">
            <span className="label-text text-xl">Your Company </span>
          </label>
          <label className="input-group">
            <span className="bg-primary">company</span>
            <input
              type="text"
              placeholder="your current company"
              id="company"
              className="input input-bordered w-full"
              required
              autoComplete="on"
              value={formikSpeaker.values.company}
              onChange={formikSpeaker.handleChange}
            />
          </label>
          {formikSpeaker.errors.company && (
            <ErrorComponent message={formikSpeaker.errors.company} />
          )}
        </div>

        <div className="my-3">
          <button
            type="submit"
            className="btn btn-primary w-full justify-center"
          >
            {loadingSpeaker || loadingImage ? <LoaderButton /> : "Update "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpeakerProfile;
