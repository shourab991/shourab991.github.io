const today = new Date();
    
    // Format the date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // Set the value of the input fields to today's date
    document.getElementById("dateInput").value = formattedDate;
    

const apiKey = 'py0oHgf3bcN3Q1OMgpUaqORS7SD3koDs';

async function fetchStockData(ticker, date) {
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${date}/${date}?adjusted=true&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        displayError(`Error fetching stock data: ${error.message}`);
        return null;
    }
}

function displayError(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // top or bottom
        position: "right", // left, center, or right
        backgroundColor: "green",
    }).showToast();

    document.getElementById('errorMessage').textContent = message;
}

async function displayStockData() {
    // Clear the error message before starting a new search
    document.getElementById('errorMessage').textContent = '';

    const ticker = document.getElementById('searchBox').value.toUpperCase();
    const date = document.getElementById('dateInput').value;

    if (!ticker) {
        displayError('Please enter a ticker symbol.');
        return;
    }

    const stockData = await fetchStockData(ticker, date);

    if (stockData && stockData.results) {
        const results = stockData.results;
        const latestResult = results[results.length - 1];

        const stock = tickerImage.find(stock => stock.stockName === ticker);
        if (stock) {
            document.getElementById("stockImage").src = stock.imageUrl;
        } else {
            displayError('Image not available for this ticker.');
        }

        document.getElementById('stockName').textContent = `${ticker}`;

        document.getElementById('closingPrice').textContent = `Closing Price: ${latestResult.c}`;
        document.getElementById('highPrice').textContent = `High Price: ${latestResult.h}`;
        document.getElementById('lowPrice').textContent = `Low Price: ${latestResult.l}`;
        document.getElementById('openingPrice').textContent = `Opening Price: ${latestResult.o}`;
        document.getElementById('timestamp').textContent = `Timestamp: ${new Date(latestResult.t)}`;
        document.getElementById('volume').textContent = `Volume: ${latestResult.v}`;
        document.getElementById('volumeWeightedAverage').textContent = `Volume Weighted Average: ${latestResult.vw}`;
    } else {
        displayError('No stock data available.');
    }
}



function handleKeyPress(event) {
    if (event.key === 'Enter') {
        displayStockData();
    }
}
const dateInput = document.getElementById('dateInput');
dateInput.addEventListener('input', function(e){
    const day = new Date(this.value).getUTCDay();
    if([6, 0].includes(day)){
        e.preventDefault();
        this.value = '';
        alert('Weekends not allowed');
    }
});