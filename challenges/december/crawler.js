const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');
const _ = require('lodash');
// To get the list of tamil movies
// const url = 'https://en.wikipedia.org/wiki/List_of_Tamil_films_of_2017'
// request.get(url,(error,response,html) => {
//   const $ = cheerio.load(html);
//   const output = [];
//   $('table[id=wikitable-20170601]').find('tr td i a')
//   .each((i,e) => {
//       output.push({
//         name: $(e).text(),
//         language: 'Tamil',
//         _link: $(e).attr('href')
//       });
//   })
//   fs.writeFileSync('tamil_movies1.json',JSON.stringify(output));
//
// });
const trimArray = (inputArray) => {
  const outputArray = [];
  inputArray.forEach((e) => {if(e.length > 0) outputArray.push(e)})
  return outputArray
}
const trimKey = (key) => key.replace(/\n/g,' ').trim().toLowerCase().replace(' ','_')
/* Crawling movies


const base_url = 'https://en.wikipedia.org';
var movies = JSON.parse(fs.readFileSync('tamil_movies.json', 'utf8'));
const movie_details = [];

const all_requests = Promise.all(movies.map(movie => {
  const url = base_url + movie._link;
  return rp(url)
}));

all_requests.then((responses) => responses.forEach(html => {
  const $ = cheerio.load(html);
  credits = {movie:$($('.vevent').find('th')[0]).text()}
  $('.vevent').find('th').each((i,e) => {
    const credit = $(e).text()
    const creditValue = $(e).next().text().split('\n')
    const outputArray = trimArray(creditValue)

    if(credit && outputArray.length > 0 ) credits[trimKey(credit)] = outputArray.length > 1 ? outputArray : outputArray[0]
  })
  movie_details.push(credits);
})).
then(() => fs.writeFileSync('tamil_movies_details.json',JSON.stringify(movie_details)))
*/

const getCredits = (html) => {
  const $ = cheerio.load(html);
  credits = {movie:$($('.vevent').find('th')[0]).text()}
  $('.vevent').find('th').each((i,e) => {
    const credit = $(e).text()
    const creditValue = $(e).next().text().split('\n')
    const outputArray = trimArray(creditValue)

    if(credit && outputArray.length > 0 ) credits[trimKey(credit)] = outputArray.length > 1 ? outputArray : outputArray[0]
  })
  return credits;
}

rp('https://en.wikipedia.org/wiki/Theri_(film)')
.then(getCredits)
.then(d => console.log(JSON.stringify(d)))
// const numbers = [];
// const ram_movies = []
// for (var i = 0; i < 21; i++) {
//   const ran = Math.ceil(Math.random()*100)
//   if(numbers.indexOf(ran) == -1){
//     numbers.push(ran)
//     ram_movies.push(movies[ran])
//   }
// }
// fs.writeFileSync('ram_movies.json',JSON.stringify(ram_movies))
