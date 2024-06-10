
async function fetchStockData(symbol, date) {
  const apiKey = 'py0oHgf3bcN3Q1OMgpUaqORS7SD3koDs';
  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${date}/${date}?adjusted=true&sort=asc&apiKey=${apiKey}`;

  try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
          return data.results[0]; // Return the first (and only) result
      } else {
          return null;
      }
  } catch (error) {
      console.error('Error fetching stock data:', error);
      return null;
  }
}

function getStockImageUrl(symbol) {
  const stockInfo = tickerInfo.find(info => info.stockName === symbol);
  return stockInfo ? stockInfo.imageUrl : 'default-image-url.png'; // Replace with a default image URL if not found
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
  const stockData = await fetchStockData(additionalStockSymbol, additionalDate);
  const stockImageUrl = getStockImageUrl(additionalStockSymbol);

  if (stockData) {
      const comparisonResultsElement = document.createElement("div");
      const containerId = `comparisonResults${additionalStockSymbol}`;
      comparisonResultsElement.id = containerId;
      comparisonResultsElement.classList.add("stock-container");

      const stockHTML = `
          <div class="stock-info">
              <button class="remove-button" onclick="removeStock('${additionalStockSymbol}')">❌</button>
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
      document.body.appendChild(comparisonResultsElement);
  } else {
      displayError('Failed to fetch stock data. Please try again later.', 'errorAdditionalStockSymbol');
  }
}

function compareStocks() {
  const container = document.getElementById("additionalStockInput");
  container.style.display = "block";
  const stockSymbol1 = document.getElementById("searchBox1").value.toUpperCase();
  const stockSymbol2 = document.getElementById("searchBox2").value.toUpperCase();
  const date = document.getElementById("datePicker").value;

  clearErrorMessages();

  if (!stockSymbol1) {
      displayError('Please enter a valid stock symbol.', 'errorSearchBox1');
      return;
  }

  if (!stockSymbol2) {
      displayError('Please enter a valid stock symbol.', 'errorSearchBox2');
      return;
  }

  if (!date) {
      displayError('Please enter a valid date.', 'errorDatePicker');
      return;
  }

  fetchStockData(stockSymbol1, date).then(stockData1 => {
      fetchStockData(stockSymbol2, date).then(stockData2 => {
          if (stockData1 && stockData2) {
              const stockImageUrl1 = getStockImageUrl(stockSymbol1);
              const stockImageUrl2 = getStockImageUrl(stockSymbol2);
              displayComparison(stockSymbol1, stockData1, stockImageUrl1, stockSymbol2, stockData2, stockImageUrl2);
          } else {
              displayError('Failed to fetch stock data. Please check the symbols and date, and try again.', 'errorSearchBox1');
          }
      });
  });
}

function displayComparison(stockSymbol1, stockData1, stockImageUrl1, stockSymbol2, stockData2, stockImageUrl2) {
  const comparisonResultsElement1 = document.getElementById("comparisonResults1");
  const comparisonResultsElement2 = document.getElementById("comparisonResults2");

  comparisonResultsElement1.innerHTML = `
      <div class="stock-info1">
          <button class="remove-button" onclick="removeStock('1')">❌</button>
          <img src="${stockImageUrl1}" alt="${stockSymbol1} Image">
          <h2>${stockSymbol1}</h2>
          <p>Open: ${stockData1.o}</p>
          <p>High: ${stockData1.h}</p>
          <p>Low: ${stockData1.l}</p>
          <p>Close: ${stockData1.c}</p>
          <p>Volume: ${stockData1.v}</p>
      </div>
  `;

  comparisonResultsElement2.innerHTML = `
      <div class="stock-info2">
          <button class="remove-button" onclick="removeStock('2')">❌</button>
          <img src="${stockImageUrl2}" alt="${stockSymbol2} Image">
          <h2>${stockSymbol2}</h2>
          <p>Open: ${stockData2.o}</p>
          <p>High: ${stockData2.h}</p>
          <p>Low: ${stockData2.l}</p>
          <p>Close: ${stockData2.c}</p>
          <p>Volume: ${stockData2.v}</p>
      </div>
  `;
}

function removeStock(symbol) {
    const stockElement = document.getElementById(`comparisonResults${symbol}`);
    if (stockElement) {
        stockElement.remove(); // Remove the entire element from the DOM tree
    }
  }
  

function handleKeyPress(event) {
  if (event.key === "Enter") {
      document.querySelector(".compareButton").click();
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


function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-text");
  errorElements.forEach(element => {
      element.textContent = "";
  });
}
const picker = document.getElementById('datePicker','additionalDate');
picker.addEventListener('input', function(e){
  const day = new Date(this.value).getUTCDay();
  if([6,0].includes(day)){
    e.preventDefault();
    this.value = '';
    alert('Weekends not allowed');
  }
});