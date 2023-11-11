import { FaXbox } from "react-icons/fa";
const ErrorComponent = ({ message }) => {
  return (
    <div className=" py-3 m-2 rounded-sm">
      <span className="text-red-700"> {message} </span>
    </div>
  );
};

export default ErrorComponent;
