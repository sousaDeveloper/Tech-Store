import Image, { ImageProps } from "next/image";

export default function BannerHome({ src, alt }: ImageProps) {
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
