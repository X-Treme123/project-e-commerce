import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex gap-4 justify-center min-h-screen items-center bg-black flex-col">
            <h1 className="text-white">Oops!</h1>
            <p className="text-white">Sorry, an unexpected error has occurred.</p>
            <p className="text-white">{error.statusText || error.message}</p>
        </div>
    );
}

export default ErrorPage