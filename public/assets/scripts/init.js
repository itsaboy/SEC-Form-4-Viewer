$().ready(() => {

    // Button to submit a new search
    const searchButton = () => {
        $("#form-button").on("click", (event) => {
            event.preventDefault();
            activeTicker = $("#form-input").val().toUpperCase();
            getForm4(link);
        });
    };

    searchButton();
});