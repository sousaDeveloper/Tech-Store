"use client";

import Image from "next/image";
import { useState } from "react";

import ButtonBack from "@/app/catalog/components/button-back";

interface ProductImagesProps {
  name: string;
  imageUrls: string[];
}

const ProductImages = ({ name, imageUrls }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleImageClick = (imageUrl: string) => {
    return setCurrentImage(imageUrl);
  };

  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent md:h-full md:rounded">
        <div className="absolute left-[0.05rem] top-20 p-5 pb-0 md:top-[5.75rem]">
          <ButtonBack />
        </div>
        <Image
          src={currentImage}
          alt={name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          data-aos="fade-up"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div
        className="mt-8 grid grid-cols-4 gap-4 px-5 md:absolute md:flex md:flex-col "
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        {imageUrls.map((imageUrl, index) => (
          <button
            key={index}
            onClick={() => handleImageClick(imageUrl)}
            className={`flex h-20 cursor-pointer items-center justify-center rounded-lg bg-accent ${currentImage === imageUrl && "border-2 border-primary"} md:bg-[#0b0b0b]`}
          >
            <Image
              src={imageUrl}
              alt={name}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
              style={{
                objectFit: "contain",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
