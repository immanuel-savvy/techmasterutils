let domain = `http://localhost:3300`;

const post_request = async (url, data) => {
  let ftch = await fetch(`${domain}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  let result = await ftch.json();
  return result && result.data;
};

export { domain, post_request };
