import { CSV } from "https://js.sabae.cc/CSV.js";
import HTMLParser from "https://dev.jspm.io/node-html-parser";
import { cachedFetch } from "https://js.sabae.cc/cachedFetch.js";
import { JAPAN_PREF_EN } from "https://js.sabae.cc/JAPAN_PREF.js";

const url = "https://www.starbucks.co.jp/cafe/jimoto_frappuccino/";

//console.log(JAPAN_PREF_EN);

const parseOGP = (dom) => {
  const metas = dom.querySelectorAll("meta");
  const res = {};
  for (const meta of metas) {
    const name = meta.attributes.property || meta.attributes.name;
    if (!name || !name.startsWith("og:")) {
      continue;
    }
    const val = meta.attributes.content;
    if (!val) {
      continue;
    }
    res[name] = val;
  }
  return res;
};

const data = [];
for (const pref of JAPAN_PREF_EN) {
  const url2 = url + pref.toLowerCase() + "/";
  console.log(url2);
  const html = await cachedFetch(url2);
  const dom = HTMLParser.parse(html);
  const ogp = parseOGP(dom);
  data.push(ogp);
  //const title = dom.querySelector("title");
}
console.log(data);

await Deno.writeTextFile("stb47.csv", CSV.stringify(data));
