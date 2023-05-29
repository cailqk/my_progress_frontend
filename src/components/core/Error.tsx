const Error = (props: { error: string }) => {
  return <strong className="text-danger">{props.error}</strong>;
};

export default Error;
