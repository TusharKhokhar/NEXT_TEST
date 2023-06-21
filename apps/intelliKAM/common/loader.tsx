
const Loader = () => {
    return (
        <div className="loader fixed top-0 right-0 left-0 bottom-0 z-50 flex items-center justify-center bg-white">
            <img src="images/loadingspinner.png" alt="Loading..." className="animate-spin" />
        </div>
    );
}
export default Loader;