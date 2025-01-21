import { useEffect, useState } from "react";
import { WindowsBackgroundImage } from "../../types/backgroundImage";

interface useImageProps {
  imageName: WindowsBackgroundImage;
}

const useImage = ({ imageName }: useImageProps) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (imageName) {
      import(`../../assets/background/${imageName}`)
        .then((image) => {
          setImageSrc(image.default.src);
        })
        .catch((err) => console.error("Failed to load image:", err));
    }
  }, [imageName]);

  return { imageSrc };
};

export default useImage;
