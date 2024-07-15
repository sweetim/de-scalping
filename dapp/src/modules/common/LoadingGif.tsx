import { FC } from "react"

const LoadingGif: FC = () => {
  return (
    <>
      <img
        className="rounded-full border-purple-500 border-4 shadow-lg shadow-white"
        width={148}
        height={263}
        src="/loading.webp"
        alt="loading"
      />
      <p className="text-white my-5">... preparing ... to ... concert ...</p>
    </>
  )
}

export default LoadingGif
