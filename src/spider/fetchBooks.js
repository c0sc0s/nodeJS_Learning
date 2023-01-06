const axios = require('axios');
const cheerio = require('cheerio');
const Books = require('../models/Book');


// 获取豆瓣图书网页源码
async function getBooksHTML() {
  const { data } = await axios.get("https://book.douban.com/latest")
  return data;
}

async function getBookLinks() {
  const html = await getBooksHTML();
  const $ = cheerio.load(html);
  let achorElements = $("#content .grid-16-8 li .media__img a");
  const hrefs = achorElements.map((i, ele) => {
    const href = ele.attribs["href"];
    return href;
  }).get();
  return hrefs;
}

async function getBookDetail(detailUrl) {
  const { data } = await axios.get(detailUrl)
  const $ = cheerio.load(data);
  const name = $("h1").text().trim();
  const imgurl = $("#mainpic .nbg img").attr("src");

  const spans = $("#info span.pl");

  // 作者
  const authorSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("作者")
  })
  const author = authorSpan.next("a").text();

  // 出版年
  const publishSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("出版年")
  })
  const publishDate = publishSpan[0].nextSibling.nodeValue.trim();

  return {
    name,
    imgurl,
    author,
    publishDate
  }
}


async function fetchAll() {
  const links = await getBookLinks();
  const proms = links.map(async link => {
    return getBookDetail(link);
  });
  const res = Promise.all(proms);
  return res;
}

async function saveToDB(books) {
  await Books.bulkCreate(books);
  console.log("数据保存成功");
}

fetchAll().then((res) => {
  saveToDB(res);
})

