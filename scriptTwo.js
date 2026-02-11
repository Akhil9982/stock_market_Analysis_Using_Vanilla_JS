import { getStocks, getStockStats } from "./script.js";
let start = "AAPL";
export default async function fetchCreateChart(max = "5y", Ele = "AAPL") {
  start = Ele;
  try {
    const response = await fetch(
      "https://stock-market-api-k9vl.onrender.com/api/stocksdata"
    );
    const ans = await response.json();
    const values = ans.stocksData[0][start][max].value;
    let times = ans.stocksData[0][start][max].timeStamp;
    times = times.map((t) => new Date(t * 1000).toLocaleDateString());
    drawChart(values, times, start);
    document.getElementById("canva-tool").textContent = "";
    document.getElementById("x-go").textContent = "";
    getStocks(start);
    getStockStats(start);
  } catch (err) {
    console.error(err);
  }
}
document.getElementById("1Month").onclick = () => fetchCreateChart("1mo", start);
document.getElementById("3Month").onclick = () => fetchCreateChart("3mo", start);
document.getElementById("1year").onclick = () => fetchCreateChart("1y", start);
document.getElementById("5year").onclick = () => fetchCreateChart("5y", start);
function drawChart(data, labels, stock) {
  const canvas = document.getElementById("stockChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const stepX = canvas.width / (data.length - 1);
  const scale = canvas.height / (max - min);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - (data[0] - min) * scale);
  data.forEach((val, i) => {
    ctx.lineTo(i * stepX, canvas.height - (val - min) * scale);
  });
  ctx.strokeStyle = "#39FF14";
  ctx.lineWidth = 2;
  ctx.stroke();
  canvas.onmousemove = (e) => {
    const x = e.offsetX;
    const i = Math.min(Math.floor(x / stepX), data.length - 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - (data[0] - min) * scale);
    data.forEach((val, idx) => {
      ctx.lineTo(idx * stepX, canvas.height - (val - min) * scale);
    });
    ctx.strokeStyle = "#39FF14";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(
      i * stepX,
      canvas.height - (data[i] - min) * scale,
      5,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "#39FF14";
    ctx.fill();
    document.getElementById("canva-tool").textContent = `${stock}: $${data[
      i
    ].toFixed(2)}`;
    document.getElementById("x-go").textContent = labels[i];
  };
}
