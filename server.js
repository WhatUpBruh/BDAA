// server.js
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 5000;

// async function scrapeTargetDeals() {
//   const { data } = await axios.get("https://www.target.com/deals");
//   const $ = cheerio.load(data);

//   const deals = [];
//   $(".sc-29c5b21c-0 hrlMbv grid-3-up").each((i, el) => {
//     deals.push({
//       title: $(el).find(".deal-title").text(),
//       price: $(el).find(".deal-price").text(),
//       link: $(el).find("a").attr("href"),
//     });
//   });
//   return deals;
// }
async function scrapeDeals() {
  // Replace with the actual URL of the page
  const { data } = await axios.get("https://www.target.com/deals");
  const $ = cheerio.load(data);

  let deals = [];
  let index = 0;

  // Loop through each deal card
  $(".sc-1ef1c1d0-9 efmQgw pad-none show-border").each((i, el) => {
    // const link = $(el).find("a").attr("href");
    // const discount = $(el).find("h3 .h-sr-only").text().trim();
    // const description = $(el).find("p.sc-1ef1c1d0-34").text().trim();
    // const extraInfo = $(el).find("p.sc-1ef1c1d0-38").text().trim();
    // const image = $(el).find("img").attr("src");
    // index += 1;
    console.log('inside the loop');

    // deals.push({
    // //   discount,
    // //   description,
    // //   extraInfo,
    // //   link,
    // //   image,
    // index,
    // });
  });

  return deals;
}

app.get("/api/deals", async (req, res) => {
  try {
    const deals = await scrapeDeals();
    res.json(deals);
    console.log("lol");
  } catch (err) {
    res.status(500).json({ error: "Failed to scrape deals" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
