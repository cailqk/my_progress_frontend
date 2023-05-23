const baseUrl = "http://localhost:5000/";

async function get(url: string) {
  return fetch(baseUrl + url)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

async function request(method: string, url: string, data: any) {
  const options: any = {
    method,
    headers: {},
    
  };

  if (data) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  return fetch(baseUrl + url, options)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

const post = request.bind({}, "POST");
const patch = request.bind({}, "PATCH");
const del = request.bind({}, "DELETE");

export { get, post, patch, del };
