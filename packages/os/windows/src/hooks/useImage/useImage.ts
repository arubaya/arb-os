import { useEffect, useState } from "react";
import { WindowsWallpaperImage } from "../../types/wallpaperImage";

interface useImageProps {
  imageName: WindowsWallpaperImage;
}

const useImage = ({ imageName }: useImageProps) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (imageName) {
      import("../../constants/wallpaperImage")
        .then((imageList) => {
          setImageSrc(imageList.default[imageName]);
        })
        .catch((err) => console.error("Failed to load image:", err));
    }
  }, [imageName]);

  return { imageSrc };
};

export default useImage;
