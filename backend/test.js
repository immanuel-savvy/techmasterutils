let i = 0;

let i_interval = setInterval(async () => {
  i++;
  if (i === 10) clearInterval(i_interval);

  console.log(i);
}, 500);
