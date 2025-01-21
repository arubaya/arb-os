"use client";

import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import useImage from "../../../hooks/useImage";
import classNames from "classnames";
import { WindowsBackgroundImage } from "../../../types/backgroundImage";

interface LockScreenViewProps {
  imageName: WindowsBackgroundImage;
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
          "absolute transition-all text-center pt-32 flex-col gap-1 w-full flex-1 inset-0 backdrop-blur-lg",
          {
            "opacity-0 duration-300": !isUnlocked,
            "opacity-100 duration-700": isUnlocked,
          }
        )}
      >
        <button onClick={onShutDown}>Shutdown</button>
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
        <p className="text-8xl font-medium">21:13</p>
        <p className="text-lg">Thuesday, January 21</p>
      </div>
    </div>
  );
}
