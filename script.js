let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');



//เมื่อคลิกที่ openShopping, จะเพิ่มคลาส active ให้กับ body เพื่อแสดงตะกร้าสินค้า.
openShopping.addEventListener('click', () => {
        body.classList.add('active');
    })
    //เมื่อคลิกที่ closeShopping, คลาส active จะถูกลบออกจาก body เพื่อซ่อนตะกร้าสินค้า.
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [{
        id: 1,
        name: 'หัว Marbo nic50 - องุ่น',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'หัว Marbo nic50 - แตงโม',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'หัว Marbo nic50 - องุ่นอโล',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'หัว Marbo - แอปเปิล',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'หัว Marbo - พีช',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'หัว Marbo - พีชสตอ',
        image: '6.PNG',
        price: 120000
    },
    {
        id: 7,
        name: 'หัว Marbo - มิ้นท์',
        image: '7.PNG',
        price: 120000
    },
    {
        id: 8,
        name: 'หัว Marbo - มะนาว',
        image: '8.PNG',
        price: 320000
    },
    {
        id: 9,
        name: 'หัว Jues+ - แฟนต้าองุ่น',
        image: '9.PNG',
        price: 120000
    },
    {
        id: 10,
        name: 'หัว Jues+ -สตอ โยเกิร์ต',
        image: '10.PNG',
        price: 120000
    }
];
let listCards = [];


//มันจะสร้าง HTML elements สำหรับแต่ละสินค้าและแสดงผลลัพธ์ในหน้าเว็บ โดยใช้ forEach loop สำหรับทุกสินค้าใน array products
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card <i class="fas fa-shopping-cart"></i></button>`; // เพิ่มไอคอนรถเข็นหลังจากปุ่ม "Add To Card"
        list.appendChild(newDiv);
    })
}
initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = {...products[key], quantity: 1 }; // ถ้าสินค้ายังไม่ได้ถูกเพิ่ม ให้เพิ่มสินค้านั้นและกำหนด quantity เป็น 1
    } else {
        listCards[key].quantity += 1; // ถ้าสินค้าได้ถูกเพิ่มแล้ว ให้เพิ่ม quantity
    }
    reloadCard(); // โหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            let totalItemPrice = value.price * value.quantity; // คำนวณราคารวมสำหรับแต่ละสินค้า
            totalPrice += totalItemPrice; // อัปเดตราคารวมทั้งหมด
            count += value.quantity; // อัปเดตจำนวนสินค้าทั้งหมด

            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${totalItemPrice.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString(); // อัปเดตราคารวมใน UI
    quantity.innerText = count; // อัปเดตจำนวนสินค้าใน UI

}


function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key]; //// ลบสินค้าออกถ้าจำนวนเป็น 0
    } else {
        listCards[key].quantity = quantity; //// อัปเดตจำนวนสินค้า
        listCards[key].price = quantity * products[key].price; //เป็นคำนวณนี้เป็นการอัปเดตราคาของสินค้าในตะกร้า
    }
    reloadCard();
}