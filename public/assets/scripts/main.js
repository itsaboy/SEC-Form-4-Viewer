// API call to get last 10 Form 4 filings of a chosen ticker
const getForm4 = async (req) => {
    loading();
    let res = await fetch(req, {
        method: "POST",
        body: JSON.stringify({
            query: {
                query_string: {
                    query: `issuer.tradingSymbol:${activeTicker}`
                }
            },
            from: "0",
            size: "12",
            sort: [{ filedAt: { "order": "desc" } }]
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": API_KEY
        }
    });    
    let data = await res.json();
 
    if (res.status === 200) {
        doneLoading();
        console.log(data);
        if (savedTickers.includes(activeTicker)) {
            dataLoopAndDisplay(data); 
        } else {
            saveData();
            dataLoopAndDisplay(data);
        };
    } else {
        badRequest(res);
    };
};

/* Loops through the 12 most recent transactions returned by
the API call and displays the relevant data to the user */
const dataLoopAndDisplay = (data) => {
    $("#search-results").removeClass("hidden");
    for (let i = 0; i < 12; i++) {
        let docType = data.transactions[i].documentType;
        $(`#doc-type${i + 1}`).text(`Form Type: ${docType}`);
        let reportDate = data.transactions[i].periodOfReport;
        $(`#report-date${i + 1}`).text(`Report Date: ${reportDate}`);
        let reportOwner = data.transactions[i].reportingOwner.name;
        $(`#report-owner${i + 1}`).text(`Owner: ${reportOwner}`);
        let transactionDate = data.transactions[i].nonDerivativeTable.transactions[0].transactionDate;
        $(`#transaction-date${i + 1}`).text(`Transaction Date: ${transactionDate}`);
        let sharesAmount = data.transactions[i].nonDerivativeTable.transactions[0].amounts.shares;
        $(`#shares-amount${i + 1}`).text(`Number of Shares: ${sharesAmount}`);
        let pricePerShare = data.transactions[i].nonDerivativeTable.transactions[0].amounts.pricePerShare;
        $(`#price-per-share${i + 1}`).text(`Price Per Share: ${pricePerShare}`);
        let boughtOrSold = data.transactions[i].nonDerivativeTable.transactions[0].amounts.acquiredDisposedCode;
        $(`#buy-or-sell${i + 1}`).text(`Bought or Sold: ${boughtOrSold}`);  
    };
};

// Saves valid tickers to an array
const saveData = () => {
    savedTickers.push(activeTicker);
    for (let i = 0; i < savedTickers.length; i++) {
        localStorage.setItem(i, JSON.stringify(savedTickers[i]));
    };
    loadData();
    activeTicker = "";
};

// Loads saved tickers from the array
const loadData = () => {
    savedTickers = [];
    for (let i = 0; i < localStorage.length; i++) {
        savedTickers.push(JSON.parse(localStorage[i]));
    };
    populateWatchlist();
};

const reloadData = () => {
    for (let i = 0; i < savedTickers.length; i++) {
        localStorage.setItem(i, JSON.stringify(savedTickers[i]));
    };
    loadData();
}

// Populates watchlist dropdown menu with saved tickers
const populateWatchlist = () => {
    $("#history").empty();
    $("#history").append(`<option selected disabled>Ticker</option>`);
    for (let i = 0; i < savedTickers.length; i++) {
        let newTicker =  $(`<option>${savedTickers[i]}</option>`);
        newTicker.attr("ticker", `${savedTickers[i]}`);
        $("#history").append(newTicker); 
    };
};

// Deletes selected ticker from watchlist
const deleteTicker = () => {
    for (let i = 0; i < savedTickers.length; i++) {
        if (savedTickers[i] === activeTicker) {
            savedTickers.splice(i, 1);
            localStorage.clear();
        };
    };
    activeTicker = "";
    reloadData();
};

// Loading modal
const loading = () => {
    $("#loading-modal").removeClass("hidden");
    $("#header").addClass("opacity-50");
    $("#main").addClass("opacity-50");
    $("#footer").addClass("opacity-50");
    $("#form-button").prop("disabled", true);
    $("#history").prop("disabled", true);
    $("#load-button").prop("disabled", true);
    $("#delete-button").prop("disabled", true);
};

const doneLoading = () => {
    $("#loading-modal").addClass("hidden");
    $("#header").removeClass("opacity-50");
    $("#main").removeClass("opacity-50");
    $("#footer").removeClass("opacity-50");
    $("#form-button").prop("disabled", false);
    $("#history").prop("disabled", false);
    $("#load-button").prop("disabled", false);
    $("#delete-button").prop("disabled", false);  
}

// Error modal
const errorState = (errorMessage) => {
    $("#error-code").text(errorMessage);
    $("#error-modal").removeClass("hidden");
    $("#header").addClass("opacity-50");
    $("#main").addClass("opacity-50");
    $("#footer").addClass("opacity-50");
    $("#form-button").prop("disabled", true);
    $("#history").prop("disabled", true);
    $("#load-button").prop("disabled", true);
    $("#delete-button").prop("disabled", true);
};

// Server error
const badRequest = (res) => {
    $("#error-code").text(`Status: ${res.status}`);
    $("#header").addClass("opacity-50");
    $("#main").addClass("opacity-50");
    $("#footer").addClass("opacity-50");
    $("#form-button").prop("disabled", true);
    $("#history").prop("disabled", true);
    $("#load-button").prop("disabled", true);
    $("#delete-button").prop("disabled", true);
}