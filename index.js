// const lib = require("./lib");

// import sum from "./lib";

// console.log(sum(9, 5));

// const fs = require("fs");
// // const txt = fs.readFileSync("demo.txt", "utf-8");
// fs.readFile("demo.txt", "utf-8", (err, txt) => {
//   console.log(txt);
// });

// console.log(txt);

// const { log } = require("console");
// const express = require("express");
// console.log("hello");
// const server = express();

// server.listen(8080);

const http = require("http");
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
const index = fs.readFileSync("index.html", "utf-8");

// const data = { age: 5 };
const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log("server started");

  if (req.url.startsWith("/product")) {
    const id = req.url.split("/")[2];
    const product = products.find((p) => p.id === +id);
    console.log(product);
    res.setHeader("Content-Type", "text/html");
    let modifiedIndex = index
      .replace("**title**", product.title)
      .replace("**url**", product.thumbnail)
      .replace("**rating**", product.rating)
      .replace("**price**", product.price);
    res.end(modifiedIndex);
    return;
  }

  switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(data));
      break;
    // case "/product":
    //   res.setHeader("Content-Type", "text/html");
    //   let modifiedIndex = index
    //     .replace("**title**", product.title)
    //     .replace("**url**", product.thumbnail)
    //     .replace("**rating**", product.rating)
    //     .replace("**price**", product.price);
    //   res.end(modifiedIndex);
    //   break;
    default:
      res.writeHead(404);
  }

  // res.setHeader("Sahil", "Sahu");

  // res.end(data);

  //   res.end("<h1>hello</h1>");
});
server.listen(8080);
