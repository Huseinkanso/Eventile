import React, { useState } from "react";
import { ErrorComponent, LoaderButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUploadImageMutation } from "../../slices/userApiSlice";
import { useCreateEventMutation } from "../../slices/eventApiSlice";
const validateSpeaker = Yup.object({
  name: Yup.string().min(8, "min 8 charactere").max("50", "max 50 charactere"),
  description: Yup.string().min(20, "min 20 charactere").max(300, "max 300 charactere").required("Required"),
  date: Yup.date().min(new Date(new Date().setDate(new Date().getDate() + 1)), 'min Date should be greater than today + one day').required('Required'),
  address: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  ticket_price: Yup.number().required("Required"),
  ticket_number: Yup.number().integer().required("Required"),
  longitude: Yup.number().required("Required"),
  latitude: Yup.number().required("Required"),
});
const RegisterSpeaker = () => {
  const navigate = useNavigate();
  const [uploadImage, { isLoading: loadingImage }] = useUploadImageMutation();
  const [createEvent, { isLoading: loadingSpeaker }] =useCreateEventMutation();
  const [imageUrl, setImageUrl] = useState("");
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
      name: "",
      description: "",
      date: "",
      address: "",
      category: "",
      ticket_price: "",
      ticket_number: "",
      longitude: "",
      latitude: "",
    },
    validationSchema: validateSpeaker,
    onSubmit: async (values) => {
      try {
        const res2 = await createEvent({ ...values, imageUrl }).unwrap();
        toast.success("created Successfully");
        navigate("/speaker/events");
      } catch (error) {
        toast.error(error?.data?.message || error.error || "something wrong");
      }
    },
  });
  return (
    <div className="mt-10 md:w-1/2 w-3/4 mx-auto">
    <form onSubmit={formikSpeaker.handleSubmit}>
      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Name</span>
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
          <span className="label-text text-xl">description</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">description</span>
          <textarea
          placeholder="description"
          value={formikSpeaker.values.description}
          onChange={formikSpeaker.handleChange}
          id="description"
          className="textarea textarea-bordered textarea-lg w-full"
        ></textarea>
        </label>
        {formikSpeaker.errors.description && (
          <ErrorComponent message={formikSpeaker.errors.description} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Date</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">date</span>
          <input
            type="datetime-local"
            placeholder="*****"
            id="date"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={formikSpeaker.handleChange}
            value={formikSpeaker.values.date}
          />
        </label>
        {formikSpeaker.errors.date && (
          <ErrorComponent message={formikSpeaker.errors.date} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Image</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">image</span>
          <input
            type="file"
            placeholder="image"
            id="image"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={handleImage}
            value={formikSpeaker.values.image}
          />
        </label>
        {formikSpeaker.errors.image && (
          <ErrorComponent
            message={formikSpeaker.errors.image}
          />
        )}
      </div>
      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Address</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">address</span>
          <input
            type="text"
            placeholder="add an address"
            id="address"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={formikSpeaker.handleChange}
            value={formikSpeaker.values.address}
          />
        </label>
        {formikSpeaker.errors.address && (
          <ErrorComponent message={formikSpeaker.errors.address} />
        )}
      </div>
      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">category</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">category</span>
          <input
            type="text"
            placeholder="add an category"
            id="category"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            onChange={formikSpeaker.handleChange}
            value={formikSpeaker.values.category}
          />
        </label>
        {formikSpeaker.errors.category && (
          <ErrorComponent message={formikSpeaker.errors.category} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Ticket Price </span>
        </label>
        <label className="input-group">
          <span className="bg-primary">price</span>
          <input
            type="number"
            placeholder="add a price"
            id="ticket_price"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            value={formikSpeaker.values.ticket_price}
            onChange={formikSpeaker.handleChange}
          />
        </label>
        {formikSpeaker.errors.ticket_price && (
          <ErrorComponent message={formikSpeaker.errors.ticket_price} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Ticket Number </span>
        </label>
        <label className="input-group">
          <span className="bg-primary">number</span>
          <input
            type="number"
            placeholder="add a number"
            id="ticket_number"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            value={formikSpeaker.values.ticket_number}
            onChange={formikSpeaker.handleChange}
          />
        </label>
        {formikSpeaker.errors.ticket_number && (
          <ErrorComponent message={formikSpeaker.errors.ticket_number} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Longitude </span>
        </label>
        <label className="input-group">
          <span className="bg-primary">longitude</span>
          <input
            type="number"
            placeholder="event longitude location"
            id="longitude"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            value={formikSpeaker.values.longitude}
            onChange={formikSpeaker.handleChange}
          />
        </label>
        {formikSpeaker.errors.longitude && (
          <ErrorComponent message={formikSpeaker.errors.longitude} />
        )}
      </div>

      <div className="my-3">
        <label className="label">
          <span className="label-text text-xl">Latitude </span>
        </label>
        <label className="input-group">
          <span className="bg-primary">latitude</span>
          <input
            type="text"
            placeholder="event latitude location"
            id="latitude"
            className="input input-bordered w-full"
            required
            autoComplete="on"
            value={formikSpeaker.values.latitude}
            onChange={formikSpeaker.handleChange}
          />
        </label>
        {formikSpeaker.errors.latitude && (
          <ErrorComponent message={formikSpeaker.errors.latitude} />
        )}
      </div>
      <div className="my-3">
        <button type="submit" className="btn btn-primary w-full justify-center">
          {loadingSpeaker || loadingImage ? <LoaderButton /> : "Create "}
        </button>
      </div>
    </form>
    </div>
  );
};

export default RegisterSpeaker;
