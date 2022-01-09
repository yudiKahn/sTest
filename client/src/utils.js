

function getOrderTotal(order){
    let res = 0;
    if(order?.items){
        Array.from(order.items).forEach(item=>{
            res += (parseFloat(item.price).toFixed(2) * parseInt(item.q));
        })
    }
    return res.toFixed(2);
}

function formatDate(date){
    let d = new Date(date);
    return d.toISOString().split('T')[0].split('-').join('/');
}

function getGreeting(){
    let res = "Good ";
    let now = new Date().getHours();
    if(now > 3 && now < 12)
        res += "Morning"
    else if(now >= 12 && now < 18)
        res += "After noon";
    else if(now >= 18 && now < 23)
        res += "Evening";
    else
        res += "Night";
    return res;
}

const Shop = {
    showPrices: (prices) => {
        return prices.length > 1 ? `$${parseInt(prices[0]).toFixed(2)} - $${parseInt(prices[prices.length - 1]).toFixed(2)}` : `$${parseInt(prices[0]).toFixed(2)}`;
    }
}


function getCartSalesMsg(items){
    if(Array.from(items).findIndex(v => v.category.toLowerCase() === "sets") > -1){
        return (<div className="bg-indigo-200 rounded my-2 px-4 py-3 shadow-md w-full">
            <div className="flex">
                <div className="self-center">
                    <p className="text-sm">
                        For evrey set over $50 you get Egyptian Lulav, Arava and an Hadas C.
                        And for evrey Yanever set you get also Hadas B.
                    </p>
                </div>
            </div>
        </div>)
    }
}

export {
    getOrderTotal,
    formatDate,
    getGreeting,
    Shop,
    getCartSalesMsg
}