const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

let data = fs.readFileSync("./coins.json", "utf8")
let coins = JSON.parse(data)


function time(ms){
    return new Promise((resolve,reject)=>{
        if (true){
            setTimeout(resolve,ms)
        } else {reject()}
    })
}


async function DisplayLastPrice(coin){
    const url=`https://api.btcmarkets.net/v3/markets/${coin}-AUD/ticker`
    const GetData = fetch(url)
    .then((response) => response.json())
    .then((data) => {
        return data.lastPrice;
    });

    const GetLastPrice = async () => {
        const a = await GetData
        return a
    }
    return GetLastPrice();
}


async function main(){
    let fileoutput
    while (true){
        for (let i = 0; i < coins.length; i ++){
            coins[i].price = parseFloat(await DisplayLastPrice(coins[i].name))
            if (coins[i].price > coins[i].ath)
            {
                coins[i].ath = coins[i].price
            }
            coins[i].stack = coins[i].price * coins[i].holding
        }     

        console.log(coins) 

        fileoutput = JSON.stringify(coins)       
        fs.writeFile("coins.json", fileoutput, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }         
            console.log("JSON file has been saved.");
        })
        

        await time(10000)  
    }
}

main()

