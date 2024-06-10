function displayTickerDetails(details) {
    const stockDetails = document.getElementById('stock-details');
    stockDetails.innerHTML = '';
  
    for (const key in details) {
        if (details.hasOwnProperty(key)) {
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';
            
            const spanKey = document.createElement('span');
            spanKey.innerText = `${capitalizeFirstLetter(key.replace(/_/g, ' '))}:`; // Capitalize first letter of key
            detailItem.appendChild(spanKey);
  
            if (key === 'homepage_url' || key === 'icon_url' || key === 'logo_url') {
                const link = document.createElement('a');
                link.href = details[key];
                link.target = '_blank';
                link.innerText = details[key];
                detailItem.appendChild(link);
            } else {
                const spanValue = document.createElement('span');
                spanValue.innerText = details[key];
                detailItem.appendChild(spanValue);
            }
  
            stockDetails.appendChild(detailItem);
        }
    }
  }
  
  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  async function fetchTickerDetails() {
    const ticker = document.getElementById('ticker-input').value;
    if (!ticker) {
        showToast('Please enter a ticker symbol.');
        return;
    }
  
    const apiKey = 'py0oHgf3bcN3Q1OMgpUaqORS7SD3koDs';
    const url = `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${apiKey}`;
  
    try {
        document.getElementById('stock-details').innerHTML = '<p class="loading">Loading...</p>';
        const response = await fetch(url);
        const data = await response.json();
  
        if (response.ok && data.results) {
            displayTickerDetails(data.results);
        } else {
            showToast(data.error || 'Failed to fetch ticker details.');
            document.getElementById('stock-details').innerHTML = '';
        }
    } catch (error) {
        showToast('An error occurred while fetching ticker details.');
        document.getElementById('stock-details').innerHTML = '';
    }
  }
  
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = 'show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
  }
  