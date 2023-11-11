import { useState } from "react";
import RegisterSpeaker from "./RegisterSpeaker";
import RegisterUser from "./RegisterUser";
const RegisterPage = () => {
  const [isSpeaker, setIsSpeaker] = useState(false);
  return (
    <div className="flex  flex-1 flex-col justify-center px-6 py-12 lg:px-8  min-h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
          Sign Up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">as Speaker</span>
            <input
              type="checkbox"
              className="checkbox checkbox-accent"
              checked={isSpeaker}
              onChange={(e) => setIsSpeaker(!isSpeaker)}
            />
          </label>
        </div>
        {!isSpeaker ? <RegisterUser/> : <RegisterSpeaker/>}
      </div>
    </div>
  );
};
export default RegisterPage;
