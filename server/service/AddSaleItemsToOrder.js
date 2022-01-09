
function AddSaleItems(order){
    let {items} = order;
    let newItems = [];
    const doesMatchCondition = (item) => {
        
    }
    items.map(v=>{
        if(doesMatchCondition(v)){
            
        }
    });
    order.items = [...newItems, ...items];
    return order;
}
module.exports = AddSaleItems;