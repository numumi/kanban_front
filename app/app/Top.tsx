export default function Top() {
  const topStyle = {
    padding: "50px",
    backgroundImage: "url('/task_board.avif')",
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "3em",
  };

  return <div style={topStyle}></div>;
}
