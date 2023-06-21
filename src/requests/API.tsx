const baseUrl = "http://localhost:5000/";

async function request(method: string, url: string, data?: any) {
  const token = localStorage.getItem("token");
  const options: any = {
    method,
    headers: {},
  };

  if (localStorage.getItem("token")) {
    options.headers["authorization"] = `Bearer ${localStorage.getItem(
      "token"
    )}`;
  }

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  return fetch(baseUrl + url, options)
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Forbidden resource") {
        console.log(data);
      }
      return data;
    });
}

const get = request.bind({}, "GET");
const post = request.bind({}, "POST");
const patch = request.bind({}, "PATCH");
const del = request.bind({}, "DELETE");

export { get, post, patch, del };
