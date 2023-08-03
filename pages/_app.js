import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import "flowbite"


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
