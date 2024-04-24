"use client";

import Aos from "aos";
import Image, { ImageProps } from "next/image";
import { useEffect } from "react";

export default function BannerHome({ src, alt }: ImageProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Aos.init();
    }
  }, []);

  return (
    <Image
      src={src}
      width={0}
      height={0}
      alt={alt}
      sizes="100vw"
      className="mt-5 h-auto w-full"
      data-aos="fade-down"
      data-aos-duration="1000"
    />
  );
}
