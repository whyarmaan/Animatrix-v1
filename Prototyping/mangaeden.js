const axios = require("axios");
axios
  .get("https://www.mangaeden.com/api/list/0")
  .then((res) => {
    console.log(res);
    JSON.parse(res);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
