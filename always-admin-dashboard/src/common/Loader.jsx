import { CircleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <CircleLoader color="#8CAB91" size={100} />
    </div>
  );
};

export default Loader;
