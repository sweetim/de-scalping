import { FC } from "react";

import Image from 'next/image'

const LoadingGif: FC = () => {
  return (
    <>
      <Image
        className="rounded-full border-purple-500 border-4 shadow-lg shadow-white"
        width={148}
        height={263}
        priority={true}
        src="/loading.webp"
        alt="loading" />
      <p className="text-white my-5">... preparing ... to ... concert ...</p>
    </>
  )
}

export default LoadingGif
