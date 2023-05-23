import * as api from "../../requests/API";

const Home = () => {
  api.get("users").then((res) => {
    console.log(res);
  });

  return <p>Hello</p>;
};

export default Home;
