const { argv, exit } = require('node:process');
const { crawlPage } = require('./crawl');
const { printReport } = require('./report');

async function main() {
    /*
        We check if for valid input, i.e. the user has entered
        node source.js baseURl
        if they haven't done specifically that we let them know
        what they need to do to try again.
    */
    const arg_l = argv.length;
    
    if (arg_l < 3) {
        console.log("Error not enough Arguements to Webcrawl");
        return exit
    }
    
    if (arg_l > 4) {
        console.log("Error too many Arguements to Start Webcrawler");
        return exit
    }

    console.log(`baseURl ${argv[2]} accepted, commencing Webcrawler`);
    console.log();
    printReport( (await crawlPage(argv[2], argv[2], {})) );
}
main()

