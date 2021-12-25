let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let modalCont = document.querySelector(".modal-cont");
let mainCont = document.querySelector(".main-cont");
let textareaCont = document.querySelector(".textarea-cont");
let addFlag = false;
let removeFlag = false;
let colors = ["lightpink", "lightblue" , "lightgreen", "black"];
let modalPriorityColor = colors[colors.length - 1];
let allPriorityColor = document.querySelectorAll(".priority-color");
let toolboxColor = document.querySelectorAll(".color");

let lockClass = "fa-lock";
let unlockClass = "fa-lock-open"

let ticketArr = [];

addBtn.addEventListener("click", (e)=>{
    //Display Modal
    // Generate Ticket
    // addflag = true display model
    // addflag = none display none

    addFlag = !addFlag;
    if(addFlag){
        modalCont.style.display = "flex";
    }else{
        modalCont.style.display = "none";
    }
})

for(let i=0;i<toolboxColor.length;i++){
    toolboxColor[i].addEventListener("click", (e)=>{
        let currentToolBoxColor = toolboxColor[i].classList[0];
        let filteredTickets = ticketArr.filter((ticketObj, idx) =>{
            return currentToolBoxColor === ticketObj.ticketColor;
        })

        // Removing Previous Tickets
        let allTicketCont = document.querySelectorAll(".ticket-cont");
        for(let i=0;i<allTicketCont.length;i++){
            allTicketCont[i].remove();
        }

        // Display new Filtered Elements
        filteredTickets.forEach((ticketObj, idx) =>{
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.tickedId);
        })
    })

    toolboxColor[i].addEventListener("dblclick", (e)=>{
        // Removing Previous Tickets
        let allTicketCont = document.querySelectorAll(".ticket-cont");
        for(let i=0;i<allTicketCont.length;i++){
            allTicketCont[i].remove();
        }

        // Display new Filtered Elements
        ticketArr.forEach((ticketObj, idx) =>{
            createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.tickedId);
        })

    })
}

removeBtn.addEventListener("click", (e)=>{
    removeFlag = !removeFlag;
})

// listener for all modal priority colouring
allPriorityColor.forEach((colorElement, indx) =>{
    colorElement.addEventListener("click", (e)=>{
        allPriorityColor.forEach((priorityColorElem, idx) =>{
            priorityColorElem.classList.remove("border");
        })
        colorElement.classList.add("border");
        modalPriorityColor = colorElement.classList[1];
    })
})

modalCont.addEventListener("keydown" , (e)=>{
    let key = e.key;
    if(key === "Shift"){
        createTicket(modalPriorityColor, textareaCont.value);
        setModalToDefault();
        addFlag = false;
    }
})

function createTicket(ticketColor, ticketTask, tickedId){
    let id = tickedId || shortid();
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">#${id}</div>
        <div class="task-area">${ticketTask}</div>
        <div class="ticket-lock">
            <i class="fas fa-lock"></i>
        </div>
    `;

    
    mainCont.appendChild(ticketCont);

    // Create object of an array and add into the ticket arr

    if(!tickedId) ticketArr.push({ticketColor, ticketTask, tickedId: id});

    handleRemoval(ticketCont);
    handleLock(ticketCont);
    handleColor(ticketCont);
}

function handleColor(ticket){
    let ticketcolor = ticket.querySelector(".ticket-color");
    ticketcolor.addEventListener("click", (e)=>{
        let currentTicketColor = ticketcolor.classList[1];
    // get ticket colour index
        let currentTicketColorIndex = colors.findIndex((color) => {
            return currentTicketColor === color;
        })
        currentTicketColorIndex++  ;
        let newTicketColorIndex = currentTicketColorIndex % colors.length;
        let newTicketColor = colors[newTicketColorIndex];
        ticketcolor.classList.remove(currentTicketColor);
        ticketcolor.classList.add(newTicketColor);
    });
}

function handleLock(ticket){
    let ticketLockElem = ticket.querySelector(".ticket-lock");
    ticketLock = ticketLockElem.children[0];
    let ticketTaskArea = ticket.querySelector(".task-area");
    ticketLock.addEventListener("click", (e)=>{
        if(ticketLock.classList.contains(lockClass)){
            ticketLock.classList.remove(lockClass);
            ticketLock.classList.add(unlockClass);
            ticketTaskArea.setAttribute("contenteditable", "true");
        }else{
            ticketLock.classList.remove(unlockClass);
            ticketLock.classList.add(lockClass);
            ticketTaskArea.setAttribute("contenteditable", "false");
        }
        
    })
}

function handleRemoval(ticket){
    ticket.addEventListener("click", (e)=>{
        if(removeFlag){
            ticket.remove();
        }
    });
}

function setModalToDefault(){
    allPriorityColor.forEach((priprityColorsElem, idx) =>{
        priprityColorsElem.classList.remove("border");
    })
    allPriorityColor[allPriorityColor.length-1].classList.add("border");
    modalCont.style.display = "none";
    textareaCont.value = "";
    modalPriorityColor = colors[colors.length - 1];
}