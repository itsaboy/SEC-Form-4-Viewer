const getForm4 = async (req) => {
    let res = await fetch(req, {
        method: "POST",
        body: JSON.stringify({
            query: {
                query_string: {
                    query: `issuer.tradingSymbol:${activeTicker}`
                }
            },
            from: "0",
            size: "1",
            sort: [{ filedAt: { "order": "desc" } }]
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": key
        }
    });    
    let data = await res.json();

    let docType = data.transactions[0].documentType;
    let reportDate = data.transactions[0].periodOfReport;
    let reportOwner = data.transactions[0].reportingOwner.name;
    let transactionDate = data.transactions[0].nonDerivativeTable.transactions[0].transactionDate;
    let sharesAmount = data.transactions[0].nonDerivativeTable.transactions[0].amounts.shares;
    let pricePerShare = data.transactions[0].nonDerivativeTable.transactions[0].amounts.pricePerShare;
    let boughtOrSold = data.transactions[0].nonDerivativeTable.transactions[0].amounts.acquiredDisposedCode;
    
    if (res.status === 200) {
        console.log(data);
        displayResult(
            docType, reportDate, reportOwner, transactionDate, sharesAmount, pricePerShare, boughtOrSold
        );
    } else {
        console.log("Error");
        console.log(data);
    };
};

const displayResult = (
    docType, reportDate, reportOwner, transactionDate, sharesAmount, pricePerShare, boughtOrSold
) => {
    $("#doc-type").text(`Form Type: ${docType}`);
    $("#report-date").text(`Report Date: ${reportDate}`);
    $("#report-owner").text(`Owner: ${reportOwner}`);
    $("#transaction-date").text(`Transaction Date: ${transactionDate}`);
    $("#shares-amount").text(`Shares: ${sharesAmount}`);
    $("#price-per-share").text(`Price Per Share: ${pricePerShare}`);
    $("#buy-or-sell").text(`Bought or Sold: ${boughtOrSold}`);
};