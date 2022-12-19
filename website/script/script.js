// let a = {"a": 10, "b": 15}
// undefined
// a
// {a: 10, b: 15}
// localStorage.setItem('key', JSON.stringify(a));
// undefined
// localStorage.getItem('key');
// '{"a":10,"b":15}'
// JSON.parse(localStorage.getItem('key'))
// {a: 10, b: 15}

const products = [
    {
        id: 1,
        title: 'Bicycle',
        price: 45000
    },
    {
        id: 2,
        title: 'Rollers',
        price: 2500
    },
    {
        id: 3,
        title: 'Scooter',
        price: 15000
    },
    {
        id: 4,
        title: 'Ski',
        price: 27000
    },
];

const products_div = document.querySelector('.products');
const basket_container = document.querySelector('.basket');

function write_basket(arr){
    localStorage.setItem('basket', JSON.stringify(arr))
}

function read_basket(){
    return JSON.parse(localStorage.getItem('basket')) ?? [];
}


function render () {
    products.forEach(({id, title, price}) => {
        const container = document.createElement('div');
        const title_p = document.createElement('p');
        const price_p = document.createElement('p');
        const btn = document.createElement('button');
        container.classList.add('product');
        btn.classList.add('btn')

        btn.addEventListener('click', () => {
            const basket = read_basket();
            const target_product = basket.find(product => product.id === id);

            if(target_product === undefined){
                basket.push({id, title, price, count: 1});
            }else{
                target_product.count++;
            }
            write_basket(basket);

            rerender_basket()
        });

        title_p.innerText = title;
        price_p.innerText = price;
        btn.innerText = 'Add to basket';

        container.append(title_p, price_p, btn);
        products_div.append(container);
    })
}

function incr_count (id){
    const basket = read_basket();
    const basket_product = basket.find(item => item.id === id);
    basket_product.count++;
    write_basket(basket)
    rerender_basket()
}

function decr_count (id){
    const basket = read_basket();
    const basket_product = basket.find(item => item.id === id);
    if(basket_product.count === 1){
        delete_product(basket_product.id)
    }else{
        basket_product.count--;
        write_basket(basket)
    }
    rerender_basket()
}

function delete_product(id){
    const basket = read_basket();
    const basket_product = basket.filter(item => item.id !== id);
    
    write_basket(basket_product)
    rerender_basket()
}


function rerender_basket(){
    basket_container.innerText = '';
    if(read_basket().length === 0){
        const info_p = document.createElement('p');
        info_p.classList.add('info');
        info_p.innerText = 'No products';
        basket_container.append(info_p);
    }else{
        read_basket().forEach(({id, title, price, count}) => {
            const container = document.createElement('div');
            const title_p = document.createElement('p');
            const price_p = document.createElement('p');
            const count_p = document.createElement('p');
            container.classList.add('product');

            const button_div = document.createElement('div');
            const incr_button = document.createElement('button');
            const decr_button = document.createElement('button');
            incr_button.innerText = '+';
            decr_button.innerText = '-';

            incr_button.addEventListener('click', () => {incr_count(id)});

            decr_button.addEventListener('click', () => {decr_count(id)})

            button_div.append(incr_button,decr_button);
            button_div.classList.add('btn_count');
    
            title_p.innerText = title;
            price_p.innerText = price;
            count_p.innerText = count;
            container.append(title_p, price_p, count_p, button_div);
            basket_container.append(container);
        })
    }
}

render();
rerender_basket();