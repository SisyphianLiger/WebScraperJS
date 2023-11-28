const { JSDOM } = require('jsdom')
/*
    Using Node URL we can parse the different sections 
    of the String coming in to verify it's a valid URL
*
    */

function normalizeURL(urlString) {


        // Parse urlString to URL
        const checkURL = new URL(urlString); // Put Generate A return URL 
        let correctURL =   checkURL.host + checkURL.pathname;
       
            if (correctURL.length > 0 && correctURL.endsWith("/")) 
                    correctURL = correctURL.slice(0, -1);
        return correctURL;
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
            if (x.href.startsWith('/'))
                return baseURL + x.href
            else
                return x.href
    });
    
   return aHrefList
}


/* 
    Crawling web pages 
*/

async function crawlPage(baseURL, currentURL, pages) {
    try {
        // 1. Make sure currentURL is on same domain as baseURL
        if (!currentURL.includes(baseURL)) {
            return pages;
        }
        // check if currentURL is same domain as baseURL
    

        // 2. Get normalizeURL of currentURL
        const norm_URL = normalizeURL(currentURL);
        /*
            3 - 4
        */
            
        if (pages[norm_URL] === undefined) {
            if(currentURL !== baseURL) 
                pages[norm_URL] = 1;
            else 
                pages[baseURL] = 0; 
        } else {
            pages[norm_URL]++;
            return pages;
        }

        // 5  request currentURL
        const response = await fetch(currentURL);


        // Checking HTTP Error
        if (response.status > 399) {
            console.log(`Error: Response received a ${response.status}`);
        }
        // Checking Proper Content-Type
        if (!response.headers.get('Content-Type').includes('text/html')) {
            console.log(`Error: Not Response not text/html, format is ${response.headers.get('Content-Type')}`);
        }

        
        // 6 Rip all 'a's
        const  extract_URLs = getURLsFromHTML(await response.text(), baseURL);

        const promises = extract_URLs.map(aRefURL => {
            return crawlPage(baseURL, aRefURL, pages);
        });
      
        await Promise.all(promises).then (pagesArray => {
            pagesArray.forEach(pageRes=> {    
                    Object.assign(pages,pageRes)
            });
        });

        return pages;

    } catch (err) {
        console.log(err.message); 
    }
}




// Used to export this function for testing with Jest
module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
