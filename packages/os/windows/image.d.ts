declare module "*.jpg" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };

  export default value;
}

declare module "*.png" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  export default value;
}

declare module "*.jpeg" {
  const value: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  };
  export default value;
}
