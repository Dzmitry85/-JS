const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];//массив товаров
        this.allProducts = [];//массив объектов
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts(){
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}
class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}
class CartProduct{
    constructor(product){
        this.title=product.product_name;
        this.price=product.price;
        this.id=product.id_product;
        this.quantity=product.quantity;
    }


render(){
    return `<div class="cart_item" data-id="${this.id}">
            <div class="desc">
                <h2 >${this.title}</h2>
                <p>${this.price} $</p>
                <p>${this.quantity}</P>
                <p>${this.id}</p>
                <button class="buy-btn">Купить</button>
            </div>
 </div>`
}
}
class Cart{
    constructor(container='.cart_box'){
        this.container=container;
        this.cartGoods=[];
        this.amount=0;
        this.countGoods=0;
        this._getItems()
            .then(data=>{
                this.cartGoods=[...data.contents];
                this.amount=data.amount;
                this.countGoods=data.countGoods;
                this.render()
            });
    }
    
    _getItems(){
        return fetch(`${API}/getBasket.json`)
            .then(result=>result.json())
            .catch(error=>{ 
                console.log(error);
            })
    }
    
render(){
    const block=document.querySelector(this.container);
    for( let product of this.cartGoods){
        const productObj= new CartProduct(product);
        block.insertAdjacentHTML('beforeend', productObj.render());
    }
    const count=document.querySelector('.cart_count');
    count.textContent=this.countGoods;
    const sum= document.querySelector('.cart_price');
    sum.textContent=this.amount;
}
}


 

let list = new ProductsList();
let lit=new Cart(); 
