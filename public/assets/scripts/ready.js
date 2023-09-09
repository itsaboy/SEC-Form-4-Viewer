jQuery(() => {
    // Button to submit a new search
    $("#form-button").on("click", (event) => {
        event.preventDefault();
        activeTicker = $("#form-input").val().toUpperCase();
        // Checks if ticker already in watchlist
        if (savedTickers.includes(activeTicker)) {
            errorMessage = "Ticker already in watchlist!";
            errorState(errorMessage);
        // Checks if search input is empty
        } else if (!activeTicker) {
            errorMessage = "Search field is empty!";
            errorState(errorMessage);
        } else {
            getForm4(link);
        };
    });

    // Sets activeTicker based on selected option in dropdown
    $("#history").on("change", () => {
        activeTicker = $("#history option:selected").attr("ticker");
    });

    // Button to load data for a ticker in watchlist 
    $("#load-button").on("click", (event) => {
        event.preventDefault();
        // Checks if no ticker is selected in dropdown
        if (!activeTicker) {
            errorMessage = "No ticker selected!";
            errorState(errorMessage);
        } else {
            getForm4(link);
        };
    });

    // Button to delete a ticker from watchlist
    $("#delete-button").on("click", (event) => {
        event.preventDefault();
        deleteTicker();
    });

    // Button that clears the error modal
    $("#error-button").on("click", () => {
        errorMessage = "";
        $("#error-modal").addClass("hidden");
        $("#header").removeClass("opacity-50");
        $("#main").removeClass("opacity-50");
        $("#footer").removeClass("opacity-50");
        $("#form-button").prop("disabled", false);
        $("#history").prop("disabled", false);
        $("#load-button").prop("disabled", false);
        $("#delete-button").prop("disabled", false);  
    });

    // Loads data on ready
    loadData();
});