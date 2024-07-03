import { CenterDiv } from "@/modules"
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <main className="p-3 w-screen h-screen">
      <img
        className="absolute top-0 left-0 -z-10 object-cover h-screen w-screen"
        src="/bg_1.jpg"
        alt="bg_1"
        width={1280}
        height={720}
      />

      <img
        width={36}
        height={36}
        className="absolute top-3 left-3 z-10"
        sizes="100vw"
        src="/scalp.png"
        alt="logo"
      />

      <CenterDiv className="text-white text-center">
        <div className="backdrop-blur rounded-full p-10">
          <h1 className="text-3xl">Never Miss a Beat: Secure Your Tickets to the Biggest Events</h1>
        </div>
        <div className="backdrop-blur rounded-full p-10">
          <p>
            The first decentralized marketplace for exclusive concerts and festivals featuring your favorite celebrities
          </p>
          <p>no more scalper to steal your tickets</p>
          <p>with us you could enjoy the best ticket buying experience</p>
        </div>
        <Link to="/app/events" className="btn-colorful">
          Explore Events
        </Link>
      </CenterDiv>
    </main>
  )
}
