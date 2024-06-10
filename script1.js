const tickerImage = [
    {
        "stockName": "AAPL",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "MSFT",
        "imageUrl": "https://g.foolcdn.com/art/companylogos/square/msft.png"
    },
    {
        "stockName": "GOOGL",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/alphabet--600.png"
    },
    {
        "stockName": "AMZN",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/amazon--600.png"
    },
    {
        "stockName": "FB",
        "imageUrl": "https://d1lss44hh2trtw.cloudfront.net/assets/article/2022/02/02/meta-facebook_feature.jpg"
    },
    {
        "stockName": "TSLA",
        "imageUrl": "https://g.foolcdn.com/art/companylogos/square/tsla.png"
    },
    {
        "stockName": "JPM",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "BABA",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "NVDA",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "V",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "MA",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "PG",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "HD",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "DIS",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "KO",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "INTC",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "CRM",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "NFLX",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/netflix--600.png"
    },
    {
        "stockName": "VZ",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "PFE",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "MRK",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "BA",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "NKE",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "MCD",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "CSCO",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "WMT",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "XOM",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "CVX",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "JNJ",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "ORCL",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "PEP",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "CMCSA",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "T",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "TSM",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "UNH",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    },
    {
        "stockName": "BAC",
        "imageUrl": "https://s3-symbol-logo.tradingview.com/apple--big.svg"
    }
  ]
  
  
  
  
  
  const apiKey = 'py0oHgf3bcN3Q1OMgpUaqORS7SD3koDs';
  
  async function fetchStockData(ticker, from, to) {
    const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${from}/${to}?adjusted=true&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return null;
    }
  }
  
  async function displayStockData() {
    const ticker = document.getElementById('searchBox').value.toUpperCase();
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
  
    const stockData = await fetchStockData(ticker, fromDate, toDate);
  
    if (stockData && stockData.results) {
      const results = stockData.results;
      const latestResult = results[results.length - 1];
  
      document.getElementById("stockImage").src = tickerImage.find(stock => stock.stockName === ticker).imageUrl;
      document.getElementById('stockName').textContent = `${ticker}`;
  
      document.getElementById('closingPrice').textContent = `Closing Price: ${latestResult.c}`;
      document.getElementById('highPrice').textContent = `High Price: ${latestResult.h}`;
      document.getElementById('lowPrice').textContent = `Low Price: ${latestResult.l}`;
      document.getElementById('openingPrice').textContent = `Opening Price: ${latestResult.o}`;
      document.getElementById('timestamp').textContent = `Timestamp: ${new Date(latestResult.t)}`;
      document.getElementById('volume').textContent = `Volume: ${latestResult.v}`;
      document.getElementById('volumeWeightedAverage').textContent = `Volume Weighted Average: ${latestResult.vw}`;
    } else {
      console.error('No stock data available');
    }
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      displayStockData();
    }
  }
  
  