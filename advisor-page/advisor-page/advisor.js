function getData() {
  
    if ($("#age").val() < 15) {
      alert("Please enter a value above the minimum age of 15.")
      
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    }
    
    let moneyMaker = $("#investMoney").val()
    let ageInvestor = $("#age").val()
    
    let gcAmount = moneyMaker * 0.075
    
    let bondsPercentage = (ageInvestor - 15)/100
    let bondsAmount =  bondsPercentage * moneyMaker
    
    let stocksPercentage = (100 - 15 - bondsPercentage*100)/100
    let stocksAmount = moneyMaker - (gcAmount*2) - bondsAmount
    
    // var finalAdvice = `With a total of ${moneyMaker}$ you should invest ${gcAmount}$ in gold, ${gcAmount}$ in commodities, ${bondAmount}$ in government bonds and ${stocksAmount} in stocks. Congratulations, you will be a millionaire in no time without much variance!`
    
    let intro = `With a total of ${moneyMaker}$ to invest and an age of ${ageInvestor}, you should:`
    
    // Give the % to invest
    $(".gcPercentage").html("7.5%")
    $("#bondsPercentage").html(Math.round(bondsPercentage*100) + "%")
    $("#stocksPercentage").html(Math.round(stocksPercentage*100) + "%")
    
    // Give the amount to invest
    $(".gcAmount").html(Math.round(gcAmount) + "$")
    $("#bondsAmount").html(Math.round(bondsAmount) + "$")
    $("#stocksAmount").html(Math.round(stocksAmount) + "$")
    }