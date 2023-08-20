import LoadingIcon from '../Icon/LoadingOutline';

export const Loading = () => {
  return (
    <span className="space-x-2">
      <LoadingIcon className="fill-slate-500 w-4 h-4 inline-block animate-spin" />
      <span className="text-slate-500 text-base">loading</span>
    </span>
  );
};

export const LoadingBlock = () => {
  return (
    <div className="text-center">
      <span className="space-x-2">
        <LoadingIcon className="fill-slate-500 w-4 h-4 inline-block animate-spin" />
        <span className="text-slate-500 text-base">loading</span>
      </span>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="space-x-2">
        <LoadingIcon className="fill-white w-4 h-4 inline-block animate-spin" />
        <span className="text-white text-base">loading</span>
      </div>
    </div>
  );
};

export default LoadingPage;
