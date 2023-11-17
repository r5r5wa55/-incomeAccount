const balance = document.getElementById("balance")
const plus_money = document.getElementById("plus-money")
const unplus_money = document.getElementById("unplus-money")
const list = document.getElementById("list")
const form = document.getElementById("form")
const text = document.getElementById("text")
const amount = document.getElementById("amount")

// let transaction = [{id:12,text:"asdasd",amount:12}];




let transaction = [];



function autoid(){
    return Math.floor(Math.random()*10000000);
}
function init(){
    list.innerHTML=''; 
    transaction.forEach(addDataToList);
    calcuateMoney();

}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function addDataToList(transaction){
    const symbol = transaction.amount < 0 ? '-' : '+';
    const item=document.createElement("li"); //createElement ใช้สร้าง Element เช่น <li></li> 
    const state = transaction.amount < 0 ? 'unplus':'plus'; //if else แบบ java
    we = numberWithCommas(Math.abs(transaction.amount));
    item.classList.add(state); //add class เขาไปใน li เพิ่อให้แสดงสถานะ
    // item.innerHTML='เงินเดือน<span>฿35000</span><button class="delete-btn">x</button>';
    item.innerHTML=`${transaction.text}<span>${symbol}${we}</span><button class="delete-btn" onclick="removedata(${transaction.id})">x</button>`;
    
    list.appendChild(item) 
  
}

function calcuateMoney(){
    
    const amounts = transaction.map(transaction=>transaction.amount);
    //ตำนวนยอดตงเหลือ และใส่ฟังชั่นเข้าไป เพื่อเติมลูกนำ้หรือจะทำอีกแบบก็ได้คือ  balance.innerHTML=`฿$`+numberWithCommas(total);
    const total=numberWithCommas(amounts.reduce((endtotal,item)=>(endtotal+=item),0).toFixed(2));
    //ตำนวนรายรับ
    const income = amounts.filter(item=>item>0).reduce((endtotal,item)=>(endtotal+=item),0).toFixed(2);
    //ตำนวนรายจ่าย
    const uncome = (amounts.filter(item=>item<0).reduce((endtotal,item)=>(endtotal+=item),0)*-1).toFixed(2);

   
    //แสดงผมข้อมูลไปหน้าจอ

    balance.innerHTML=`฿${total}`;
    plus_money.innerHTML=`฿$`+numberWithCommas(income); //อีกแบบใรการนำฟังชั่นมาใช้ในการใช้ลูกนำ้
    unplus_money.innerHTML=`฿`+numberWithCommas(uncome);

}   
function addtransaction(e){
    e.preventDefault()
    if(text.value.trim()==='' || amount.value.trim()===''){
        alert("กรุณาป้อนข้อมูลให้ครบ")
    }else{
        const data={
            id:autoid(),
            text:text.value,
            amount:+amount.value
        }
        // console.log(data);
       transaction.push(data);
       addDataToList(data);
       calcuateMoney();
       text.value='';
       amount.value='';
    }
}
function removedata(id){
    transaction=transaction.filter(transaction=>transaction.id !=id)
    init();
  

}

form.addEventListener('submit',addtransaction);


init();
