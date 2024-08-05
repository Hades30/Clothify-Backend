const { Buffer } = require("buffer"); // For handling buffers
const stream = require("stream"); // For handling streams
const FormData = require("form-data"); // For creating form-data payloads
const axios = require("axios");
const fs = require("fs");
var HTMLParser = require("node-html-parser");

const util = require("util"); // For promisifying functions

const pipeline = util.promisify(stream.pipeline); // To promisify stream pipeline

async function getFilesObj(imageUrl) {
  var blob = await res.blob();

  const simulatedFile = new File([blob], "simulatedImage.jpg", {
    type: blob.type,
    lastModified: new Date(),
  });

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(simulatedFile);
  return dataTransfer.files;
}

const apiCall = async (url) => {
  const newUrl = encodeURIComponent(url);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://lens.google.com/uploadbyurl?url=${newUrl}&hl=en-IN&re=df&st=1722859047629&vpw=956&vph=813&ep=gsbubu`,
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      cookie:
        "SID=g.a000mQhT-7HVVkgqQ5-Y8TIydowpwUZ7H1Z8pd1QxkmhfDuHaeLQR4eJCjm4usrHCOrYwb0igwACgYKAdISARISFQHGX2MiOt1uqq_23zIu16v5maTZ8RoVAUF8yKrKIBw-Spw0PP7aJCY0MwZs0076; __Secure-1PSID=g.a000mQhT-7HVVkgqQ5-Y8TIydowpwUZ7H1Z8pd1QxkmhfDuHaeLQjpvRiQK4_0ugIBobejuvsAACgYKAdUSARISFQHGX2Mi3zBkcTLgOQROHzxqfXABXxoVAUF8yKpzNk-Tr_nLnZgzw59PHTyx0076; __Secure-3PSID=g.a000mQhT-7HVVkgqQ5-Y8TIydowpwUZ7H1Z8pd1QxkmhfDuHaeLQKR04By1jq2mY0IdKtMp3DwACgYKAdISARISFQHGX2MiVA4GZvseXp75SjahbuLguhoVAUF8yKoDZXAWZTXM8sPON_aeLxrd0076; HSID=A099hrbN0bKdECWbQ; SSID=A4LqKsZdociR5_TQl; APISID=jX5GY3y2qcaZJ7KU/AzTB_0WarjDv3Culv; SAPISID=geQuhtLLB_gTzwqu/AEWpBIhwvZVTZutUl; __Secure-1PAPISID=geQuhtLLB_gTzwqu/AEWpBIhwvZVTZutUl; __Secure-3PAPISID=geQuhtLLB_gTzwqu/AEWpBIhwvZVTZutUl; OSID=g.a000mQhT-0Sh9u97y3vog-p2qjqhNJO8s5rKMMCP2GPVJJUoSDHO2RwdOibeeLsPD7k4OHSTsgACgYKAeISARISFQHGX2Mi1IdgGM-VViLsZWbrXWT7ghoVAUF8yKqBasT7Osl-T4a2zl2mitnA0076; __Secure-OSID=g.a000mQhT-0Sh9u97y3vog-p2qjqhNJO8s5rKMMCP2GPVJJUoSDHOZ5Sex5S9gt88QuRuX93bWgACgYKAaISARISFQHGX2Miwm5QLQXrF6X_JEPVrhen2BoVAUF8yKp_t3DryNB37c3nj8f64Izp0076; OTZ=7668701_34_34__34_; AEC=AVYB7coyCh3dTpQn19e6sQ1SgYKSnjLlh_31ajGS-VbIE1M15upSHhB-YQ; NID=516=qnumWKz_wBELs-ytVMiDrVEXYv5CziyEKFzKxnihkc5_QKT9VcyBVEwSOPsEMA-pI1gM8aaMuQhMTBUy9XHrlCxJMh_Ckca2zRTQNpGLEdZXfxiu1k78vHvySTRHcwsNxxQTzQcNvth_-c0O3LnnAt7ibJizTmFuKUSxLFa4zh83jeEGNMVr1bdrayD6jRlz3naYY8HiPR7XpTsHyJ7mcrvqgFke5MtJfn7AWSRn5sAB4WwT239lnjU9kxKUedTIR1HPoQvwJLT3hem1Pdh_Vud1svAs5qtVLQxLwzffdaOI4bhSNCzSuTrDdTE0oAZLbeTgy0gBB9zDt5crJecNxQDfLs2HD_sUE9kRINkAts6Hx-NjXmTzhDJ3jTRxszB1Xc3esKV_qyTUMEaxCO2uXpl5Fc4rr14mLbmUiilRM1vKn0WhHCt_9L5MDljAOJ0oD7K9I5y6UJAiG0jKBSZK3CrqeM1dDa1k1XSJZyiGAMp7yeNbUh0BELBXfcBT4P-_3pYVRGvVy0ZgL1sXUre4x2T0fUzyMKXxVMsW_hoXoJtDB7zZJjiSAeJbS5_93ZYRhWezo0H3oe3kb3UgV2qVY9COLqbO0EF4AcK74UzRqcFI4GW6dw0zxZhsN_H0QhCdlXhEoDRAJuj_zSA64EEEOgUDk62r4MFz-cy6TC000kPAdkKMWnutjh8T9Fv2Q_bWUd84UupQVstFdhSooDWkUuhPORyto2M6dxQvYFA1DaObWhPRYcOkMzQTVGr2eqxauSrM4t_lBAo7; __Secure-1PSIDTS=sidts-CjEB4E2dkSRRSGTYUTVSQoO_TSxvHk6Y1XBd4Wv1g2uvZUe0tkp_5utHsBmvWaQHi1DIEAA; __Secure-3PSIDTS=sidts-CjEB4E2dkSRRSGTYUTVSQoO_TSxvHk6Y1XBd4Wv1g2uvZUe0tkp_5utHsBmvWaQHi1DIEAA; SIDCC=AKEyXzXUFK0_oT32WvL2GaVcpGpswWhCnJSpnwhKBSTf7FEhy77Hb9jLb5MoTEYGzyBdpPrwwZ0; __Secure-1PSIDCC=AKEyXzWKsSbgPnvSGssuVBTMFKPH5lrqzkH5CbjcOMUJu70XeJdi-aIjt9Co86wHqmh2RsSd6M4; __Secure-3PSIDCC=AKEyXzWTDGxTrW9VF5Y-B8dt37uvSaJFwiCKb2ClnUXdNdxd6ZyPJv47T0lpeoy-A94uVKyoD1OO; NID=516=oze6GW2I5piJvZFOB0G6fk23rWr3UKL88nkZvkU7-a4wMFrmC8Cx4eM1ZKdh-BYDLJ2yHg8P0gRpKxDxmvzrr0O58viaXFy-B0_onvQQEXDEqYgvaRcV5jZon6QOuHuOUdNU--1Lj_bR-BKhh8plNm3sln3vkBeMp9LWdmW2Nao",
      priority: "u=0, i",
      referer: "https://www.google.com/",
      "sec-ch-ua":
        '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
      "sec-ch-ua-arch": '"arm"',
      "sec-ch-ua-bitness": '"64"',
      "sec-ch-ua-form-factors": '"Desktop"',
      "sec-ch-ua-full-version": '"126.0.6478.183"',
      "sec-ch-ua-full-version-list":
        '"Not/A)Brand";v="8.0.0.0", "Chromium";v="126.0.6478.183", "Google Chrome";v="126.0.6478.183"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"macOS"',
      "sec-ch-ua-platform-version": '"14.4.1"',
      "sec-ch-ua-wow64": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-site",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      "x-client-data":
        "CIe2yQEIo7bJAQipncoBCKT1ygEIlqHLAQiGoM0BCI2nzQEIqp7OAQjcoM4BCOCnzgEIg6zOAQifrM4BCPeszgEIpq7OAQjkr84BGKCdzgEYu67OAQ==",
    },
  };

  return await axios.request(config).then((res) => res.data);
};

const sortByCurrency = (detailsArray) => {
  return detailsArray.sort((a, b) => {
    const getCurrencyPriority = (price) => {
      if (price === null) return 1; // Null prices get priority 1
      if (price.startsWith("₹")) return 0; // INR prices get priority 0
      return 2; // Other currencies get priority 2
    };

    const priorityA = getCurrencyPriority(a.price);
    const priorityB = getCurrencyPriority(b.price);

    return priorityA - priorityB;
  });
};

const parseHtml = (html) => {
  const root = HTMLParser.parse(html);

  const anchorTags = root.querySelectorAll("a");
  console.log(anchorTags);

  // Extract the img tag elements and their attributes
  let results = anchorTags.filter((tag) => tag.attributes.role === "link");
  console.log(results.map((tag) => ({ atr: tag.attributes })));
  results = results.map((tag) => {
    const mainDiv = tag.childNodes[0].attributes;
    const label = tag.attributes["aria-label"];
    const parsedUrl = new URL(tag.attributes["href"]);
    let hostname = parsedUrl.hostname;
    if (hostname.startsWith("www.")) {
      hostname = hostname.substring(4);
    }
    hostname = hostname.split(".")[0];

    const { name, price } = getEverythingFromLabel(label);
    return {
      name: name || mainDiv?.["data-item-title"],
      price,
      source: hostname.charAt(0).toUpperCase() + hostname.slice(1),
      url: tag.attributes["href"],
      imageUrl: mainDiv?.["data-thumbnail-url"],
    };
  });

  console.log(results);
  const filteredResults = results.filter((res) => res.imageUrl && res.name);

  // Output the list of img elements
  return sortByCurrency(filteredResults);
};

const getEverythingFromLabel = (text) => {
  const namePattern = /^(.+?) \p{Sc}/u; // Matches the product name before the currency symbol
  const pricePattern = /(\p{Sc}[\d,]+\.\d{2})/u; // Matches the price with the currency symbol

  const nameMatch = text.match(namePattern);
  const priceMatch = text.match(pricePattern);

  const name = nameMatch ? nameMatch[1] : null;
  const price = priceMatch ? priceMatch[1] : null;

  return { name, price };
};

module.exports = { apiCall, parseHtml };
