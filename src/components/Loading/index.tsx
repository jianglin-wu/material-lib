import LoadingIcon from '../Icon/LoadingOutline';

export const Loading = () => {
  return (
    <span className="space-x-2">
      <LoadingIcon className="inline-block h-4 w-4 animate-spin fill-slate-500" />
      <span className="text-base text-slate-500">loading</span>
    </span>
  );
};

export const LoadingBlock = () => {
  return (
    <div className="text-center">
      <span className="space-x-2">
        <LoadingIcon className="inline-block h-4 w-4 animate-spin fill-slate-500" />
        <span className="text-base text-slate-500">loading</span>
      </span>
    </div>
  );
};

export const LoadingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-x-2">
        <LoadingIcon className="inline-block h-4 w-4 animate-spin fill-white" />
        <span className="text-base text-white">loading</span>
      </div>
    </div>
  );
};

export default LoadingPage;
