const CardLayout = (props: any) => {
  return (
    <div
      className="card"
      style={{
        margin: "1rem",
        backgroundColor: "rgb(211,170,180)",
        boxShadow: "0 1px 18px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div className="card-body">{props.children}</div>
    </div>
  );
};
export default CardLayout;
