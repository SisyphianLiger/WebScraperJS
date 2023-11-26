const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

/*
    Testing For normalizeURL
*/
// First Test https and /
test("First Test https and /", () => {
        const url = "https://testurl.someotherimportantstring.com/";
        const prunedURL = "testurl.someotherimportantstring.com";
        expect(normalizeURL(url) === prunedURL)
});

// Second Test https 
test("Second Test: https without /", () => {
        const url = "https://testurl.someotherimportantstring.com";
        const prunedURL = "testurl.someotherimportantstring.com";
        expect(normalizeURL(url) === prunedURL)
});

// First Test http and /
test("First Test http and /", () => {
        const url = "http://testurl.someotherimportantstring.com/";
        const prunedURL = "testurl.someotherimportantstring.com";
        expect(normalizeURL(url) === prunedURL)
});

// Second Test http 
test("Second Test https without /", () => {
        const url = "http://testurl.someotherimportantstring.com";
        const prunedURL = "testurl.someotherimportantstring.com";
        expect(normalizeURL(url) === prunedURL)
});

// Invalid URL Test
test("normalizeURL throws TypeError with empty string", () => {
    const badUrl = 'this should fail as a url string lololooloololol'
    expect(() => {
        normalizeURL(badUrl);
    }).toThrowError('Invalid URL');
});
 

/*
    Testing For GetaRefHTML
*/
test("All URL's converted to Absolute and all Tags Found", () => {
    const html =   `<a href="/path/to/something">Link</a>
                    <a href="http://baseurl.com/path/to/numberone">Link</a>
                    <a href="/path/to/something">Link</a>
                    <a href="http://baseurl.com/path/to/numbertwo">Link</a>`
    const baseURL = 'http://baseurl.com';  // Your base URL
    const expectedOutput = ['http://baseurl.com/path/to/something', 
                            'http://baseurl.com/path/to/numberone', 
                            'http://baseurl.com/path/to/something', 
                            'http://baseurl.com/path/to/numbertwo',
                           ];
    const output = getURLsFromHTML(html, baseURL);  // Run your function

    // Now you should check whether output is the same as expectedOutput
    expect(output).toEqual(expectedOutput); 
});


test("No 'a's so empty Array", () => {
    const html =   ''
    const baseURL = 'http://baseurl.com';  // Your base URL
    const expectedOutput = [];
    const output = getURLsFromHTML(html, baseURL);  // Run your function

    // Now you should check whether output is the same as expectedOutput
    expect(output).toEqual(expectedOutput); 
});




