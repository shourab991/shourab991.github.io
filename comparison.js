const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

// Define maxDate as yesterday
const maxDate = new Date(today);
maxDate.setDate(today.getDate() - 1);
const maxYear = maxDate.getFullYear();
const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
const maxDay = String(maxDate.getDate()).padStart(2, '0');
const maxFormattedDate = `${maxYear}-${maxMonth}-${maxDay}`;

// Set the date input's max attribute and placeholder
document.getElementById("datePicker").setAttribute('max', maxFormattedDate);
document.getElementById("additionalDate").setAttribute('max', maxFormattedDate);
document.getElementById("datePicker").placeholder = 'MM/DD/YYYY';
document.getElementById("additionalDate").placeholder = 'MM/DD/YYYY';

// Disable weekends, today’s date, and future dates
const picker = document.querySelectorAll('#datePicker, #additionalDate');

picker.forEach(input => {
    input.addEventListener('input', function(e) {
        const selectedDate = new Date(this.value);
        const day = selectedDate.getUTCDay();
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set hours to midnight for comparison

        // Check if the selected date is today
        if (selectedDate.toDateString() === today.toDateString()) {
            e.preventDefault();
            this.value = '';
            displayError("Today's date is not allowed");
        }

        // Check if the selected date is a weekend
        else if ([6, 0].includes(day)) {
            e.preventDefault();
            this.value = '';
            displayError('Weekends not allowed');
        }

        // Check if the selected date is in the future
        else if (selectedDate > today) {
            e.preventDefault();
            this.value = '';
            displayError('Future dates not allowed');
        }
    });
});

async function fetchStockData(symbol, date) {
    const apiKey = 'py0oHgf3bcN3Q1OMgpUaqORS7SD3koDs';
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${date}/${date}?adjusted=true&sort=asc&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0];
        } else {
          throw new Error('Invalid ticker symbol');
        }
      } else {
        if (response.status === 429) {
          throw new Error('Bandwidth limit reached');
        } else {
          throw new Error('Network response was not ok');
        }
      }
    } catch (error) {
      throw error; // Re-throw the error to be handled by the calling function
    }
  }
  

function getStockImageUrl(symbol) {
    const stockInfo = tickerInfo.find(info => info.stockName === symbol);
    return stockInfo ? stockInfo.imageUrl : 'default.png';
}

async function addStockInput() {
    const additionalStockSymbol = document.getElementById("additionalStockSymbol").value.toUpperCase();
    const additionalDateElement = document.getElementById("additionalDate");

    clearErrorMessages();

    if (!additionalStockSymbol) {
        displayError('Please enter a valid stock symbol.', 'errorAdditionalStockSymbol');
        return;
    }

    if (!additionalDateElement.value) {
        displayError('Please enter a valid date.', 'errorAdditionalDate');
        return;
    }

    const additionalDate = additionalDateElement.value;
    try {
        const stockData = await fetchStockData(additionalStockSymbol, additionalDate);
        const stockImageUrl = getStockImageUrl(additionalStockSymbol);

        const comparisonResultsElement = document.createElement("div");
        const containerId = `comparisonResults${additionalStockSymbol}`;
        comparisonResultsElement.id = containerId;
        comparisonResultsElement.classList.add("stock-container");

        const stockHTML = `
            <div class="stock-info">
                <button class="remove-button" onclick="removeComparisonResult(this)">❌</button>
                <img src="${stockImageUrl}" alt="${additionalStockSymbol} Image">
                <h2>${additionalStockSymbol}</h2>
                <p>Open: ${stockData.o}</p>
                <p>High: ${stockData.h}</p>
                <p>Low: ${stockData.l}</p>
                <p>Close: ${stockData.c}</p>
                <p>Volume: ${stockData.v}</p>
            </div>
        `;

        comparisonResultsElement.innerHTML = stockHTML;
        const Bigbox = document.getElementById("Outerstockbox");
        Bigbox.appendChild(comparisonResultsElement);
    } catch (error) {
        if (error.message === 'Invalid ticker symbol') {
            displayError('The stock symbol is invalid. Please try another one.', 'errorAdditionalStockSymbol');
        } else if (error.message === 'Bandwidth limit reached') {
            displayError('Bandwidth limit reached. Please try again later.', 'errorAdditionalStockSymbol');
        } else {
            displayError('An unexpected error occurred. Please try again later.', 'errorAdditionalStockSymbol');
        }
    }
}

async function compareStocks() {
    const container = document.getElementById("additionalStockInput");
    container.style.display = "block";
    const stockSymbol1 = document.getElementById("searchBox1").value.toUpperCase();
    const stockSymbol2 = document.getElementById("searchBox2").value.toUpperCase();
    const date = document.getElementById("datePicker").value;
  
    clearErrorMessages();
  
    if (!stockSymbol1) {
        displayError('Please enter a valid stock symbol for the first stock.', 'errorSearchBox1');
        return;
    }
  
    if (!stockSymbol2) {
        displayError('Please enter a valid stock symbol for the second stock.', 'errorSearchBox2');
        return;
    }
  
    if (!date) {
        displayError('Please enter a valid date.', 'errorDatePicker');
        return;
    }
  
    try {
      const [stockData1, stockData2] = await Promise.all([
        fetchStockData(stockSymbol1, date),
        fetchStockData(stockSymbol2, date)
      ]);
  
      if (stockData1 && stockData2) {
        const stockImageUrl1 = getStockImageUrl(stockSymbol1);
        const stockImageUrl2 = getStockImageUrl(stockSymbol2);
        
        // Create a new container for the comparison results
        const comparisonResultsElement = document.createElement("div");
        comparisonResultsElement.classList.add("stock-container");
  
        // Add content for the first stock
        const stockHTML1 = `
          <div class="stock-info" data-symbol="${stockSymbol1}">
            <button class="remove-button" onclick="removeStockInfo(this)">❌</button>
            <img src="${stockImageUrl1}" alt="${stockSymbol1} Image">
            <h2>${stockSymbol1}</h2>
            <p>Open: ${stockData1.o}</p>
            <p>High: ${stockData1.h}</p>
            <p>Low: ${stockData1.l}</p>
            <p>Close: ${stockData1.c}</p>
            <p>Volume: ${stockData1.v}</p>
          </div>
        `;
  
        // Add content for the second stock
        const stockHTML2 = `
          <div class="stock-info" data-symbol="${stockSymbol2}">
            <button class="remove-button" onclick="removeStockInfo(this)">❌</button>
            <img src="${stockImageUrl2}" alt="${stockSymbol2} Image">
            <h2>${stockSymbol2}</h2>
            <p>Open: ${stockData2.o}</p>
            <p>High: ${stockData2.h}</p>
            <p>Low: ${stockData2.l}</p>
            <p>Close: ${stockData2.c}</p>
            <p>Volume: ${stockData2.v}</p>
          </div>
        `;
  
        comparisonResultsElement.innerHTML = stockHTML1 + stockHTML2;
  
        // Append the new comparison results to the outer stock box
        const outerStockBox = document.getElementById("Outerstockbox");
        outerStockBox.appendChild(comparisonResultsElement);
  
      } else {
        // If no data returned, handle error based on the API response
        displayError('One or more stock symbols are invalid. Please try again.', 'errorComparison');
      }
  
    } catch (error) {
      console.error('Error comparing stocks:', error);
  
      if (error.message.includes('Bandwidth limit')) {
        displayError('Bandwidth limit reached. Please try again later.', 'errorComparison');
      } else {
        displayError('An error occurred while comparing stocks. Please try again.', 'errorComparison');
      }
    }
  }
  function removeStockInfo(button) {
    // Find the parent container of the button and remove it
    const stockInfoElement = button.closest(".stock-info");
    if (stockInfoElement) {
      stockInfoElement.remove();
    }
  
    // Optionally, remove the parent `.stock-container` if it has no more `.stock-info` children
    const stockContainerElement = button.closest(".stock-container");
    if (stockContainerElement && stockContainerElement.querySelectorAll(".stock-info").length === 0) {
      stockContainerElement.remove();
    }
  }
  
  
  
  // Function to handle the removal of a comparison result
  function removeComparisonResult(button) {
    button.parentElement.remove(); // Removes only the stock info that contains the button
  }
  



function handleKeyPress(event) {
    if (event.key === "Enter") {
        document.querySelector(".compareButton").click();
    }
}

function displayError(message, elementId) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "green",
    }).showToast();

    if (elementId) {
        document.getElementById(elementId).textContent = message;
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll(".error-text");
    errorElements.forEach(element => {
        element.textContent = "";
    });
}

function updateDateTime() {
    const now = new Date();
    const options = {
        timeZone: 'America/St_Johns',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };
    const dateTimeString = now.toLocaleString('en-US', options);
    document.getElementById('dateTime').textContent = `Newfoundland Time: ${dateTimeString}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);
