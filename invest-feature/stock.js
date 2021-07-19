let search;
const lastUpdated = new Date().toLocaleString();

$(document).ready(function() {
  search = "AMID";
  getStockInfo();
  getIndices();
  getStockChart();

  $(".lastUpdated").text(`Last updated: ${lastUpdated}`);

  $("#search").on("click", function() {
    $(".searchbar").toggleClass("hidden");
  });

  $("#viewChart").on("click", function() {
    $("#stockChart").toggleClass("hidden");
  });

  $(".searchbar").keypress(function(e) {
    if(e.which == 13) {
      search = $(".searchbar").val();
      getStockInfo();
      getStockChart();
    }
  });
})

function getStockInfo() {
  data = $.ajax({
    	type: "GET",
    	url: `https://api.iextrading.com/1.0/stock/${search}/quote`,
    	dataType: "json",
    	success: function(data){
        let name = data.symbol;
        let price = rounder(data.latestPrice, 2);
        let change = data.changePercent;
        let closeTime = new Date(data.closeTime).toLocaleString();

        $(".header .name").text(name);
        $(".header .price").text(price);
        $(".header .change").text((rounder(change, 4) * 100).toFixed(2) + "%");
        $(".closeTime").text(`Trading Window Closes: ${closeTime}`);

        if(change >= 0) {
          $(".header .change").css("color", "green");
          $(".header .change").prepend("&#x25B2;");
        } else {
          $(".header .change").css("color", "red");
          $(".header .change").prepend("&#x25BC;");
        }
      }
  });
}

function getIndices() {
  data = $.ajax({
    	type: "GET",
    	url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^DJI&apikey=D82RGKW7PC6AAW7D",
    	dataType: "json",
    	success: function(data){
        let lastRefreshed = data['Meta Data']['3. Last Refreshed'];
        let price = rounder(data["Time Series (Daily)"][lastRefreshed]["1. open"], 2);
        let yPrice = data["Time Series (Daily)"][getYesterdayDate()]["1. open"];
        let change = (rounder(((price - yPrice) / Math.abs(price)), 4) * 100).toFixed(2) + "%";

        $("#djia .price").text(price);
        $("#djia .change").text(change);

        if(change >= 0) {
          $("#djia .change").css("color", "green");
          $("#djia .change").prepend("&#x25B2;");
        } else {
          $("#djia .change").css("color", "red");
          $("#djia .change").prepend("&#x25BC;");
        }
      }
  });

  data = $.ajax({
    	type: "GET",
    	url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^GSPC&apikey=D82RGKW7PC6AAW7D",
    	dataType: "json",
    	success: function(data){
        let lastRefreshed = data['Meta Data']['3. Last Refreshed'];
        let price = rounder(data["Time Series (Daily)"][lastRefreshed]["1. open"], 2);
        let yPrice = rounder(data["Time Series (Daily)"][getYesterdayDate()]["1. open"], 2);
        let change = (rounder(((price - yPrice) / Math.abs(price)), 4) * 100).toFixed(2) + "%";

        $("#gspc .price").text(price);
        $("#gspc .change").text(change);

        if(change >= 0) {
          $("#gspc .change").css("color", "green");
          $("#gspc .change").prepend("&#x25B2;");
        } else {
          $("#gspc .change").css("color", "red");
          $("#gspc .change").prepend("&#x25BC;");
        }
      }
  });

  data = $.ajax({
    	type: "GET",
    	url: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=^IXIC&apikey=D82RGKW7PC6AAW7D",
    	dataType: "json",
    	success: function(data){
        let lastRefreshed = data['Meta Data']['3. Last Refreshed'];
        let price = rounder(data["Time Series (Daily)"][lastRefreshed]["1. open"], 2);
        let yPrice = rounder(data["Time Series (Daily)"][getYesterdayDate()]["1. open"], 2);
        let change = (rounder(((price - yPrice) / Math.abs(price)), 4) * 100).toFixed(2) + "%";

        $("#ixic .price").text(price);
        $("#ixic .change").text(change);

        if(change >= 0) {
          $("#ixic .change").css("color", "green");
          $("#ixic .change").prepend("&#x25B2;");
        } else {
          $("#ixic .change").css("color", "red");
          $("#ixic .change").prepend("&#x25BC;");
        }
      }
  });
}

function getStockChart(){
  new TradingView.MediumWidget({
  "container_id": "tv-medium-widget-5e6f9",
  "symbols": [
    [
      "Google",
      search
    ]
  ],
  "greyText": "Quotes by",
  "gridLineColor": "#e9e9ea",
  "fontColor": "#83888D",
  "underLineColor": "#dbeffb",
  "trendLineColor": "#4bafe9",
  "width": "80%",
  "height": "400px",
  "locale": "en"
  });
}

function formatDate() {
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function getYesterdayDate() {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate() - 1,
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

function rounder(number, precision) {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

setInterval(getStockInfo, 10000);



