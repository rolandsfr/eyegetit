import styled from "styled-components";

const Preloader: React.FC<{ loading: boolean }> = ({ loading }) => {
  return (
    <div
      className={`preloader ${loading ? "" : "loaded"}`}
      style={{
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        position: "fixed",
        zIndex: 1000,
        transition: "0.3s all",
        opacity: 1,
        backgroundColor:
          "linear-gradient(180deg,#e3e9ff 0%, rgba(217, 217, 217, 0) 100%)",
      }}
    >
      <div
        className="inner-container"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "0.3s",
        }}
      >
        <img src="/logo-full.svg" alt="Logo" width={250} />
      </div>
    </div>
  );
};

export default Preloader;
