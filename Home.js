class InputSuggest {
    constructor(id) {
        this.inputElement = document.getElementById(id);
        this.suggestions = [];
        this.suggestionBox = null;
        this.currentSelection = -1;
        this.createSuggestionBox();
        this.inputElement.addEventListener('input', this.showSuggestions.bind(this));
        this.inputElement.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    setSuggestions(suggestions) {
        this.suggestions = suggestions;
    }

    createSuggestionBox() {
        this.suggestionBox = document.createElement('div');
        this.suggestionBox.className = 'suggestion';
        this.suggestionBox.style.display = 'none';
        this.inputElement.parentNode.appendChild(this.suggestionBox);
    }

    showSuggestions() {
        const inputVal = this.inputElement.value.trim().toLowerCase(); 
        if (inputVal === '') {
            this.suggestionBox.style.display = 'none';
            return;
        }
        
        const filteredSuggestions = this.suggestions.filter(item => item.toLowerCase().includes(inputVal));
        this.renderSuggestions(filteredSuggestions);
    }

    renderSuggestions(suggestions) {
        this.suggestionBox.innerHTML = '';
        if (suggestions.length === 0) {
            this.suggestionBox.style.display = 'none';
            return;
        }
        suggestions.forEach((item, index) => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion__item';
            suggestionItem.textContent = item;
            suggestionItem.addEventListener('click', () => {
                this.inputElement.value = item;
                this.suggestionBox.style.display = 'none';
            });
            if (index === this.currentSelection) {
                suggestionItem.classList.add('is-selected');
            }
            this.suggestionBox.appendChild(suggestionItem);
        });
        this.suggestionBox.style.display = 'block';
    }

    handleKeyDown(e) {
        const suggestionItems = this.suggestionBox.querySelectorAll('.suggestion__item');
        if (e.key === 'ArrowDown') {
            this.currentSelection = (this.currentSelection + 1) % suggestionItems.length;
            this.highlightSelection(suggestionItems);
        } else if (e.key === 'ArrowUp') {
            this.currentSelection = (this.currentSelection - 1 + suggestionItems.length) % suggestionItems.length;
            this.highlightSelection(suggestionItems);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.currentSelection >= 0 && this.currentSelection < suggestionItems.length) {
                this.inputElement.value = suggestionItems[this.currentSelection].textContent;
                this.suggestionBox.style.display = 'none';
            }
        }
    }

    highlightSelection(items) {
        items.forEach((item, index) => {
            if (index === this.currentSelection) {
                item.classList.add('is-selected');
            } else {
                item.classList.remove('is-selected');
            }
        });
    }
}

window.onload = function() {
    const searchbox = new InputSuggest('searchbox');
    searchbox.setSuggestions([
        'AAPL',   // Apple Inc.
        'MSFT',   // Microsoft Corporation
        'AMZN',   // Amazon.com Inc.
        'GOOGL',  // Alphabet Inc. (Google)
        'FB',     // Meta Platforms, Inc. (Facebook)
        'TSLA',   // Tesla, Inc.
        'NVDA',   // NVIDIA Corporation
        'NFLX',   // Netflix, Inc.
        'INTC',   // Intel Corporation
        'AMD',    // Advanced Micro Devices, Inc.
        'DIS',    // The Walt Disney Company
        'CRM',    // Salesforce.com Inc.
        'PYPL',   // PayPal Holdings, Inc.
        'ADBE',   // Adobe Inc.
        'V',      // Visa Inc.
        'MA',     // Mastercard Incorporated
        'BABA',   // Alibaba Group Holding Limited
        'TSM',    // Taiwan Semiconductor Manufacturing Company Limited
        'JPM',    // JPMorgan Chase & Co.
        'BRK.B',  // Berkshire Hathaway Inc.
        'WMT',    // Walmart Inc.
        'HD',     // The Home Depot, Inc.
        'NKE',    // NIKE, Inc.
        'KO',     // The Coca-Cola Company
        'PEP',    // PepsiCo, Inc.
        'PG',     // Procter & Gamble Co.
        'UNH',    // UnitedHealth Group Incorporated
        'MRK',    // Merck & Co., Inc.
        'PFE',    // Pfizer Inc.
        'BA',     // The Boeing Company
        'MMM',    // 3M Company
        'CAT',    // Caterpillar Inc.
        'GE',     // General Electric Company
        'IBM',    // International Business Machines Corporation
        'CSCO',   // Cisco Systems, Inc.
        'AMGN',   // Amgen Inc.
        'CVX',    // Chevron Corporation
        'XOM',    // Exxon Mobil Corporation
        'COST',   // Costco Wholesale Corporation
        'SBUX',   // Starbucks Corporation
        'LMT',    // Lockheed Martin Corporation
        'RTX',    // Raytheon Technologies Corporation
        'BAIDU',  // Baidu, Inc.
        'JD',     // JD.com Inc.
        'TM',     // Toyota Motor Corporation
        'F',      // Ford Motor Company
        'GM',     // General Motors Company
        'HMC',    // Honda Motor Co., Ltd.
        'SNE',    // Sony Group Corporation
        'MU',     // Micron Technology, Inc.
        'TXN',    // Texas Instruments Incorporated
        'ORCL',   // Oracle Corporation
        'EBAY',   // eBay Inc.
        'ATVI',   // Activision Blizzard, Inc.
        'EA',     // Electronic Arts Inc.
        'TTWO',   // Take-Two Interactive Software, Inc.
        'PYPL',   // PayPal Holdings, Inc.
        'SQ',     // Square, Inc.
        'ABNB',   // Airbnb, Inc.
        'UBER',   // Uber Technologies, Inc.
        'LYFT',   // Lyft, Inc.
        'ZM',     // Zoom Video Communications, Inc.
        'TWTR',   // Twitter, Inc.
        'SNAP',   // Snap Inc.
        'ROKU',   // Roku, Inc.
        'SPOT',   // Spotify Technology S.A.
        'NOW',    // ServiceNow, Inc.
        'ZS',     // Zscaler, Inc.
        'NET',    // Cloudflare, Inc.
        'CRWD',   // CrowdStrike Holdings, Inc.
        'DOCU',   // DocuSign, Inc.
        'FSLY',   // Fastly, Inc.
        'DDOG',   // Datadog, Inc.
        'MDB',    // MongoDB, Inc.
        'ESTC',   // Elastic N.V.
        'SPLK',   // Splunk Inc.
        'PINS',   // Pinterest, Inc.
        'UPST',   // Upstart Holdings, Inc.
        'SE',     // Sea Limited
        'SHOP',   // Shopify Inc.
        'SNOW',   // Snowflake Inc.
        'RBLX',   // Roblox Corporation
        'NVCR',   // NovoCure Limited
        'DD',     // DuPont de Nemours, Inc.
        'DOW',    // Dow Inc.
        'ALB',    // Albemarle Corporation
        'MOS',    // The Mosaic Company
        'FMC',    // FMC Corporation
        'LTHM',   // Livent Corporation
        'LAC',    // Lithium Americas Corp.
        'SQM',    // Sociedad Química y Minera de Chile S.A.
        'PAAS',   // Pan American Silver Corp.
        'HL',     // Hecla Mining Company
        'SAND',   // Sandstorm Gold Ltd.
        'RGLD',   // Royal Gold, Inc.
        'FNV',    // Franco-Nevada Corporation
        'WPM',    // Wheaton Precious Metals Corp.
        'AG',     // First Majestic Silver Corp.
        'AGI'     // Alamos Gold Inc.

    ]);
};


// Date input restrictions
const today = new Date();
const maxDate = new Date(today);
maxDate.setDate(today.getDate() - 1);
const maxYear = maxDate.getFullYear();
const maxMonth = String(maxDate.getMonth() + 1).padStart(2, '0');
const maxDay = String(maxDate.getDate()).padStart(2, '0');
const maxFormattedDate = `${maxYear}-${maxMonth}-${maxDay}`;

const dateInput = document.getElementById("dateInput");
dateInput.setAttribute('max', maxFormattedDate);

dateInput.addEventListener('input', function(e) {
    const selectedDate = new Date(this.value);
    const today = new Date();
    const day = selectedDate.getUTCDay();

    // Check if the selected date is today
    if (selectedDate.toDateString() === today.toDateString()) {
        e.preventDefault();
        this.value = '';
        alert("Today's date is not allowed");
    }

    // Check if the selected date is a weekend
    else if ([6, 0].includes(day)) {
        e.preventDefault();
        this.value = '';
        alert('Weekends not allowed');
    }

    // Check if the selected date is in the future
    else if (selectedDate > today) {
        e.preventDefault();
        this.value = '';
        alert('Future dates not allowed');
    }
});




const apiKey = 'py0oHgf3bcN3Q1OMgpUaqORS7SD3koDs';

async function fetchStockData(ticker, date) {
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${date}/${date}?adjusted=true&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Bandwith Limit reached: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        displayError(`Please try again later. ${error.message}`);
        return null;
    }
}

function displayError(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        backgroundColor: "green",
    }).showToast();

    document.getElementById('errorMessage').textContent = message;
}

async function displayStockData() {

    document.getElementById('errorMessage').textContent = '';

    const ticker = document.getElementById('searchbox').value.toUpperCase();
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
        if (stock && stock.imageUrl) {
            document.getElementById("stockImage").src = stock.imageUrl;
        } else {
            document.getElementById("stockImage").src = 'default.png'; 
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

