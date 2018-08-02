"use strict";
// step (2)
/**
 * JSON movies url
 * @type {string} URL
 */
const URL = 'https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json';

getAjaxData(URL, movies => {

    // [1] Give each movie a tag: Good (>=7), Average (4-6), Bad (0-3) based on the ratings.
    // What if movie rating = 3.5 OR 7.5 ?? What tag should it take? *** *** ***

    movies.forEach(movie => {
        movie.tag = movie.rating >= 7 ? "Good"
            : movie.rating >= 4 && movie.rating < 7 ? "Average"
                : movie.rating < 4 ? "Bad"
                    : "";
    });
    console.log("Movies with tags =", movies);
    // ----------------------------------------------------
    // [2] Calculate the average rating of all the movies.
    let average                                          = {sum: 0, avg: 0};
    /**
     * calculate movie array average (sum/count)
     * @param {*} average
     * @param {*} movie
     * @param {number} movie.rating
     * @param {number} index
     * @returns {*}
     */
    let calculateAverage                                 = (average, movie, index) => {
        average.sum += movie.rating;
        average.avg = average.sum / (index + 1);
        return average;
    };
    const allAverageRating                               = movies.reduce(calculateAverage, average);
    document.querySelector('#avgForAllMovies').innerHTML = allAverageRating.avg.toFixed(2);
    //console.log('Average rating of all the movies =', allAverageRating.avg.toFixed(2));

    // ----------------------------------------------------
    // [3] Count the total number of Good, Average and Bad movies.

    const total                                      = {good: 0, average: 0, bad: 0};
    let calculateTotalNumberOfMovies                 = (total, movie) => {
        if (movie.tag === "Good") total.good++;
        if (movie.tag === "Average") total.average++;
        if (movie.tag === "Bad") total.bad++;
        return total;
    };
    const totalNumberOfMovies                        = movies.reduce(calculateTotalNumberOfMovies, total);
    // console.log('total number of Good, Average and Bad movies\n', totalNumberOfMovies);
    document.querySelector('#goodSpan').innerHTML    = totalNumberOfMovies.good;
    document.querySelector('#averageSpan').innerHTML = totalNumberOfMovies.average;
    document.querySelector('#badSpan').innerHTML     = totalNumberOfMovies.bad;

    // ----------------------------------------------------
    // [4] Count the number of movies containing the following keywords:
    // ["The", "dog", "who", "is", "not", "a", "man"].
    // Can you make sure the search is case insensitive?

    const keywords            = ["The", "dog", "who", "is", "not", "a", "man"];
    /**
     * Return number of movies contains a keyword
     * @param {string} keyword
     * @returns {number}
     */
    let moviesContainsKeyword = keyword => {
        let findMoviesContainsKeyword = (numMovies, movie) => {
            let regex = new RegExp(keyword, 'g'); // flag = 'ig' if case insensitive
            if (movie.title.match(regex)) {
                numMovies++;
                //console.log(movie.title);
            }
            return numMovies;
        };
        return movies.reduce(findMoviesContainsKeyword, 0);
    };

    /**
     * Array ob objects: each object has {keyword, count}
     * @type {Array}
     */
    const keywordsWithCount = [];
    // looping keywords array and push an object to  keywordsWithCount array
    for (const keyword of keywords) {
        let keywordCount     = {};
        keywordCount.keyword = keyword;
        keywordCount.count   = moviesContainsKeyword(keyword);
        keywordsWithCount.push(keywordCount)
    }
    // console.log('keyword with number of movies contains it\n', keywordsWithCount);
    keywordsWithCount.forEach(word => {
        let tr       = document.createElement("tr");
        tr.innerHTML = `
            <td>${word.keyword}</td>
            <td>${word.count}</td>
        `;
        document.querySelector('#keyWordsCountTbody').appendChild(tr);
    });

    // ----------------------------------------------------
    // [5] Count the number of movies made between 1980-1989 (including both the years).
    const oldMovies                                = movies.reduce((count, movies) => {
        if (movies.year >= 1980 && movies.year <= 1989) count++;
        return count;
    }, 0);
    // console.log('number of movies made between 1980-1989 =', oldMovies);
    document.querySelector('#oldMovies').innerHTML = oldMovies;
}); // end: getAjaxData
