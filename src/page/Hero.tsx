import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect"
import { BackgroundBeams } from "../components/ui/background-beams";
import Navbar from "../components/ui/navbar";
import { Link } from "react-router";

const words = [
  {
    text: "From",
    className: "text-white dark:text-blue-500"
  },
  {
    text: "Tables",
    className: "text-white dark:text-blue-500"
  },
  {
    text: "to",
    className: "text-white dark:text-blue-500"
  },
  {
    text: "Text",
    className: "text-white dark:text-blue-500"
  },
  {
    text: "instantly",
    className: "text-white dark:text-blue-500"
  },
  {
    text: "with",
    className: "text-white dark:text-blue-500",
  },
  {
    text: "Templify.",
    className: "text-blue-500 dark:text-blue-500",
  },
];
function Hero() {
  return (
    <div>
      <Navbar />
      <div className="h-[100vh] w-full flex flex-col bg-neutral-950 items-center justify-center   ">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          Upload your files, define a template, and let us do the rest—convert your data into customized text or PDFs in no time!
        </p>
        <TypewriterEffectSmooth words={words} />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button className="w-32 h-10 rounded-xl bg-blue-500 border dark:border-white border-transparent font-semibold text-white text-sm z-50">
            Try Now!
          </button>
          <button className="w-32 h-10 rounded-xl font-semibold bg-white text-black border border-black text-sm z-50">
            <Link to="/signup">
              Signup
            </Link >
          </button>
        </div>
        <BackgroundBeams />
      </div>
    </div>

  );
}

export default Hero