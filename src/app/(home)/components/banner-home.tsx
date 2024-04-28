import Image, { ImageProps } from "next/image";

export default function BannerHome({ src, alt, className, sizes }: ImageProps) {
  return (
    <Image
      src={src}
      width={0}
      height={0}
      alt={alt}
      sizes={sizes}
      className={`${className} mt-4 h-auto w-full`}
      data-aos="fade-down"
      data-aos-duration="1000"
    />
  );
}
