let DEV = false;
let domain = DEV
  ? `http://localhost:3300`
  : "http://bckend.techmastertools.net";

const get_request = async (url, raw) => {
  if (!url.startsWith("http")) url = `${domain}/${url}`;

  try {
    let ftch = await fetch(url);
    let res;
    try {
      res = await ftch.json();
    } catch (e) {
      return { _$not_sent: true };
    }

    if (raw) return res;
    return res && res.data;
  } catch (e) {
    console.log(e, domain);
    return url;
  }
};

const post_request = async (url, data) => {
  if (!url.startsWith("http")) url = `${domain}/${url}`;

  let ftch = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  let result = await ftch.json();
  console.log(result);
  return result && result.data;
};

export { domain, get_request, post_request };
