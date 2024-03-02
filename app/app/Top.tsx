import { useMediaQuery } from "react-responsive";

export default function Top() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const topStyle = {
    padding: isMobile ? "20px" : "50px",
    backgroundImage: isMobile
      ? "url('/post-it-mobile.png')"
      : "url('/post-it.jpg')",
    height: "100vh",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: isMobile ? "2em" : "3em",
  };

  return <div style={topStyle}></div>;
}
