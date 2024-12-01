const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");
const { check, validationResult } = require("express-validator");
const {
  encryptPassword,
  comparePassword,
  generateUniqueNumber,
} = require("../../utils/helper");
const Verify = require("../../modals/Verify");
const {
  getVerifyEmailHtmlTemplate,
  getVerifyEmailTextTemplate,
} = require("../../emailTemplates/verifyEmail");
const sendMail = require("../../utils/mail");
const router = express();
const jwtSecret = process.env.JWT_SECRET || "";
const CLIENT_URL = process.env.CLIENT_URL || `http://`;

// User routes
router.get("/", async (req, res) => {
  try {
    const mockData = [
      {
        asin: "B0B2RBTWFD",
        Url: "https://www.amazon.com/dp/B0B2RBTWFD",
        imageUrl:
          "https://m.media-amazon.com/images/I/A1vJUKBjc2L._CLa%7C2140%2C2000%7C91Dzz8yj0ZL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Mens Fishing TShirt Dont Be A Dumb Bass Fish Dad Funny Fisherman T-Shirt",
        bullet1:
          "Funny vintage bass dad Jokes reel cool papa grandpa ever adult humor graphic tee is a bass fishing for dads fishing dad, fishing daddy, fish lovers, fishing kayak, fishing rod, fishing reels and fishing jokes. Birthday or Christmas gift for papa grandpa",
        bullet2:
          "Do you like to go Fishing. Does your mother or father think you're a little bit crazy for the cool funny tee's you wear? Well grab this cool Bass tee today and show all your friends with pets just how funny you are. Makes a great gift for that fisherman.",
        brand: "Brand: Brand: Unknown",
        published: "May 31, 2022",
        bsr: "953",
        price: "19.99",
        sales: "111",
        reviews: "311",
        reviewCount: "4.8",
        avg30bsr: "52,115",
      },
      {
        asin: "B0CPR21WGM",
        Url: "https://www.amazon.com/Catzilla-Cat-Art-Funny-Gifts/dp/B0CPR21WGM/ref=sr_1_74?dib=eyJ2IjoiMSJ9.Ei1bQhwBx0ykviyt8AYoLF-T4xWjlO8nifnJvWF6ZABREl2VqQMLZKSIk-Q-DTR0dkwasbtxgNzNwvc7cv8ujZ2WPSIEQb8j4vkKt9GAqZMl83ntUjSdJoP6HPaghjvVSAsre7V0bP0t5dNgUUexumv0Bdf0tRGwWlD8vYUjGAiBpH8KSIQGyfNKWnAvQJwAGbUgMnBSArYMV7ebNE0lFumH94z1e2nMvtbVzbqiD6WIy1ZgFM8JppDIHnhtkzTL4MDefVPzEvKu-dgJ77TTqiUnBkjsxLZDlah-kVj7CBg.8i22qnMPrRuWTiphkrwsLGhxqQzMKDfIPgUvSeXLVIA&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666211&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-74",
        imageUrl:
          "https://m.media-amazon.com/images/I/81tatQBqLEL._AC_UL320_.jpg",
        title:
          "Catzilla Cat Japanese Art Funny Cat Gifts For Men Women Kid T-Shirt",
        bullet1:
          "Funny Vintage Cat Art Japanese Sunset graphic design for Women, Men, Boys, Girls, Teens, Kids, Mom, Dad, Mother, Father, Sister, Aunt, Wife, Husband, Uncle, Mommy, Mama, Daddy, Papa, Cat Lovers, Cat Dad, Cat Mom, Cat Owners.",
        bullet2:
          "Awesome outfits for Cat lovers. Perfect gift on Birthday, Mother's Day, Father's Day, Valentine's Day, 4th Of July, Pet's Day, Christmas, Halloween, Thanksgiving, All Season, Holidays and any Anniversary.",
        brand: "Brand: Funny Cat Lover Gifts Graphic Tees Art",
        published: "Dec 7, 2023",
        bsr: "953",
        price: "17.90",
        sales: "35",
        reviews: "264",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B0DNRY9DRJ",
        Url: "https://www.amazon.com/Brittany-Mahomes-Champions-FOCO-Premium/dp/B0DNRY9DRJ",
        imageUrl:
          "https://m.media-amazon.com/images/I/71TPz4+XaJL._AC_UL320_.jpg",
        title:
          "Womens Brittany Mahomes x Kansas City Chiefs NFL 4x Champions FOCO Premium T-Shirt",
        bullet1:
          "This premium t-shirt is made of lightweight fine jersey fabric",
        bullet2:
          "Fit: Men’s fit runs small, size up for a looser fit. Women’s fit is true to size, order usual size.",
        brand: "Brand: FOCO",
        published: "Nov 22, 2024",
        bsr: "3,832",
        price: "22.99",
        sales: "2",
        reviews: "0",
        reviewCount: "0",
        avg30bsr: "0",
      },
      {
        asin: "B0B6ZCH543",
        Url: "https://www.amazon.com/dp/B0B6ZCH543",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C81G7D2yU3RL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Eat Sleep Anime Gaming Repeat Kawaii Otaku Anime Manga T-Shirt",
        bullet1:
          "Eat Sleep Anime Gaming Repeat design. Do you or someone you know love Anime, Ramen And Video Games? Then get this Japanese Manga design for kids, youth, teen boys and girls anime lovers.",
        bullet2:
          "Anime, Video Games and Food, Cute for Christmas or Birthday for anime gaming lover. Watch Japanese anime movie and play video games with this anime clothing art merchandise with saying Eat Sleep Anime Gaming Repeat",
        brand: "Brand: Brand: Kawaii Anime Merch Manga For Men Women Kids",
        published: "Jul 19, 2022",
        bsr: "4,106",
        price: "19.99",
        sales: "141",
        reviews: "306",
        reviewCount: "4.7",
        avg30bsr: "38,225",
      },
      {
        asin: "B0DNRWZJVT",
        Url: "https://www.amazon.com/Brittany-Mahomes-Champions-FOCO-Premium/dp/B0DNRWZJVT/ref=sr_1_62?dib=eyJ2IjoiMSJ9.i_siCvqYm0smv4ugTV_w18A7DQ_72CX4jZNYGsqBbpSTT5rar3bNMdiveM5DdV6tFvA4ovvYQvZKmyUqS2HVONuPzDSmjnfOIpO9q6q9sETpn8q4uRlkBkgHFRs_tfN51OIUAc_FRjfYqNHuO-CpgzsCoHVyyvr99uW3xRgCGME4Wi7ldtbRh-p-jolitmAUdatOuFe0IbBzWWH9X06dkKKLHwk40_ZRfU5qRKgILxs5U452AZ7ObuG1_vRI6_FPWPC9RCb5Sxtj1rdPeEvoFy7tIVTnWXgLKgzzqQ3rJHA.6k_yFgfP-8MYkUYMoy6Ho5r8b49V7FhFvEz3BDZN-so&dib_tag=se&m=ATVPDKIKX0DER&qid=1733049034&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-62",
        imageUrl:
          "https://m.media-amazon.com/images/I/91n4LvaO-ZL._CLa%7C2140%2C2000%7C91PlDsoxFWL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX342_SY445_.png",
        title:
          "Mens Brittany Mahomes x Kansas City Chiefs NFL 4x Champions FOCO Premium T-Shirt",
        bullet1:
          "This premium t-shirt is made of lightweight fine jersey fabric",
        bullet2:
          "Fit: Men’s fit runs small, size up for a looser fit. Women’s fit is true to size, order usual size.",
        brand: "Brand: FOCO",
        published: "Nov 22, 2024",
        bsr: "4,463",
        price: "22.99",
        sales: "100",
        reviews: "0",
        reviewCount: "0",
        avg30bsr: "0",
      },
      {
        asin: "B099ZDRD8S",
        Url: "https://www.amazon.com/Im-Fukitol-Funny-Sarcasm-T-Shirt/dp/B099ZDRD8S/ref=sr_1_947?dib=eyJ2IjoiMSJ9.XuweyE6aBPFvj2KcTZJuoO-NQMZQkiTY6UNucMGEbOwvEZxzDh2tAdzyXxA13EWms4YH2cNiD24NsFamhhO8Cc2-Yuv5xyjzFbj764PPc7TTQZMBbGIiDVUwWo8v9_0PLHDRTM5HjEzjcfkEzq_LAqouST4ziY7Hqy4n4Mc7bgv-LTcCwDqqMFO_pxE2DHbSOy93oEhliWR2WBddCIfyuJbJPDxOEgmtjmK3hY3J6ecqwqYzMOIMpGk7LvMFTpwpoctmA9quIete1aCUm4h_7G7ex5hwgQRQTmrW7Xvr9hI.opXGudXObz2Gyt-aqrMFGI6fDxHt4c76Bl2HEsCDYg0&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666509&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-947",
        imageUrl:
          "https://m.media-amazon.com/images/I/61FT3e1MrML._AC_UL320_.jpg",
        title: "It's ok\" I'm on 500mg of Fukitol Funny Sarcasm T-Shirt",
        bullet1: "\"It's ok\" I'm on 500mg of Fukitol Funny Sarcasm T-Shirt",
        bullet2:
          "Grab this funny fukitol nurse design for yourself or someone close to you. wear this funny qoutes t design and generate some laughs at the party with this funny meme saying.",
        brand: "Visit the CAT Store",
        published: "Jul 21, 2021",
        bsr: "4,569",
        price: "18.58",
        sales: "10",
        reviews: "256",
        reviewCount: "4.7",
        avg30bsr: "0",
      },
      {
        asin: "B0DFH6N4SC",
        Url: "https://www.amazon.com/Cat-Ramen-Japanese-Graphic-Anime/dp/B0DFH6N4SC/ref=sr_1_273?ajr=3&dib=eyJ2IjoiMSJ9.Q6WtUCq_2m1sWKkBKdfNCCozp8f2WA_eiG09ol80SbX_NoXOo79n-S1g210To3HyV8zVaixLm5e-ZzLKXr6GO8JydnXV6P3RPopeT0h5FXtfehuXIJl78b8Dc-4amuxH24H6V0KfKw21Cgz1xbCNL9xkDBgSEGLhZu0Fpn-eBVkVv596GR7fQl2t11SOq78BiuQmzTXN76qVthBY1Z2wS5dCUPjPlTxSZWz0B7M0oveAw-k_bdcKHKj4k1pa_atazK4hjtq5vle-WYijRZ81ld0AqYZ8btgpXg1lF_KuvUY.JtpTvJqmEhvYCgEu7PEHeiR51tSiep8gJKLdO4LmrHQ&dib_tag=se&qid=1731662765&s=apparel&sr=1-273",
        imageUrl:
          "https://m.media-amazon.com/images/I/719sJEtEZ3L._AC_UL320_.jpg",
        title:
          "Cat Ramen Japanese Funny Graphic Tees Kawaii Cat Anime Gifts T-Shirt",
        bullet1:
          "Anime shirts for men women girls and boys cat ramen Japanese, graphic tees men kawaii cat anime gifts, anime stuff, Christmas gifts for men boys, girls anime lovers. funny gifts for men women Ramen Kawaii cat anime merch, anime gifts for men, women boys.",
        bullet2:
          "Graphic tees men women love anime Asian culture ramen, gifts for men women, funny graphic japanese cat art design mens christmas gifts, graphic tees men, funny mens graphic t-shirts, anime shirt, mens gifts for cat lovers. Cat shirts for women anime merch.",
        brand: "Brand: Anime Shirt For Men Women Kids Cat Ramen Noodles",
        published: "Aug 28, 2024",
        bsr: "4,739",
        price: "14.99",
        sales: "35",
        reviews: "17",
        reviewCount: "4.4",
        avg30bsr: "0",
      },
      {
        asin: "B07BZK52YK",
        Url: "https://www.amazon.com/Not-Old-Classic-Funny-Graphic/dp/B07BZK52YK/ref=sr_1_39?dib=eyJ2IjoiMSJ9.C2cxFzs7nvE9AWZjMfgvfW-gHGJf80oViZLy6xnKC8YwAp6GinJbK8kBFjwMoTztTAnlfCuKreQoYQGnNBPxiJCgs3F-0ysqtrD_CA4p-jK0eISURYuMnDKiM3x7-mYUUv9Oi7D3xVk1VNrmbjrXjcyryBxrQY45l6jJodfbNLjgZNVU6nvBo0i1kaja3By4KmlgN4foekaWCjIOlhpFG-NBUqI65let2fsrchhlZn_1hwzvhL0zrMglitxKl90mw0yKWPVJne4VU4coZPrbFvrQFDipRfXr945Z4S2pHxE.R1h3HWxUS7EZM2UmY0Pfmvt8SdL-dNd9CwddCclOt3Y&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666184&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-39",
        imageUrl:
          "https://m.media-amazon.com/images/I/71TRqjnL68L._AC_UL320_.jpg",
        title:
          "I'm Not Old I'm Classic Funny Car Graphic - Mens & Womens Short Sleeve T-Shirt",
        bullet1:
          "Friends & family will love this funny mens birthday slogan tee with a quote. Classic car graphic makes this the perfect gift for vehicle addicts & piston heads. Amazing Birthday present idea or Christmas gift for Dad & Grandad too. They'll love this!",
        bullet2:
          "Grunge, distressed design. Retro vintage look. Great Idea for Dad for Fathers Day 2020 or a 30th, 40th, 50th or 60th celebration! Born in 1990, 1980, 1970, 1960 or 1950? You'll LOVE this! Vehicle lovers will find this hilarious! Xmas for the men is sorted!",
        brand: "Brand: I'm Not Old I'm Classic Funny Car Graphic Co.",
        published: "Apr 5, 2018",
        bsr: "4,818",
        price: "19.99",
        sales: "100",
        reviews: "9",
        reviewCount: "4.7",
        avg30bsr: "0",
      },
      {
        asin: "B0BVQX6XWB",
        Url: "https://www.amazon.com/dp/B0BVQX6XWB",
        imageUrl:
          "https://m.media-amazon.com/images/I/A1vJUKBjc2L._CLa%7C2140%2C2000%7C71cVqJJue5L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Amazon Essentials Star Wars Mandalorian The Child Grogu Pram T-Shirt",
        bullet1: "Official Star Wars licensed product",
        bullet2: "n/a",
        brand: "Brand: null",
        published: "Feb 14, 2023",
        bsr: "4,977",
        price: "14.00",
        sales: "629",
        reviews: "39",
        reviewCount: "4.5",
        avg30bsr: "6,058",
      },
      {
        asin: "B07XT7GYQN",
        Url: "https://www.amazon.com/dp/B07XT7GYQN",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71aFS0YSjEL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "All Sport Trends Men Women Kids - Dallas vs all y'all T-Shirt",
        bullet1:
          "This Texas City pride is perfect for Men Women who loves Dallas apparel with vintage distressed print, new trends, sport apparel. Because Dallas vs all y'all",
        bullet2:
          "All Sport Dallas vs all y'all for everyone who support favorite team will love this new trends for women or men. It's a great gift idea for a Birthday, Christmas, Mothers Day or Fathers Day. People who love college and professional sport!",
        brand: "Brand: Brand: Trending All Sport Dallas vs all y'all Tees",
        published: "Sep 12, 2019",
        bsr: "5,215",
        price: "19.99",
        sales: "300",
        reviews: "55",
        reviewCount: "4.4",
        avg30bsr: "14,973",
      },
      {
        asin: "B08WMBFYWX",
        Url: "https://www.amazon.com/45-47-Trump-2024-T-Shirt/dp/B08WMBFYWX/ref=sr_1_6?dib=eyJ2IjoiMSJ9.C2cxFzs7nvE9AWZjMfgvfW-gHGJf80oViZLy6xnKC8YwAp6GinJbK8kBFjwMoTztTAnlfCuKreQoYQGnNBPxiJCgs3F-0ysqtrD_CA4p-jK0eISURYuMnDKiM3x7-mYUUv9Oi7D3xVk1VNrmbjrXjcyryBxrQY45l6jJodfbNLjgZNVU6nvBo0i1kaja3By4KmlgN4foekaWCjIOlhpFG-NBUqI65let2fsrchhlZn_1hwzvhL0zrMglitxKl90mw0yKWPVJne4VU4coZPrbFvrQFDipRfXr945Z4S2pHxE.R1h3HWxUS7EZM2UmY0Pfmvt8SdL-dNd9CwddCclOt3Y&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666184&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-6",
        imageUrl:
          "https://m.media-amazon.com/images/I/71-w3AILc3L._AC_UL320_.jpg",
        title:
          "Trump 2024 Vintage T-Shirt - Classic Fit, Crew Neck, Black Adult",
        bullet1: "N/A",
        bullet2: "N/A",
        brand: "Brand: Trump 2024 45 47 Vintage USA T",
        published: "Feb 15, 2021",
        bsr: "6,041",
        price: "15.95",
        sales: "100",
        reviews: "686",
        reviewCount: "4.7",
        avg30bsr: "0",
      },
      {
        asin: "B0CF1VZ5H4",
        Url: "https://www.amazon.com/dp/B0CF1VZ5H4",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C81NYpFX5ATL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Funny Gamer Shirt for Teens Boys Men Video Gaming T-Shirt",
        bullet1:
          "Unique gaming apparel, a perfect gaming themed gift idea for anyone who loves video gaming. Perfect for men, teenagers, teen boys, boys who love playing video games.",
        bullet2:
          "Sorry I Cant' Hear You I'm Gaming funny video gaming design is great for all the gamers, gaming enthusiasts or anyone who loves stuff with funny sayings.",
        brand: "Brand: Visit the Cat Store",
        published: "Aug 08, 2023",
        bsr: "6,598",
        price: "17.95",
        sales: "34",
        reviews: "48",
        reviewCount: "4.6",
        avg30bsr: "246,892",
      },
      {
        asin: "B07N8SKBLY",
        Url: "https://www.amazon.com/Plans-Garage-Mechanic-Shirt-Print/dp/B07N8SKBLY/ref=sr_1_1342?dib=eyJ2IjoiMSJ9.rFXjjBUpDVZz_4iPEQw2ahIy-Da29LsVgyRYLxfuQ2HImP3OgToi2K5S43ZHX7h9mrn0oqBMl4r6Xql01aadczwOv8lZV1NKqUSTk7YiJG3C8xRVHkXwLJ7lAvAvYWUsPBcLdY77vsmTbxxgHUEITOVrtmdocE0AzRlc-1YU2uVYWvb3BGsBHj0OsUeIrcw3Tx-pv3Lz5o9jD9kttKxM3BdjXogleUzEsjr1YsquQJaHfnE6g4VkWDIyhPlrpcLVDwaTW0KwfAYeuP_3-Lr7H1Q_4JStfn6bKZZaWEMY6jk.SVM-JWNeLK_jQddVeJ9X395_KAK3JTVCyg2dKH4sfyo&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666637&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-1342",
        imageUrl:
          "https://m.media-amazon.com/images/I/61fXYoBNPhL._AC_UL320_.jpg",
        title:
          "I Cant I Have Plans In The Garage Fathers Day Car Mechanics Short Sleeve T-Shirt",
        bullet1:
          "This funny design is the perfect idea for the mechanics and car guys in your life. Ideal for father's day or birthdays, every garage lover dad, grandpa, papa, or old man needs this in their tool kit. Available for men and women.",
        bullet2:
          "Whether you're working on a classic car, motorcylce, racing boat, or just having a beer before the upcoming race",
        brand: "Brand: I'll Be In The Garage Guys",
        published: "Jan 30, 2019",
        bsr: "6,601",
        price: "21.99",
        sales: "10",
        reviews: "5",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B08NYSSMHZ",
        Url: "https://www.amazon.com/dp/B08NYSSMHZ",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71cDkm4EeiL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Stop Staring At My Balls Funny Dirty Christmas Adult Humor T-Shirt",
        bullet1:
          "Stop Staring At My Balls funny Christmas quote for anybody who loves inappropriate jokes, adult humor, sarcastic sayings and dirty Christmas jokes. Funny nasty Christmas saying gift for men, husband, boyfriend.",
        bullet2:
          "Show your naughty and nasty side with this festive Holiday themed dirty joke 'Stop Staring At My Balls' at your Xmas party. For rude inappropriate adult humor and sarcastic quote fans.",
        brand: "Brand: Brand: Funny Dirty Christmas Rude Adult Humor",
        published: "Nov 20, 2020",
        bsr: "7,077",
        price: "19.95",
        sales: "52",
        reviews: "10",
        reviewCount: "5.0",
        avg30bsr: "135,026",
      },
      {
        asin: "B07N3GTZZH",
        Url: "https://www.amazon.com/dp/B07N3GTZZH",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140,2000%7C814j8SM6+OL.png%7C0,0,2140,2000+0.0,0.0,2140.0,2000.0._UL466_.png",
        title: "Awesome Like My Daughter T-Shirt Parents' Day Gift T-Shirt",
        bullet1:
          "Perfect Gift Idea for Mom / Dad from Daughter - Awesome Like My Daughter Shirt. Funny gag present from kids, boy, girl, wife for daddy, step dad, papa, husband, father in law, friend, buddy, grandpa, granddad, grandfather, men on Fathers / Mothers day 2024",
        bullet2:
          "Humor Saying Awesome Like My Daughter TShirt. Complete your collection of family proud accessories for him / her (matching outfit, necklace, clothes, fun hat, pajamas, bracelet, charm, collar, keychain, mug, sticker, picture frame, glass) with this Tee",
        brand: "Brand: Awesome Like My Daughter Shirts",
        published: "Jan 24, 2019",
        bsr: "8,047",
        price: "15.95",
        sales: "141",
        reviews: "294",
        reviewCount: "4.8",
        avg30bsr: "38,690",
      },
      {
        asin: "B0CJVL51V9",
        Url: "https://www.amazon.com/dp/B0CJVL51V9",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7CA1%2B%2B-S0xLqL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Funny Graphic Tee Capybara Selfie with UFOs Weird T-Shirt",
        bullet1:
          "Unique capybara graphic tee for men, women, teens, girls boys. Great capybara gift for anyone who loves capybara and UFO themed stuff.",
        bullet2: "n/a",
        brand: "Brand: Brand: Funny Tee",
        published: "Sep 26, 2023",
        bsr: "8,094",
        price: "15.95",
        sales: "229",
        reviews: "302",
        reviewCount: "4.7",
        avg30bsr: "20,861",
      },
      {
        asin: "B0CJCV8WCN",
        Url: "https://www.amazon.com/Paused-Welcome-Gamer-Gifts-T-Shirt/dp/B0CJCV8WCN/ref=sr_1_224?dib=eyJ2IjoiMSJ9.d6dISpJNaCYd3MacZBuOwyAOwZ1tv3LYqgofAqabR5DlaAa5cav1NIwvrE6IpDcv4WdR2kaIGcszWHuLG9yT8UaMXrVMbM7mHBTslVnOdIptcaSaN6NBl6KMm1cqpGgif7bEmkRceb7o3Atr4Mo17gpUFzZqX2pbazjbhUSdnuJM0ChQMtfLI9sdUI0Bi08i7J5scNzfeKxCbJwSZLjfWMhkzo-BAtkBFv2C9jLGRGQ7UihqcBX1yVliOOaTowRM9BDtyLAApGermHPYZBMhCxG2r_R9Xqt8qoPecFCVZC0.p4pSCbf03PLEGikXTP108T2_nmzJDck7noG3RaJQBHw&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666258&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-224",
        imageUrl:
          "https://m.media-amazon.com/images/I/71swpuLaIGL._AC_UL320_.jpg",
        title: "I Paused My Game To Be Here Teen Boy Gifts Video Gamer T-Shirt",
        bullet1:
          "I Paused My Game To Be Here This gamer shirt is a nice gamer gifts, gifts for gamers birthday gifts for teen boys, gifts for teen boys. gifts for teen boys 16-18, 14-16, 12-14. teen boy gift 13-15 and teen boy gifts 16-18, funny gamer gifts for men.",
        bullet2:
          "Gamer gifts for men I paused my game to be here funny gamer tee teenage boy gifts and 12, 13, 14 year old boy gifts and gifts for boys 8-12, 10-12. Gifts boys this is gamer shirt, gifts for gamers, gaming gifts, gaming gifts for men, gifts for gamers men.",
        brand: "Brand: Gamer Gifts For Teen Boys Men Gamer Shirt",
        published: "Sep 19, 2023",
        bsr: "8,286",
        price: "13.38",
        sales: "33",
        reviews: "57",
        reviewCount: "4.6",
        avg30bsr: "0",
      },
      {
        asin: "B0BVPR5MX2",
        Url: "https://www.amazon.com/dp/B0BVPR5MX2",
        imageUrl:
          "https://m.media-amazon.com/images/I/A1ntnF3PJOL._CLa%7C2140%2C2000%7C71I63UbvAAL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Amazon Essentials Disney Smiling Mickey in Red Circle T-Shirt",
        bullet1: "Official Disney licensed product",
        bullet2: "n/a",
        brand: "Brand: null",
        published: "Feb 14, 2023",
        bsr: "8,403",
        price: "14.00",
        sales: "422",
        reviews: "15",
        reviewCount: "3.2",
        avg30bsr: "9,830",
      },
      {
        asin: "B0BNR9RHVV",
        Url: "https://www.amazon.com/dp/B0BNR9RHVV",
        imageUrl:
          "https://m.media-amazon.com/images/I/A1vJUKBjc2L._CLa%7C2140%2C2000%7C91cX%2BJDCviL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Fishing-Shirt Here-Fishy Funny T-Shirt",
        bullet1:
          "Here Fishy vintage graphic tee Funny Sayings great gifts for Men, toddler Women, Boys and Girls Who Love Fishing, Fisherman Fishing Gifts, Fishing Boots Or Fly Fish. Funny Fisherman Outfit Gifts for everyone who loves fishing;Funny Fisherman Outfit apparel",
        bullet2:
          "Retro distressed graphic Funny Sayings Fishing for your kids little youth toddler baby girl girlfriend daughter, buddy, parents, niece auntie wife sister. makes an awesome fathers day idea for your dad from your son, daughter",
        brand: "Brand: Visit the Cat Store",
        published: "Dec 01, 2022",
        bsr: "8,615",
        price: "15.95",
        sales: "112",
        reviews: "146",
        reviewCount: "4.6",
        avg30bsr: "51,004",
      },
      {
        asin: "B07KRFT4T8",
        Url: "https://www.amazon.com/dp/B07KRFT4T8",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91mQ4Uzfe%2BL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "I Do It For The Ho's Funny Inappropriate Christmas Men Santa T-Shirt",
        bullet1:
          "I Do It For The Ho's Funny Ho Ho Santa Claus Christmas Inappropriate Design This funny Xmas graphic print featuring Santa hat and sunglasses is perfect for rude and naughty adult men with hilarious sense of humor at a pajama or PJ costume party.",
        bullet2:
          "This cool graphic art style is a great design for cheerful or joyful men who believe Santa Claus is real on a Merry Little Christmas Eve. Merry Christmas!",
        brand: "Brand: Most Wonderful Christmas Adult Co",
        published: "Nov 21, 2018",
        bsr: "9,003",
        price: "18.99",
        sales: "77",
        reviews: "833",
        reviewCount: "4.7",
        avg30bsr: "81,388",
      },
      {
        asin: "B077RN8W78",
        Url: "https://www.amazon.com/dp/B077RN8W78",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140,2000%7C711jHQMeaML.png%7C0,0,2140,2000+0.0,0.0,2140.0,2000.0._UX466_.png",
        title: "Just Because I'm Awake Funny Tshirt for Tweens and Teens",
        bullet1:
          "The 'Just Because I'm Awake Doesn't Mean I'm Ready to Do Stuff' is the perfect design for your tween or teen boy or girl. It's good for adults too. Buy this funny tee for your son, daughter, husband, wife or friend.",
        bullet2:
          "Buy this for your son, daughter, husband, wife or friend. They will get a laugh out of it, and so will you. Humorous apparel for all ages",
        brand: "Brand: Awake Funny Tees",
        published: "Apr 23, 2018",
        bsr: "9,051",
        price: "19.99",
        sales: "71",
        reviews: "920",
        reviewCount: "4.7",
        avg30bsr: "93,027",
      },
      {
        asin: "B0D9979H2P",
        Url: "https://www.amazon.com/Snowflake-Removal-Service-Trump-2024/dp/B0D9979H2P/ref=sr_1_228?dib=eyJ2IjoiMSJ9.d6dISpJNaCYd3MacZBuOwyAOwZ1tv3LYqgofAqabR5DlaAa5cav1NIwvrE6IpDcv4WdR2kaIGcszWHuLG9yT8UaMXrVMbM7mHBTslVnOdIptcaSaN6NBl6KMm1cqpGgif7bEmkRceb7o3Atr4Mo17gpUFzZqX2pbazjbhUSdnuJM0ChQMtfLI9sdUI0Bi08i7J5scNzfeKxCbJwSZLjfWMhkzo-BAtkBFv2C9jLGRGQ7UihqcBX1yVliOOaTowRM9BDtyLAApGermHPYZBMhCxG2r_R9Xqt8qoPecFCVZC0.p4pSCbf03PLEGikXTP108T2_nmzJDck7noG3RaJQBHw&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666258&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-228",
        imageUrl:
          "https://m.media-amazon.com/images/I/71ZWBSgKM+L._AC_UL320_.jpg",
        title: "Trump's Snowflake Removal Service Funny Trump 2024 T-Shirt",
        bullet1: "Anti Kamala Harris funny vintage style design",
        bullet2: "N/A",
        brand: "Brand: Trump 2024 Victory Snowflake Removal Service T's",
        published: "Jul 11, 2024",
        bsr: "9,150",
        price: "15.95",
        sales: "33",
        reviews: "2",
        reviewCount: "5.0",
        avg30bsr: "0",
      },
      {
        asin: "B07WQ5QB83",
        Url: "https://www.amazon.com/Never-Forget-Shirt-Science-T-Shirt/dp/B07WQ5QB83/ref=sr_1_1066?dib=eyJ2IjoiMSJ9.rLwlymG908gFF7neKIVEg91flTvj3FBhXTAoF1s0ormsYL4h0uvcFc1hFnKbfX78-ONKiqyuLg3yf306KBpmAHTfoWRDnBUM9iVUc6hXM2kJB3_WYF0ze_oiwjpz0JMLbOyIfUtSPAEHY4tkS41DfPi_VJfCCxm3dRUvTv3D7-5rgXR0OthCr9IARI9hIGbhRC6uM4JdaM_iD9683X7YG18QWNpfqPHNQytypYnxElss379moGVB0j86yFx7x2SMKs8kV-oN-pUf0IkP_mhK8Yx64an-Yf0tsB1Qb2wKOqA.D2COx0FKIhAOasF164Eb_xtpoK3iJ29JjtGI0KkguFg&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666554&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-1066",
        imageUrl:
          "https://m.media-amazon.com/images/I/71qqHuzp7aL._AC_UL320_.jpg",
        title:
          "Never Forget Pluto Shirt. Retro Style Funny Space Science T-Shirt",
        bullet1: "Retro Never Forget Pluto Funny Space Shirt.",
        bullet2:
          "Never Forget Pluto, Funny Space T-Shirt Gift for Men and Women T Shirt. Vintage Style",
        brand: "Brand: FIAHNG",
        published: "Aug 14, 2019",
        bsr: "9,250",
        price: "19.99",
        sales: "10",
        reviews: "4",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B0CVLK64P5",
        Url: "https://www.amazon.com/Pok%C3%A9mon-Snorlax-Sleeping-Today-T-Shirt/dp/B0CVLK64P5/ref=sr_1_9731?dib=eyJ2IjoiMSJ9.t3vJlPguV0kn1ycmrBJ6k4n3hgRxkBqF8giX8XSOYYr5UFn09RlQQ5pQLP0COvP6RFUMxns6MWF-QfyINcXo7LACRP7B1bI04TTO1aKvuAV_In4Iicnn0r5ftgYDIXfw5cHnO0vRr2E_d_yo5_qkiI2HBDPiCQtR4pPEFQt3cuoR9x8V9yDHF8ye0VZy5MIlPJqlyOYGgrTumuv7cL-X2ND0zvgrBpKtJdkXAaF1yZ9vEP2jduYiy-wVN9WJohgH1E3fwdpIQpHi9R72we2zKFnnxwxuCb3pXpT0Ep4pdPA.nE_m0H7OdHjvxYghTnsMAFdMLP8G1GvpEtoPIzbob8w&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731679560&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-9731",
        imageUrl:
          "https://m.media-amazon.com/images/I/61GYplTas4L._AC_UL320_.jpg",
        title: "Pokémon - Snorlax Sleeping Nope Not Today T-Shirt",
        bullet1: "Officially Licensed by Pokémon",
        bullet2: "Graphic Artwork: H25515",
        brand: "Brand: Pokemon",
        published: "Feb 13, 2024",
        bsr: "9,366",
        price: "22.99",
        sales: "1",
        reviews: "6",
        reviewCount: "4.1",
        avg30bsr: "0",
      },
      {
        asin: "B07KRCGWHR",
        Url: "https://www.amazon.com/dp/B07KRCGWHR",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C61WhFMjqDHL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Oh Shit Funny White Elephant Gifts for Adults Under 15 20",
        bullet1:
          "FUNNY Oh Shit I Picked The Wrong White Elephant Gift T-Shirt Tshirt Tee Shirt - Worst Best White Elephant Gift Ever Shirt! PERFECT for office Christmas parties coworkers funny best White Elephant Gifts Funny for Adults Under 15 20 25 30.",
        bullet2:
          "BE THE STAR OF YOUR GIFT EXCHANGE! Our shirts are the PERFECT gift for your white elephant gift exchange - take yours home today! Perfect office Christmas party coworker gift! WHITE ELEPHANTS MATTER!",
        brand: "Brand: Best White Elephant Gifts for Adults",
        published: "Nov 21, 2018",
        bsr: "9,499",
        price: "14.95",
        sales: "98",
        reviews: "472",
        reviewCount: "4.7",
        avg30bsr: "59,984",
      },
      {
        asin: "B0CYQ93QD9",
        Url: "https://www.amazon.com/Awesome-Like-Daughter-Gifts-Fathers/dp/B0CYQ93QD9/ref=sr_1_168?dib=eyJ2IjoiMSJ9.D2a45LCqMUZmcehOhdTM8SSan1ddCwEvel7_GTnPK82b7i8vfkFd6fvRgiKapvKkt03-ONEjVRFX9LvKxJ5XFpgnfqNvslg1jtUzUveVhfu5dKi0zWy8SPAmjkDFb3hJKzjzt1EevmiK4F05pIUEoatNFpSpfnJiL5DRgO1bw8VbuMXpFzREe4h7K6gDG8_b8unjP5IvygM_vqRGd4hbBypj7ah2nbRk7mXua2YdZFfoSaq5quF6PofaxjMNXDUCttAUdvHjr5LOA6DewTU1uzho2wf-t5UPjNM6PJrKMyk.HdXVPOFJNQR1yyBBtcv7CaokEwb2jYlQRGFLu1T64RE&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666242&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-168",
        imageUrl:
          "https://m.media-amazon.com/images/I/61AyGAPqhmL._AC_UL320_.jpg",
        title:
          "Awesome Like My Daughter Gifts Men Funny Fathers Day Dad T-Shirt",
        bullet1:
          "Awesome like my daughter Shirt fathers day funny fathers day shirts for dad, Christmas gifts for dad or gifts for fathers day tee features cute saying, fathers day gifts from daughter. Fathers day shirt fathers day gifts for dad celebrate fathers day.",
        bullet2:
          "Fathers day gifts from daughter idea great father's day gifts, gifts for dad, Christmas gifts, gift for dad, dad shirt. Funny gifts for dad, fathers day gifts from daughter, dad gift, dad Christmas gifts from daughter to show love for his daughter.",
        brand: "Brand: Awesome Like My Daughter Shirt Fathers Day Gifts",
        published: "Mar 21, 2024",
        bsr: "10,046",
        price: "14.99",
        sales: "35",
        reviews: "332",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B0D1MP1MSM",
        Url: "https://www.amazon.com/Trump-2024-Daddys-Home-Pink/dp/B0D1MP1MSM/ref=sr_1_1?dib=eyJ2IjoiMSJ9.C2cxFzs7nvE9AWZjMfgvfW-gHGJf80oViZLy6xnKC8YwAp6GinJbK8kBFjwMoTztTAnlfCuKreQoYQGnNBPxiJCgs3F-0ysqtrD_CA4p-jK0eISURYuMnDKiM3x7-mYUUv9Oi7D3xVk1VNrmbjrXjcyryBxrQY45l6jJodfbNLjgZNVU6nvBo0i1kaja3By4KmlgN4foekaWCjIOlhpFG-NBUqI65let2fsrchhlZn_1hwzvhL0zrMglitxKl90mw0yKWPVJne4VU4coZPrbFvrQFDipRfXr945Z4S2pHxE.R1h3HWxUS7EZM2UmY0Pfmvt8SdL-dNd9CwddCclOt3Y&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666184&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-1",
        imageUrl:
          "https://m.media-amazon.com/images/I/71rxe7OTG9L._AC_UL320_.jpg",
        title:
          "Trump 2024 Take America Back Daddy's Home Trump Pink 2024 T-Shirt",
        bullet1:
          "Trump 2024 Take America Back, Daddy's Home Trump Pink 2024 Men Women Shirt. Great for mom, dad, grandfather, grandmother, for papa, mama, auth, uncle, sister, brother. Holiday for mothers day, fathers day, Patrick's Day..",
        bullet2: "N/A",
        brand: "Brand: Trump 2024 Daddy's Home Pink Tee",
        published: "Apr 13, 2024",
        bsr: "10,300",
        price: "16.99",
        sales: "100",
        reviews: "108",
        reviewCount: "4.1",
        avg30bsr: "0",
      },
      {
        asin: "B07WVW4FWS",
        Url: "https://www.amazon.com/Mouse-Funny-Lover-Parody-T-Shirt/dp/B07WVW4FWS/ref=sr_1_1269?dib=eyJ2IjoiMSJ9.DMPHcv0B1FhBppy-cb8_Rov-DxLGdf9VQhcsaMnVrw4aURmooJ5rmJyuJIcdhDPIRPfI8fqX1FS5kne5pkeS6ixy9BFkrr2B0U4tb3eevBY5-yad2Bt9t9QvzcVrkmtJgxG4pnWXApT56u5lXdav-9LZ7ltiMU7iMvrW9tZ4YrKsnh7SQnYPzEV-kR2ZAanw8gltP0oTmsBgfj1MkV-4FUgKErOMhgShFqsorAPcVy_3AQ_JDdrK8g9EROWnYz6s8xaD5QKzAuw3GEpDdGvkENrm6E4cKcjBCSDdMofTz6M.tGaAc31QjA-jHhIOftOTRoee7sI1FDjTIuj6ifivzhY&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666620&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-1269",
        imageUrl:
          "https://m.media-amazon.com/images/I/71N3k7PgnjL._AC_UL320_.jpg",
        title: "Paws Cat and Mouse Top, Cute Funny Cat Lover Parody T-Shirt",
        bullet1:
          "It's back! The best “Paws Cat and Mouse” Design out there by MAD LABS TEES! Get it now for the special Cat or fluffy Kitten Lover in your life who you know will just love this!",
        bullet2:
          "Purrfect Cute Cat Lover gift for birthdays or Christmas! Click on MAD LABS TEES in blue at the top for more awesome stuff!",
        brand: "Brand: xiongying",
        published: "Aug 20, 2019",
        bsr: "10,460",
        price: "20.97",
        sales: "10",
        reviews: "2",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B09DQBGTJL",
        Url: "https://www.amazon.com/Nice-Naughty-Insufficient-Evidence-Christmas/dp/B09DQBGTJL/ref=sr_1_730?dib=eyJ2IjoiMSJ9.VMCDIZi_HTWbc1AjVpsuEOTxrf2wiZbh-Fk7r73c3icMa8LjfYDffeUx-jT2ZncZmz4eSiCtdad4_ksDWmNAq12es7xQ8s3mo2-dZdoC0EV-egH4WDBDQFlBt-a_fFNOpuNNreOPC-gKsilfSTzyHQVc7eZp5HvwGlVSIoCQbDZmH_bfLVGdB8GjmLYIlrfuJqMbi11BmELPD3_tb4URB6ZmJYXlll4EdLtyLgmoBRs-QFuoFgBL0OnL2_r4RlLq_ZVKubyIc1H9hcIvlxU6NXV1jJKmwPyqwSbU6S9hXRc.sUHerA6u1Tb4MGVRWA-Y1jMJDviimcnKkhU69Z8yE7g&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666444&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-730",
        imageUrl:
          "https://m.media-amazon.com/images/I/61cUaFWLB0L._AC_UL320_.jpg",
        title:
          "Nice Naughty Insufficient Evidence Christmas Santa Claus T-Shirt",
        bullet1:
          "Nice Naughty Insufficient Evidence - This funny naughty or nice list design is ideal for people who like Santa Claus, Father Christmas or Saint Nicholas and are celebrating the annual festival with family and friends on christmas eve.",
        bullet2:
          "This is for those who like celebrating the season of Christmastide and gift-giving. Ideal for those who love seeing Christmas trees, Christmas lights or nativity scenes. Perfect for the day of Noël, Nativity or Xmas.",
        brand: "Brand: Nice Naughty List Funny Christmas",
        published: "Aug 26, 2021",
        bsr: "10,519",
        price: "19.99",
        sales: "10",
        reviews: "75",
        reviewCount: "4.6",
        avg30bsr: "0",
      },
      {
        asin: "B0CDQHVKPR",
        Url: "https://www.amazon.com/Axolotl-Kawaii-Axolotls-Animals-T-Shirt/dp/B0CDQHVKPR/ref=sr_1_191?dib=eyJ2IjoiMSJ9.D2a45LCqMUZmcehOhdTM8SSan1ddCwEvel7_GTnPK82b7i8vfkFd6fvRgiKapvKkt03-ONEjVRFX9LvKxJ5XFpgnfqNvslg1jtUzUveVhfu5dKi0zWy8SPAmjkDFb3hJKzjzt1EevmiK4F05pIUEoatNFpSpfnJiL5DRgO1bw8VbuMXpFzREe4h7K6gDG8_b8unjP5IvygM_vqRGd4hbBypj7ah2nbRk7mXua2YdZFfoSaq5quF6PofaxjMNXDUCttAUdvHjr5LOA6DewTU1uzho2wf-t5UPjNM6PJrKMyk.HdXVPOFJNQR1yyBBtcv7CaokEwb2jYlQRGFLu1T64RE&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666242&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-191",
        imageUrl:
          "https://m.media-amazon.com/images/I/71rs5rflXkL._AC_UL320_.jpg",
        title: "Axolotl Kawaii Axolotls of the World Axolotl Animals T-Shirt",
        bullet1:
          "Stand out as an axolotl lover with this axolotl shirt. It features cute and kawaii artwork of different types of Mexican walking fish, also known as Axolotls. Also, kids, teens, and adults who have a pet like a Mexican salamander will love this.",
        bullet2:
          "Experts in animals like amphibians and in the herpetology field, like herpetologists, might find this axolotl merchandise interesting. Aside from that, animal lovers and pet lovers who are looking for axolotl shirts will appreciate this axolotl tshirt.",
        brand: "Visit the Wowsome! Store",
        published: "Aug 4, 2023",
        bsr: "10,691",
        price: "19.99",
        sales: "27",
        reviews: "130",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B07SLG7471",
        Url: "https://www.amazon.com/dp/B07SLG7471",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C913LuLSO9fL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Mens Vintage Retro Funny Gifts for Dad Papa | Papa like a Grandpa T-Shirt",
        bullet1:
          "This eye-catching shirt design with a sunset background and bold text is perfect for any parent looking to express fatherhood in style and makes a great gift for friends and family, especially for Dads, Papas, and Grandpas. It's sure to turn heads!",
        bullet2:
          "Ideal for any occasion, whether it's Father's Day, a birthday, Thanksgiving, Christmas or just because, this t-shirt is a great way to show your appreciation for the special papa in your life. Let everyone know that your papa is a cool and hip grandfather.",
        brand: "Brand: Funny Shirt For Dad Gifts Papa Gifts Grandpa Gifts",
        published: "May 30, 2019",
        bsr: "10,771",
        price: "19.99",
        sales: "47",
        reviews: "1,688",
        reviewCount: "4.8",
        avg30bsr: "151,943",
      },
      {
        asin: "B0934BM6KC",
        Url: "https://www.amazon.com/dp/B0934BM6KC",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91dvFLDXGoL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Star Wars Christmas AT-AT Walker Dashing Through The Snow T-Shirt",
        bullet1: "Officially Licensed Star Wars Apparel",
        bullet2: "20STRW00742A-001",
        brand: "Brand: Visit the STAR WARS Store",
        published: "Apr 21, 2021",
        bsr: "10,865",
        price: "22.99",
        sales: "81",
        reviews: "66",
        reviewCount: "4.8",
        avg30bsr: "76,348",
      },
      {
        asin: "B0DJCKT33V",
        Url: "https://www.amazon.com/Christmas-Great-Again-Funny-Trump/dp/B0DJCKT33V",
        imageUrl:
          "https://m.media-amazon.com/images/I/71GrzziSExL._AC_UL320_.jpg",
        title:
          "Make Christmas Great Again Xmas Funny Trump Pajamas Ugly T-Shirt",
        bullet1:
          "bout this item Make Christmas Great Again Xmas Funny Trump Pajamas Ugly. This Lazy, Ugly Shirt For Women And Men Fits On Every Pajama, Pj Party. Perfect For Cozy Holidays Or As A Last Minute Present. Santa Will Be Generous With Novelty This Xmas.",
        bullet2:
          "Funny Santa Christmas Xmas. Whether Elf, Cookies, Reindeer, Snowflakes, Socks Or Xmas Cards Let's Get Cozy This Winter. Put On This Oh Christmas Tree Your Ornaments Are Hirstory Christmas Pajama Shirt, Tee And Your Santa Hat And Enjoy Family Dinner",
        brand: "Brand: Santa Hat Trump Make Christmas Great Again Funny",
        published: "Oct 1, 2024",
        bsr: "11,351",
        price: "14.95",
        sales: "100",
        reviews: "0",
        reviewCount: "0",
        avg30bsr: "0",
      },
      {
        asin: "B08KHTLL15",
        Url: "https://www.amazon.com/dp/B08KHTLL15",
        imageUrl:
          "https://m.media-amazon.com/images/I/B1qmQK-r4OS._AC_CLa%7C2140%2C2000%7CA1GktlKehsL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL466_.png",
        title: "Shark Faces - Type of Shark - Shark Faces of All Kinds T-Shirt",
        bullet1:
          "Shark Faces - Type of Shark - Shark Faces of All Kinds - Type of Shark Faces",
        bullet2: "n/a",
        brand: "Brand: Shark Faces - Type of Shark - Shark Faces of All",
        published: "Oct 01, 2020",
        bsr: "11,409",
        price: "19.50",
        sales: "147",
        reviews: "410",
        reviewCount: "4.7",
        avg30bsr: "36,611",
      },
      {
        asin: "B0CFZVWPSN",
        Url: "https://www.amazon.com/Three-Possum-Opossum-Cursed-T-Shirt/dp/B0CFZVWPSN/ref=sr_1_312?dib=eyJ2IjoiMSJ9.PDP99GUdeGzZ9qZ4LK_yCPXYx1E4qu6YVeYsixDFguJnV0MmZXfbArMyRLhBUnW4FTFakCX5RLadIzihRr2ycyyGKHzS678wn6avGcYfpb7vJZWmOTHN4aooAYma-Zy4VLMDYhsO7QePnAnrFGAxHaGpu4W7vvvg4Nm3qM-RB9k1X3lsSXy8TFkxc45bA04cojcFII8Z9UfhGb4YpIzy4HvVRxGxAltvBThZwtNzRXPp5MCtkBMWfApTzpGmrlB_sbRi44l4w6aXJlqBZLwsaHZL4bqvFSaARxj3lxaPR2c.-4SJr0wWvSEIZ9b54uZBOP3-u2-e6ih70j-iVQhzCJE&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666289&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-312",
        imageUrl:
          "https://m.media-amazon.com/images/I/71SaZNyuzeL._AC_UL320_.jpg",
        title: "Three Possum Moon | 3 Opossum Funny Weird Cursed Meme T-Shirt",
        bullet1:
          "In the cursed Three Opossum Moon region, possums don't just howl, they channel magical energy from the moon. Ever heard of the 3 Possum Moon meme? It's more than a joke – it's a nod to the mystical magic of the Possum race.",
        bullet2:
          "The Three Possum Moon isn't just a fashion statement. Rumor has it, it's magic. Those who wear it speak of mysterious possum encounters as it's said to tap into the Possom Kingdome's mystical power. Wear if you dare!",
        brand: "Brand: MagicMoon",
        published: "Aug 17, 2023",
        bsr: "11,603",
        price: "23.95",
        sales: "24",
        reviews: "206",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B07H3J6G22",
        Url: "https://www.amazon.com/Distressed-American-Flag-Vintage-Patriotic/dp/B07H3J6G22/ref=sr_1_1128?dib=eyJ2IjoiMSJ9.mQ4uB7EMwF1eIFwc3RIqgHtFZpI-EWdxsK8XCoKoInavrTSAmZVvebnsS07skdmO7c4jzXqzWAhlaIdVhKfMlNTlxtwzDKI1xFkV68WpNbfqNqxNC9Q3AVLSfXBhVM4ykZwWvlVaxVMH-H6MKX4L0O2COPClXgevUMW4TMEXKPWbbFz8NkFyrqUi4KQcmy9wUsm-gxCsF47eqP7R-DVkPgSbOt_2-42zddtIgv_SpwHm5l_0h3Q5hCvecEuHbOhbQMmegtB3YGgXrttt2HlzI6GBfHCXJo6HXU8fLF-yJ3Y.MoIqZhthp7bOb6KSt_Wq6ZHIGF6vo8pezDoqDGe7UTI&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666570&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-1128",
        imageUrl:
          "https://m.media-amazon.com/images/I/71337nnCzhL._AC_UL320_.jpg",
        title: "Hoodie Vintage USA Flags Patriotic Pullover Hoodie",
        bullet1:
          "Distressed American Flag pullover hoodie for men, women, girl, boy, teens, teenager, juniors, young, kids, childrens. Vintage, Dirty, Damaged & grunge Usa flag t-shirt us flags tshirts merica stars and stripes tees shirts jackets for woman man girl boy.",
        bullet2:
          "Excellent gift idea for 4th of July, Independence Day, 9/11, Memorial & Armed Force Day, her him. Graphic vintage hooded apparel clothing clothes hoodies dresses dress party gifts ideas activewear jackets tops equipment xmas presents for womens mens.",
        brand: "Brand: Distressed American Flag",
        published: "Sep 4, 2018",
        bsr: "11,674",
        price: "31.98",
        sales: "7",
        reviews: "454",
        reviewCount: "4.5",
        avg30bsr: "0",
      },
      {
        asin: "B0C2DRMRDS",
        Url: "https://www.amazon.com/dp/B0C2DRMRDS",
        imageUrl:
          "https://m.media-amazon.com/images/I/B1DnWZEQ8ES._CLa%7C2140%2C2000%7C61ZIhLXALRL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "I Survived the Snyder Era - Washington D.C. Football T-Shirt",
        bullet1: "Featuring custom artwork by BreakingT.",
        bullet2: "n/a",
        brand: "Brand: Visit the BreakingT Store",
        published: "Apr 13, 2023",
        bsr: "11,974",
        price: "31.99",
        sales: "167",
        reviews: "23",
        reviewCount: "4.7",
        avg30bsr: "30,910",
      },
      {
        asin: "B0DJKVM3HV",
        Url: "https://www.amazon.com/Always-White-Fox-Pullover-Hoodie/dp/B0DJKVM3HV/ref=sr_1_171?dib=eyJ2IjoiMSJ9.D2a45LCqMUZmcehOhdTM8SSan1ddCwEvel7_GTnPK82b7i8vfkFd6fvRgiKapvKkt03-ONEjVRFX9LvKxJ5XFpgnfqNvslg1jtUzUveVhfu5dKi0zWy8SPAmjkDFb3hJKzjzt1EevmiK4F05pIUEoatNFpSpfnJiL5DRgO1bw8VbuMXpFzREe4h7K6gDG8_b8unjP5IvygM_vqRGd4hbBypj7ah2nbRk7mXua2YdZFfoSaq5quF6PofaxjMNXDUCttAUdvHjr5LOA6DewTU1uzho2wf-t5UPjNM6PJrKMyk.HdXVPOFJNQR1yyBBtcv7CaokEwb2jYlQRGFLu1T64RE&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666242&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-171",
        imageUrl:
          "https://m.media-amazon.com/images/I/71fG2AdRRlL._AC_UL320_.jpg",
        title: "With Love Always White Fox Vol.7 Gifts Pullover Hoodie",
        bullet1:
          "With Love Always White Fox Vol.7 Gifts, White Fox Gift T-Shirt for men woman",
        bullet2:
          "This graphic tee is a great outfit or clothes for men, women, father, mother, grandma. This Tees is also great for birthday gifts, Father's Day, Mother's Day, Independence Day, Labor Day, Memorial Day, Thanksgiving, Christmas, Xmas.",
        brand: "Brand: White Fox Gift T-Shirt for men woman",
        published: "Oct 6, 2024",
        bsr: "11,981",
        price: "34.99",
        sales: "23",
        reviews: "0",
        reviewCount: "0",
        avg30bsr: "0",
      },
      {
        asin: "B0DMK1SXH1",
        Url: "https://www.amazon.com/Funny-Trump-Ugly-Christmas-Sweater/dp/B0DMK1SXH1",
        imageUrl:
          "https://m.media-amazon.com/images/I/811tjFGzu-L._AC_UL320_.jpg",
        title:
          "Funny Daddy's Home Trump Ugly Christmas Sweater Xmas Pajamas Sweatshirt",
        bullet1:
          '" A humorous outfit great for Democrats, Republicans, or anyone with a playful spirit. Great for Christmas, birthdays, New Year, or costume parties, this festive design combines holiday cheer with a patriotic USA theme."',
        bullet2:
          "The \"Daddy's Home or I'll Be Home For Christmas\" Ugly Sweater or Pajama Shirt is a playful holiday outfit for both adults and kids who love funny designs featuring Santa, snowflakes, and ornaments.",
        brand: "Brand: Funny Trump Xmas Lights Ugly Christmas Sweater T",
        published: "Nov 9, 2024",
        bsr: "12,029",
        price: "28.95",
        sales: "100",
        reviews: "0",
        reviewCount: "0",
        avg30bsr: "0",
      },
      {
        asin: "B0CFLL4LTL",
        Url: "https://www.amazon.com/dp/B0CFLL4LTL",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7CA175DBQ5DPL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Jesus Is My Savior Trump Is My President Trump 2024 USA Flag T-Shirt",
        bullet1:
          "Donald Trump can run in the 2024 election and serve his second term being the 47th and 45th president of the United States. If you value republican and conservatives policies then this is perfect tee gift for you. Together we'll take America back!",
        bullet2: "n/a",
        brand:
          "Brand: Brand: American Flag Trump 2024 Election Supporter Gifts",
        published: "Aug 14, 2023",
        bsr: "12,162",
        price: "18.99",
        sales: "358",
        reviews: "53",
        reviewCount: "4.7",
        avg30bsr: "12,042",
      },
      {
        asin: "B0CKWNJR34",
        Url: "https://www.amazon.com/Taylor-First-Name-Vintage-T-Shirt/dp/B0CKWNJR34/ref=sr_1_546?dib=eyJ2IjoiMSJ9.PtfUCaeKct-B41EyFB1k9RtULlRIXosU39M8TIwbP2n2RlD6QkuA7g36s9i6t6UgLdm31fPOLGWwzjnqab8WM_ZfLQJrxniQ76uvDoZid8fgSqcNfuLPUBrfglppX5OlEHZO2I7J9-Qq9AzakKjE5wDI-v8bj7zQ6CY7mH900V4_zW0NU8wxnzQLYDn_RUrywcI_c40xY4uBoyuwYzUfy-hRQ0mlpCjYHGKRsyoI19KS_BFI1_xSg8uMInNg04La_H_tlM1Yav1tG2u5tQab3aj8c7bS93NJOUHPve3rJuo.lSKHFl6FrIvH8yZ3P3qkWnpFVMBEoYFuAjdqQb63ONk&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666374&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-546",
        imageUrl:
          "https://m.media-amazon.com/images/I/71HefUcZrDL._AC_UL320_.jpg",
        title: "Retro Taylor First Name Vintage Taylor T-Shirt",
        bullet1:
          "It's a Taylor Thing you wouldn't Understand First Name tee present for Women’s, Men’s, friend or family member on this Christmas.",
        bullet2: "Retro Taylor First Name Vintage Taylor.",
        brand: "Brand: Taylor First Name Apparel",
        published: "Oct 11, 2023",
        bsr: "12,204",
        price: "18.99",
        sales: "21",
        reviews: "17",
        reviewCount: "4.7",
        avg30bsr: "0",
      },
      {
        asin: "B08MDK36F3",
        Url: "https://www.amazon.com/dp/B08MDK36F3",
        imageUrl:
          "https://m.media-amazon.com/images/I/A1ntnF3PJOL._AC_CLa%7C2140%2C2000%7C81BXQmFc5kL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL466_.png",
        title:
          "Funny Black Cat Gift Pushing Christmas Tree Over Cat What? T-Shirt",
        bullet1:
          "A great gift idea for cat lovers, cat owners, crazy cat lady, cat mom, or anyone who loves cat clothing with funny sayings. Beautiful gift for women or men who love black kitties. Unique present for New Year, Christmas, Valentine's Day or Mother's Day",
        bullet2:
          "So great horror tee for this Halloween. Xmas Christmas Tree Looking for a funny cat shirt? Is your cat full of personality? If you're looking for a funny shirts for cats, funny cat shirts, cat themed gifts, birthday gifts for cats, or cat lovers gifts",
        brand: "Brand: Cat What Christmas Tree Tops",
        published: "Oct 31, 2020",
        bsr: "12,344",
        price: "19.99",
        sales: "79",
        reviews: "444",
        reviewCount: "4.6",
        avg30bsr: "79,739",
      },
      {
        asin: "B0DKN3XN4Z",
        Url: "https://www.amazon.com/Vintage-Humorous-Trump-Home-Christmas/dp/B0DKN3XN4Z",
        imageUrl:
          "https://m.media-amazon.com/images/I/71DWDP60A3L._AC_UL320_.jpg",
        title:
          "Vintage Funny Humorous Trump I’ll Be Home For Christmas 2024 T-Shirt",
        bullet1:
          "Vintage Funny Humorous Trump I’ll Be Home For Christmas 2024 t-shirt",
        bullet2: "Vintage Humorous Trump I’ll Be Home For Christmas shirt",
        brand: "Brand: Vintage Humorous Trump I’ll Be Home For Christmas",
        published: "Oct 23, 2024",
        bsr: "12,518",
        price: "17.99",
        sales: "35",
        reviews: "11",
        reviewCount: "4.6",
        avg30bsr: "0",
      },
      {
        asin: "B08298Y8W1",
        Url: "https://www.amazon.com/Selective-Hearing-Werent-Selected-T-Shirt/dp/B08298Y8W1/ref=sr_1_357?dib=eyJ2IjoiMSJ9.jCUbxy2b10gKEGzPAr3_7XmO7BbwmUYu0rnqIkWIo7VYxGpqAoomsKwpwiZHP_Uq3UQigMk5izhtM-89kf4VQ221D32WNPAEPStubTjN3oiOFmO86pFC0DLuUTVf9cCEoPJwaU9AwsCn7HhTP8RWP187JwvdfaW1A194xx_Rd03D8McTskYIFF50_jYX3J9109TGzvPzu4b1brxXulQkqUO_Xty0swWlAfeXiZgAk3lu4atfrn7jtF8P8f31_efxfU04mVtnSxGT7bYF1KndVoFx5Oa_m205zGWzhOIdc1g.76KNJV41x-thToFeThnvscT6V_9FErEJfV_WLQSvS_4&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666307&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-357",
        imageUrl:
          "https://m.media-amazon.com/images/I/61K4h7DoHpL._AC_UL320_.jpg",
        title:
          "I Have Selective Hearing, You Weren't Selected Short Sleeve T-Shirt,Black, Small",
        bullet1:
          "Cute design for bad listeners who have selective hearing or don't want to listen",
        bullet2:
          "Perfect gift for coworkers, husbands, wives and anyone else who has selective hearing or simply doesn't listen",
        brand: "Brand: I Don't Listen Apparel",
        published: "Dec 3, 2019",
        bsr: "13,084",
        price: "16.99",
        sales: "28",
        reviews: "632",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B077T4F93R",
        Url: "https://www.amazon.com/dp/B077T4F93R",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C81GemltuKvL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "On The Naughty List And I Regret Nothing Funny Xmas Shirt",
        bullet1:
          "This is our funny Christmas pajama shirt that reads On The Naughty List And I Regret Nothing and features Christmas candy canes.",
        bullet2:
          "Funny naughty or nice list Santa Christmas t-shirt for all the naughty boys and girls. This funny xmas tee will definitely get the Christmas party laughing! Plus, it makes for a great group Christmas pajama shirt!",
        brand: "Brand: Funny Christmas X-Mas Holiday Shirt Supply",
        published: "Nov 29, 2017",
        bsr: "13,267",
        price: "18.97",
        sales: "34",
        reviews: "985",
        reviewCount: "4.6",
        avg30bsr: "246,739",
      },
      {
        asin: "B0CQD1V554",
        Url: "https://www.amazon.com/Cat-Ramen-Noodle-Japanese-T-Shirt/dp/B0CQD1V554/ref=sr_1_697?dib=eyJ2IjoiMSJ9.TVLZyNTIpcckQYXk5DNKmzcHl3rmTqkxC5tyEHXZCGchxbQwYVTMkjm4Pr7WLDf2bA8Rqpr-k4P687ZBw3NsRLHEU5qNbeKt9SXotzs0v5NpZqBDbYy_5fkX2nxlxvhppJ1Mr8bl9kLXiwV_3ONnxJKV_QCA5ILJu9HSpFhma_DxkDfmofYC7ah2x3DPB2GCW8QJvu8fSpS4xIYbCq2XGDPWOJc8O3Q3fk3ReFYk-NU2sDXuyMRqQ6TLi4R9QI-2VhTeuSJIwPXwCUWMTR9XLdEhIP1IxxcnXJ2VPUSAn2E.9HgWFsbTP0B_7I2UjR1Of7BjVl3SsgiHlYXZr6nfxvM&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666426&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-697",
        imageUrl:
          "https://m.media-amazon.com/images/I/71R+uhZ7CwL._AC_UL320_.jpg",
        title:
          "Anime Manga Kawaii Otaku Style Urban Streetwear Ramen Cat T-Shirt",
        bullet1:
          "RTUZ / Perfect for anime and manga fans. Ramen noodle design in kawaii style, inspired by Japanese pop culture. Ideal for anime lovers, otakus, and streetwear enthusiasts who want to express their modern style with an urban twist. Stylis casual and unique.",
        bullet2:
          "Streetwear for anime and manga lovers. This shirt combines a ramen graphic with kawaii elements and urban flair. Perfect for men and women who express their passion for anime through fashion. Unisex design, ideal for conventions and everyday wear.",
        brand: "Brand: RTUZ",
        published: "Dec 15, 2023",
        bsr: "13,402",
        price: "18.99",
        sales: "10",
        reviews: "102",
        reviewCount: "4.8",
        avg30bsr: "0",
      },
      {
        asin: "B0CB72S1WN",
        Url: "https://www.amazon.com/dp/B0CB72S1WN",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C71NqGo9XJ8L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Official Billie Eilish Happier Than Ever Black T-Shirt",
        bullet1: "Authentic Licensed Bravado Billie Eilish Merchandise",
        bullet2:
          "Legal and Official Billie Eilish Merchandise in partnership with Bravado International Group, a Universal Music Group Company; 2022",
        brand: "Brand: Visit the Billie Eilish Store",
        published: "Jul 05, 2023",
        bsr: "13,787",
        price: "19.99",
        sales: "74",
        reviews: "58",
        reviewCount: "4.7",
        avg30bsr: "85,344",
      },
      {
        asin: "B0DNRYG2WR",
        Url: "https://www.amazon.com/Brittany-Mahomes-Champions-FOCO-Premium/dp/B0DNRYG2WR",
        imageUrl:
          "https://m.media-amazon.com/images/I/71K-YtF+JaL._AC_UL320_.jpg",
        title:
          "Womens Brittany Mahomes x Kansas City Chiefs NFL 4x Champions FOCO Premium T-Shirt",
        bullet1:
          "This premium t-shirt is made of lightweight fine jersey fabric",
        bullet2:
          "Fit: Men’s fit runs small, size up for a looser fit. Women’s fit is true to size, order usual size.",
        brand: "Brand: FOCO",
        published: "Nov 22, 2024",
        bsr: "13,792",
        price: "22.99",
        sales: "5",
        reviews: "0",
        reviewCount: "0",
        avg30bsr: "0",
      },
      {
        asin: "B07JFQMRDF",
        Url: "https://www.amazon.com/dp/B07JFQMRDF",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91T4YpOSgHL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_UL466_.png",
        title: "LyricLyfe - T-SHIRT - ACHY BREAKY HEART",
        bullet1: '"ACHY BREAKY HEART" WRITTEN BY DONALD L. VON TRESS',
        bullet2:
          "Courtesy of Universal - Millhouse Music ( c ) Universal Music Publishing, Inc.",
        brand: "Brand: LyricLyfe",
        published: "Oct 16, 2018",
        bsr: "13,814",
        price: "19.99",
        sales: "392",
        reviews: "8",
        reviewCount: "4.6",
        avg30bsr: "10,762",
      },
      {
        asin: "B07KW8S243",
        Url: "https://www.amazon.com/dp/B07KW8S243",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140,2000%7C81Xx+Z8yfzL.png%7C0,0,2140,2000+0.0,0.0,2140.0,2000.0._UL466_.png",
        title:
          "Funny Deer design - Hunters All of Santa's Reindeer design T-Shirt",
        bullet1:
          "Funny Christmas Deer Hunting design - Santas reindeer Deer Meat is great to make sausage, jerky chili, tacos, bbq, back strap, burgers, stews, and don't forget to use Rudolf's nose for a light.",
        bullet2:
          "Great hunter for the funny hunter who likes puns. All of Santa's Reindeer. Meat eaters Deer Hunters. Santas Reindeer Dasher, Dancer, Prancer, Vixen, Comet, Cupid, Donner, Blitzen, Rudolph",
        brand: "Brand: Hunting - Big Ray Designs",
        published: "Nov 11, 2017",
        bsr: "13,827",
        price: "18.95",
        sales: "76",
        reviews: "495",
        reviewCount: "4.8",
        avg30bsr: "84,741",
      },
      {
        asin: "B0CB93R5S9",
        Url: "https://www.amazon.com/dp/B0CB93R5S9",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91bQW98uysL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Official Billie Eilish Red Photo Neon Black T-Shirt",
        bullet1:
          "Authentic Licensed Bravado Billie Eilish Red Photo Neon Black Merchandise",
        bullet2:
          "Legal and Official Billie Eilish Merchandise in partnership with Bravado International Group, a Universal Music Group Company; 2020",
        brand: "Brand: Visit the Billie Eilish Store",
        published: "Jul 06, 2023",
        bsr: "13,893",
        price: "19.99",
        sales: "77",
        reviews: "44",
        reviewCount: "4.0",
        avg30bsr: "81,301",
      },
      {
        asin: "B0D2QQX6GJ",
        Url: "https://www.amazon.com/Funny-Trump-Pink-2024-America/dp/B0D2QQX6GJ/ref=sr_1_4?dib=eyJ2IjoiMSJ9.C2cxFzs7nvE9AWZjMfgvfW-gHGJf80oViZLy6xnKC8YwAp6GinJbK8kBFjwMoTztTAnlfCuKreQoYQGnNBPxiJCgs3F-0ysqtrD_CA4p-jK0eISURYuMnDKiM3x7-mYUUv9Oi7D3xVk1VNrmbjrXjcyryBxrQY45l6jJodfbNLjgZNVU6nvBo0i1kaja3By4KmlgN4foekaWCjIOlhpFG-NBUqI65let2fsrchhlZn_1hwzvhL0zrMglitxKl90mw0yKWPVJne4VU4coZPrbFvrQFDipRfXr945Z4S2pHxE.R1h3HWxUS7EZM2UmY0Pfmvt8SdL-dNd9CwddCclOt3Y&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666184&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-4",
        imageUrl:
          "https://m.media-amazon.com/images/I/71MxpUxuEJL._AC_UL320_.jpg",
        title:
          "Funny Daddy's Home Trump Pink 2024 Take America Back 2024 T-Shirt",
        bullet1:
          "Trump Girl Pink 2024 Trump For men boys teen Women Girls is great for girls voters and is idle for men women for Trump rally or a Independence day. Makes a awesome presents idea for conservatives who vote Republican to show support on the of 4th of July",
        bullet2:
          "Funny Trump Pink Daddy's Home, Trump 2024. Daddy's coming Home trump . trump Daddy's Home women",
        brand: "Brand: Funny Trump Pink Miss Me Yet, Trump 2024",
        published: "Apr 26, 2024",
        bsr: "14,102",
        price: "15.95",
        sales: "100",
        reviews: "44",
        reviewCount: "4.0",
        avg30bsr: "0",
      },
      {
        asin: "B07JFPF5VB",
        Url: "https://www.amazon.com/dp/B07JFPF5VB",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91boev-pSnL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "LyricLyfe - T-Shirt - Achy Breaky Heart",
        bullet1: '\'"ACHY BREAKY HEART" WRITTEN BY DONALD L. VON TRESS',
        bullet2:
          "Courtesy of Universal - Millhouse Music ( c ) Universal Music Publishing, Inc.",
        brand: "Brand: LyricLyfe",
        published: "Oct 16, 2018",
        bsr: "14,259",
        price: "19.99",
        sales: "374",
        reviews: "18",
        reviewCount: "4.5",
        avg30bsr: "11,403",
      },
      {
        asin: "B0BKX5CTP9",
        Url: "https://www.amazon.com/dp/B0BKX5CTP9",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C8185ZkS4JWL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Funny Due to Inflation Ugly Christmas Sweaters For Men Women T-Shirt",
        bullet1:
          "Due to inflation this is my ugly christmas sweater, Funny Ugly Christmas Sweaters Matching For Women Men Family Friends Santa Christmas Pajamas For kids, boys, girls, women, men and anyone who loves x-mas",
        bullet2:
          "Wear it in Christmas party, family dinner, celebrate the Xmas holiday season. Family Matching Christmas Santa. This Funny Xmas Tee Will Definitely Get The Christmas Party Laughing! Plus, It Makes For A Great Group Christmas Pajama",
        brand: "Brand: Brand: Ugly Christmas Funny Family Matching Pajamas PJs",
        published: "Oct 29, 2022",
        bsr: "14,440",
        price: "18.99",
        sales: "97",
        reviews: "274",
        reviewCount: "4.6",
        avg30bsr: "61,743",
      },
      {
        asin: "B0D8BNWXQ2",
        Url: "https://www.amazon.com/Trump-2024-Flag-45-47/dp/B0D8BNWXQ2/ref=sr_1_7?dib=eyJ2IjoiMSJ9.C2cxFzs7nvE9AWZjMfgvfW-gHGJf80oViZLy6xnKC8YwAp6GinJbK8kBFjwMoTztTAnlfCuKreQoYQGnNBPxiJCgs3F-0ysqtrD_CA4p-jK0eISURYuMnDKiM3x7-mYUUv9Oi7D3xVk1VNrmbjrXjcyryBxrQY45l6jJodfbNLjgZNVU6nvBo0i1kaja3By4KmlgN4foekaWCjIOlhpFG-NBUqI65let2fsrchhlZn_1hwzvhL0zrMglitxKl90mw0yKWPVJne4VU4coZPrbFvrQFDipRfXr945Z4S2pHxE.R1h3HWxUS7EZM2UmY0Pfmvt8SdL-dNd9CwddCclOt3Y&dib_tag=se&keywords=T-Shirt&m=ATVPDKIKX0DER&qid=1731666184&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-7",
        imageUrl:
          "https://m.media-amazon.com/images/I/61GT0tZzNwL._AC_UL320_.jpg",
        title:
          "Trump 2024 Flag (On Back) Take America Back Trump Flag 45 47 T-Shirt",
        bullet1:
          "Trump 2024 Flag shirt on back and front, Trump 2 side shirt. Trump 2024 flag shirt, Take America Back shirt, Retro American Flag shirt, patriotic Trump shirt for men, women, mom, dad, husband, wife, Veterans, grandpa, grandma who vote Trump, support Trump",
        bullet2:
          "American Flag Trump shirt for men, Trump shirt women, Pro Trump shirts for boys, Trump girl shirt. Take America Back Retro American flag shirt for President Election, Fourth of July, Veterans day, Vote T shirt for President vote 2024, Trump 45 47, MAGA 24",
        brand: "Brand: Donald Trump 2024 Flag Trump 45 47 American Flag J",
        published: "Jun 28, 2024",
        bsr: "14,730",
        price: "22.99",
        sales: "100",
        reviews: "36",
        reviewCount: "4.0",
        avg30bsr: "0",
      },
      {
        asin: "B0BFRYKWJ3",
        Url: "https://www.amazon.com/dp/B0BFRYKWJ3",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C81qop8GgIUL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title:
          "Bigfoot Loch Ness Monster Mothman And Aliens! Funny Cryptid T-Shirt",
        bullet1:
          "Cryptids design is for anyone who loves cryptozoology mythical creatures like bigfoot loch ness monster, frogman, chupacabra, dogman, jackalope mothman ningen and aliens. makes a great gift for youth adults who believe in paranormal cryptid monsters!",
        bullet2:
          "This cryptid gift also for those who loves moon UFOs Extraterrestrials, space, spaceships, paranormal, folklore gifts. cute sasquatch Nessie alien gift idea for men women and kids boys girls who believe in folklore! suitable for any holidays and parties!",
        brand: "Brand: Brand: Thebigfoottz Co.",
        published: "Sep 19, 2022",
        bsr: "15,069",
        price: "21.99",
        sales: "52",
        reviews: "167",
        reviewCount: "4.9",
        avg30bsr: "134,768",
      },
      {
        asin: "B07NYSMNRQ",
        Url: "https://www.amazon.com/dp/B07NYSMNRQ",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C6125VuZYd0L.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Please Don't Make Me Do Stuff T-Shirt Lazy Teenager Teen Tee",
        bullet1:
          'Are you a lazy teenager or your are a parent with a lazy teen? Buy this funny cute saying sarcastic saying with text "Please Don\'t Make Me Do Stuff". Wear this clever saying while at high school, college or graduation. Fun for girls boys students & friend',
        bullet2:
          "Please don't make me do stuff teen saying is designed to be great gifts for a birthday or Christmas. For birthdays christmas & halloween gift for dad, mom, brother, sister, husband, wife, boyfriend, girlfriend, son, daughter or family & friends",
        brand: "Brand: Brand: Unknown",
        published: "Sep 11, 2017",
        bsr: "15,284",
        price: "19.99",
        sales: "69",
        reviews: "281",
        reviewCount: "4.6",
        avg30bsr: "95,242",
      },
      {
        asin: "B0DM9DVDDR",
        Url: "https://www.amazon.com/Trump-Better-Coverage-Politics-T-Shirt/dp/B0DM9DVDDR",
        imageUrl:
          "https://m.media-amazon.com/images/I/71vz0W9QwOL._AC_UL320_.jpg",
        title:
          "Trump Better Coverage Than 5G Can You Hear us Now Politics T-Shirt",
        bullet1:
          "This eye-catching garment proudly showcases the thought-provoking quote. The words convey a strong message of comparison, drawing attention to the impact and reach of President Trump's actions and decisions.",
        bullet2:
          "The design of this attire exudes confidence and assertiveness, symbolizing the power of speech and the importance of being heard. It serves as a powerful statement piece, sparking discussions about politics, communication, and the role of media.",
        brand: "Brand: Trump 2024 Apparel Co.",
        published: "Nov 7, 2024",
        bsr: "15,324",
        price: "18.99",
        sales: "33",
        reviews: "11",
        reviewCount: "4.5",
        avg30bsr: "0",
      },
      {
        asin: "B0B7QXSWLL",
        Url: "https://www.amazon.com/dp/B0B7QXSWLL",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140%2C2000%7C91Iy9AMWiEL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0._UL466_.png",
        title: "Aaron Judge Number Portrait Baj New York MLBPA T-Shirt",
        bullet1:
          "Whether you are a fan of Aaron Judge or just want the latest baseball apparel, this product is for you. As a Diehard New York fan, this is the perfect design to show your classy style!",
        bullet2:
          "This design is officially licensed by the MLBPA and is unique so it's perfect to wear to show off your love for Aaron Judge.",
        brand: "Brand: Brand: BallPark MVP",
        published: "Jul 26, 2022",
        bsr: "15,385",
        price: "22.95",
        sales: "293",
        reviews: "257",
        reviewCount: "4.7",
        avg30bsr: "15,370",
      },
      {
        asin: "B079T32H5X",
        Url: "https://www.amazon.com/dp/B079T32H5X",
        imageUrl:
          "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C2140,2000%7C81sZadNYFxL.png%7C0,0,2140,2000+0.0,0.0,2140.0,2000.0._UX466_.png",
        title: "Ice Hockey Player Gift Straight Outta The Penalty Box Shirt",
        bullet1:
          "Are you a Hockey Player or Coach and love the mask and sticks? Its an incredible sport that requires good strength and agility, and this funny hockey shirt is great for those who love Ice Hockey. A perfect gift for goalie or scorer with hockey love!",
        bullet2:
          "Click our brand if you love this item! This Ice Hockey Player Gift Straight Outta The Penalty Box Shirt is for Men, Women, Kids and is a perfect gift for a Birthday, Christmas, or for any special occasion or you or a loved one! Description",
        brand: "Brand: Hockey Player Apparel Shop",
        published: "Feb 14, 2018",
        bsr: "15,439",
        price: "18.95",
        sales: "92",
        reviews: "1,214",
        reviewCount: "4.7",
        avg30bsr: "66,636",
      },
    ];
    res.status(200).json({
      message: "Fetched successfully",
      success: true,
      data: mockData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
