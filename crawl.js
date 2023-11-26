const { response } = require('express');
const { JSDOM } = require('jsdom')
/*
    Using Node URL we can parse the different sections 
    of the String coming in to verify it's a valid URL
*/

function normalizeURL(urlString) {

    try {

        // Parse urlString to URL
        const checkURL = new URL(urlString);
        // Put Generate A return URL 
        const correctURL =  checkURL.username + 
            checkURL.password + 
            checkURL.host + 
            checkURL.pathname;
        console.log(correctURL)
        if (checkURL.protocol  === "https://"){
       
            if (checkURL.pathname.endsWith("/")) 
                return correctURL.substring(0, correctURL.length-1);
            else 
                return correctURL;
        }

        if (checkURL.protocol  === "http://"){
            if (checkURL.pathname.endsWith("/")) 
                return correctURL.substring(0, correctURL.length-1);
            else 
                return correctURL;
        }
    }

    catch (error) {
        console.log(error);
        throw error;
    }
}
    
/*
    Does two things, rips all the a ref strings in the DOM 
    Makes sure they are an absolute path by concatenating baseURL
*/

function getURLsFromHTML(htmlBody, baseURL) {
   const dom = new JSDOM(htmlBody);
   const aRefs = dom.window.document.querySelectorAll('a');
   const aRefList = Array.from(aRefs); 
  
    const aHrefList = aRefList.map(function(x) {
            if (x.href.includes(baseURL))
                return x.href
            else
                return baseURL + x.href
    });
    
   return aHrefList
}


/* 
    Crawling web pages 
*/

async function crawlPage(baseURL) {
    try {
    const response = await fetch(baseURL);
    // Checking HTTP Error
    if (response.status >= 400)
        return console.log(`Error: Response received a ${response.status}`)
    // Checking Proper Content-Type
    if (!response.headers.get('Content-Type').includes('text/html')) 
        return console.log(`Error: Not Response not text/html, format is ${response.headers.get('Content-Type')}`);
    // Return the Body Text
    return await response.text();    

    } catch (err) {
        console.log(err); 
    }
}




// Used to export this function for testing with Jest
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
