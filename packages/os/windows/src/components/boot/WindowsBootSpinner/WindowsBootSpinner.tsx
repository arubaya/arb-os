import styles from "./windowsBootSpinner.module.css";

const WindowsBootSpinner = () => {
  return (
    <svg
      className={styles.spinner}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="50">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-90;810"
          keyTimes="0;1"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0%;0%;-157.080%"
          calcMode="spline"
          keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
          keyTimes="0;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dasharray"
          values="0% 314.159%;157.080% 157.080%;0% 314.159%"
          calcMode="spline"
          keySplines="0.61, 1, 0.88, 1; 0.12, 0, 0.39, 0"
          keyTimes="0;0.5;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};

export default WindowsBootSpinner;
