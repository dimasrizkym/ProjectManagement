import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  return (
    <ClipLoader
      color="#fff"
      size={20}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loading;
