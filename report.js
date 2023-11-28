function printReport(pages) {
    const printValues = Object.entries(pages)
    printValues.sort((a,b) => a[1] - b[1]);
    console.log()
    console.log("|==================================|");
    console.log("  WebCrawler Report Starrting Now") 
    console.log("|==================================|");
    console.log()

    printValues.forEach(element => {
        console.log(`Found ${element[1]} internal links to ${element[0]} `)  
    });

    console.log()
    console.log("|==================================|");
    console.log("      Ending WebCrawler Report" ) 
    console.log("|==================================|");
    console.log()
}



module.exports = {
    printReport,
}
