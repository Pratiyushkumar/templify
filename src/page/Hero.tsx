import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect"
import { BackgroundBeams } from "../components/ui/background-beams"
import Navbar from "../components/ui/navbar"
import { Link } from "react-router"

const words = [
  {
    text: "From",
    className: "text-white dark:text-blue-500",
  },
  {
    text: "Tables",
    className: "text-white dark:text-blue-500",
  },
  {
    text: "to",
    className: "text-white dark:text-blue-500",
  },
  {
    text: "Template",
    className: "text-white dark:text-blue-500",
  },
  {
    text: "instantly",
    className: "text-white dark:text-blue-500",
  },
  {
    text: "with",
    className: "text-white dark:text-blue-500",
  },
  {
    text: "Templify.",
    className: "text-blue-500 dark:text-blue-500",
  },
]
function Hero() {
  return (
    <div>
  <Navbar />
  <div className="h-screen w-full flex flex-col bg-neutral-950 items-center justify-center px-6 md:px-12">
    {/* Hero Description */}
    <p className="text-neutral-400 dark:text-neutral-200 text-center text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
      Upload your files, define a template, and let us do the rest—convert your
      data into customized text or PDFs in no time!
    </p>

    {/* Typewriter Effect */}
    <TypewriterEffectSmooth words={words} />

    {/* Buttons */}
    <div className="w-full sm:w-auto flex flex-col md:flex-row mt-6 space-y-4 md:space-y-0 md:space-x-4">
      <button className="px-4 md:px-8 py-2 md:py-4 rounded-md md:rounded-lg bg-blue-500 border dark:border-white border-transparent font-semibold text-white text-sm md:text-base transition duration-300 hover:bg-blue-600">
        <Link to="/home">
          <p className="tracking-wider text-lg capitalize">Try Now</p>
        </Link>
      </button>
      <button className=" px-4 md:px-8 py-2 md:py-4 rounded-md md:rounded-lg font-semibold bg-white text-black border border-black text-sm md:text-base transition duration-300 hover:bg-neutral-200">
        <Link to="/signup">
          <p className="tracking-wider text-lg capitalize">Sign Up</p>
        </Link>
      </button>
    </div>

    {/* Background Beams */}
    <BackgroundBeams />
  </div>
</div>

  )
}

export default Hero
