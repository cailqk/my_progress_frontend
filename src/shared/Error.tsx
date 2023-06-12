import { capitalizeMessage } from "./utils/capitalizeMessage";

const Error = (props: { error: string[] | string }) => {
  const errorList = [];

  if (Array.isArray(props.error)) {
    props.error.map((err) => {
      errorList.push(<p>{capitalizeMessage(err)}</p>);
    });
  } else {
    errorList.push(props.error);
  }

  return <div className="alert alert-danger">{...errorList}</div>;
};

export default Error;
