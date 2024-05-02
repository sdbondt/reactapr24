// Simple Loading Spinner component styled with Tailwind CSS.
const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    );
}

export default LoadingSpinner;
