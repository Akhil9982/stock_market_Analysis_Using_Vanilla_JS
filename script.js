import fetchCreateChart from "./scriptTwo.js";
fetchCreateChart("5y", "AAPL");
export async function getStocks(Ele) {
  try {
    const response = await fetch(
      "https://stock-market-api-k9vl.onrender.com/api/profiledata"
    );
    const result = await response.json();
    document.querySelector(".stock-description p").textContent =
    result.stocksProfileData[0][Ele].summary;
  } catch (err) {
    console.error(err);
  }
}
export async function getStockStats(Ele) {
  try {
    const response = await fetch(
      "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata"
    );
    const result = await response.json();
    const { bookValue, profit } = result.stocksStatsData[0][Ele];
    document.getElementById("company-name").textContent = Ele;
    const profitEl = document.getElementById("company-profit");
    profitEl.textContent = `${profit}%`;
    profitEl.style.color = profit > 0 ? "green" : "red";
    document.getElementById("profit-value").textContent = `$${bookValue}`;
  } catch (err) {
    console.error(err);
  }
}
async function getStatusList(Ele) {
  const response = await fetch(
    "https://stock-market-api-k9vl.onrender.com/api/stocksstatsdata"
  );
  const result = await response.json();
  return result.stocksStatsData[0][Ele];
}
async function renderList() {
  const stocks = [
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "PYPL",
    "TSLA",
    "JPM",
    "NVDA",
    "NFLX",
    "DIS",
  ];
  const listElement = document.querySelector(".stock-list");
  for (const stock of stocks) {
    const { bookValue, profit } = await getStatusList(stock);
    const div = document.createElement("div");
    const btn = document.createElement("button");
    const value = document.createElement("span");
    const profitEl = document.createElement("span");
    btn.textContent = stock;
    value.textContent = `$${bookValue}`;
    profitEl.textContent = `${profit.toFixed(2)}%`;
    profitEl.style.color = profit > 0 ? "green" : "red";
    btn.onclick = () => fetchCreateChart("5y", stock);
    div.append(btn, value, profitEl);
    listElement.appendChild(div);
  }
}
renderList();
