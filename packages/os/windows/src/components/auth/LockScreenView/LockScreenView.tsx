"use client";

import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import useImage from "../../../hooks/useImage";
import classNames from "classnames";
import { WindowsWallpaperImage } from "../../../types/wallpaperImage";
import UserIcon from "../../../assets/icons/ui/defAccount.png";
import PowerIcon from "../../../assets/icons/ui/power.png";
import useTime from "../../../hooks/useTime";

interface LockScreenViewProps {
  imageName: WindowsWallpaperImage;
  onUnlock: () => void;
  isUnlocked: boolean;
  onShutDown: () => void;
}

export default function LockScreenView({
  imageName,
  onUnlock,
  isUnlocked,
  onShutDown,
}: LockScreenViewProps) {
  const { imageSrc } = useImage({ imageName });
  const { date, time } = useTime();

  const [startY, setStartY] = useState<null | number>(null);
  const [translateY, setTranslateY] = useState(0);

  const lockScreenBackground = css({
    backgroundImage: `url(${imageSrc})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  const opacity = Math.max(
    1 - Math.abs(translateY) / (window.innerHeight - 300),
    0
  );

  const transform = css({
    transform: isUnlocked ? "translateY(-100%)" : `translateY(${translateY}px)`,
    opacity,
  });

  useEffect(() => {
    if (isUnlocked) {
      setStartY(null);
      setTranslateY(0);
    }
  }, [isUnlocked]);

  const handleStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startY = e.clientY;
    setStartY(startY);
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (startY === null) return;
    const currentY = e.clientY;
    const diffY = currentY - startY;

    // Batas minimal swipe (hindari drag ke bawah)
    if (diffY < 0) {
      setTranslateY(diffY);
    }
  };

  const handleEnd = () => {
    // Cek threshold unlock (misalnya swipe -150px)
    if (translateY < -100) {
      onUnlock(); // Unlock state
    } else {
      setTranslateY(0); // Reset posisi
    }
    setStartY(null);
  };

  return (
    <div
      className={classNames(
        "flex flex-col w-full min-h-screen justify-center select-none overflow-hidden",
        lockScreenBackground
      )}
    >
      <div
        className={classNames(
          "absolute transition-all text-center pt-32 flex-col gap-1 w-full flex-1 inset-0 backdrop-blur-lg px-8 pb-8",
          {
            "opacity-0 duration-300": !isUnlocked,
            "opacity-100 duration-700": isUnlocked,
          }
        )}
      >
        <div className="flex justify-between items-center flex-col w-full h-full gap-2">
          <div className="w-full flex justify-center items-center flex-1">
            <div className="flex flex-col gap-3">
              <img src={UserIcon.src} alt="" width={128} />
              <p className="text-xl">Guest</p>
            </div>
          </div>
          <div className="w-full flex justify-between items-end">
            <div className="flex flex-col">
              <div className="flex gap-2 items-center px-3 py-2 hover:bg-white/10 cursor-pointer rounded-md">
                <img src={UserIcon.src} alt="" width={32} />
                <p>Guest</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div
                className=" p-2 hover:bg-white/10 cursor-pointer rounded-md"
                onClick={onShutDown}
              >
                <img src={PowerIcon.src} alt="" width={18} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "flex text-center pt-32 flex-col gap-1 bg-black/20 w-full flex-1 inset-0",
          transform,
          {
            "transition-all duration-300":
              isUnlocked ||
              (!isUnlocked && translateY === 0 && startY === null),
          }
        )}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
      >
        <p className="text-8xl font-medium">{time}</p>
        <p className="text-lg">{date}</p>
      </div>
    </div>
  );
}
