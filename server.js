const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //getting the path
  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  //setting up headers
  res.setHeader("Content-Type", "text/html");
  //read and send the index page
  res.statusCode = 200;
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //   res.write(data);
      res.end(data);
    }
  });
});

//start listening
server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
