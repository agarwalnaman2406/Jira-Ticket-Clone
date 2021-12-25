let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let addFlag = false;

addBtn.addEventListener("click", (e)=>{
    //Display Modal
    // Generate Ticket
    // addflag = true display model
    // addflag = none display none

    addFlag = !addFlag;
    console.log(addFlag);
    if(addFlag){
        modalCont.style.display = "flex";
    }else{
        modalCont.style.display = "none";
    }
})

modalCont.addEventListener("keydown" , (e)=>{
    console.log(e);
    let key = e.key;
    if(key === "Shift"){
        createTicket();
        modalCont.style.display = "none";
        addFlag = false;
        textareaCont.value = "";
    }
})

function createTicket(){
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color"></div>
        <div class="ticket-id">#Sample_ID</div>
        <div class="task-area">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab repudiandae quam, deleniti quas porro
            architecto amet perspiciatis minima beatae eius?
        </div>
    `;
    mainCont.appendChild(ticketCont);
}

removeBtn.addEventListener("click", (e)=>{
    console.log("removed");
})