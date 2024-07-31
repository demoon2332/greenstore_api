
  //variables
  let count = 0
  let chesses
  let totalTickets = 1

  //elements
  let grid = document.getElementsByClassName('grid')[0];
  const clone = document.getElementById('ticket1').cloneNode(true)
  

  // use for auto finding number to mark it
  let chosenDigits = '' //max amount should be 2 digits (because in this game we only use 01 --> 90 )




  window.onload = async function () {
    if (sessionStorage.getItem('chesses') == undefined) {
      console.log("1")
      chesses = await getChesses()
      sessionStorage.setItem('chesses', JSON.stringify(chesses))
      console.log("2")
    }
    else {
      chesses = JSON.parse(sessionStorage.getItem('chesses'))
    }

    console.log("after fetching")
    console.log(chesses)

    // set event to listener 
    let newSelect = document.getElementById('ticket1').querySelector('select')
    newSelect.addEventListener('change',function(event){
      changeChess('ticket1',event.target.value)
    },true)

    // add event to each number
    addEventToNumber('ticket1')
    addEventToDigits()
    
    // start music
    // let backgroundAudio = new Audio('sound/sound.mp3');
    // backgroundAudio.play()
  }


  //functions
  // chess now should be known as a ticket (paper or table of numbers)

  async function getChesses() {
    let chesses
    // Send the Array as a stringified JSON to the server via an Ajax request using the Fetch API:
    await fetch(window.location.href, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json()) // <= Handle JSON response from server
      .then(data => {
        chesses = data
      })
      .catch(error => {
        console.error(error)
      });
    return chesses
  }



  // addTicket (create new ticket ) --> empty ticket --> changeChess --> pushDataToEmptyTicket

  function pushDataToEmptyTicket(parent, data) {
    //parent is parent element
  }

  function changeChess(ticket_id,chess_id) {
    let lines = document.getElementById(ticket_id).querySelectorAll('.line span')
    let chess = chesses.filter((e) => e.id == chess_id)[0];
    let numbers = chess.numbers.split(' ');
    
    // set color of ticket
    let ticket = document.getElementById(ticket_id)
    ticket.style.background = chess.colorCode

    // set information of ticket
    let seed = ticket.querySelector('.ticket_seed')
    let color = ticket.querySelector('.ticket_color')
    seed.innerHTML = chess.id
    color.innerHTML = chess.color

    for (let i = 0; i < numbers.length; i++) {
      //let currentLine = Math.floor(i/5)
      //let currentPos = i % 5
      // a line has 5 positions
      //lines[currentLine][currentPos]. = numbers[i]
      lines[i].innerHTML = numbers[i]
    }
  }


  function addEventToNumber(ticket_id){
    let audio = new Audio('sound/tick.mp3');
    let boxes = document.getElementById(ticket_id).querySelectorAll('.grid input')
    boxes.forEach((box)=>{box.addEventListener("change",function(e){
      let parentLine = box.parentNode.parentNode
      let parentCount = parentLine.getAttribute('tag') //max = 5 and min = 0
      if(e.target.checked){    
        parentLine.setAttribute('tag',parseInt(parentCount) + 1)
      }
      else{
        parentLine.classList.remove('line-bingo')
        parentLine.setAttribute('tag',parseInt(parentCount) - 1 )
      }

      //if reach count = 5 then announce
      if(parentLine.getAttribute('tag') == "5")
        {
          audio.play()
          parentLine.classList.add('line-bingo')
        }
    })
    });
  }

  function addTicket() {
    //copy empty ticket --> totalTicket + 1 --> update id of main tag element = 'ticket*' with * is totalTicket
    let container = document.getElementById('container')
    let newTicket = clone.cloneNode(true)
    totalTickets += 1
    newTicket.id = 'ticket'+totalTickets
    container.appendChild(newTicket)

    //add event listener to select element (select option only affect the grid area)
    let newSelect = newTicket.querySelector('select')
    newSelect.addEventListener('change',function(event){
      changeChess(newTicket.id,event.target.value)
    },true)

    // add event listener to each number in chess (position in grid)

    addEventToNumber(newTicket.id)

    // let boxes = newTicket.querySelectorAll('.grid input')
    // boxes.forEach((box)=>{box.addEventListener("change",function(e){
    //   let parentLine = box.parentNode.parentNode
    //   let parentCount = parentLine.getAttribute('tag') //max = 5 and min = 0
    //   if(e.target.checked){    
    //     parentLine.setAttribute('tag',parseInt(parentCount) + 1)
    //   }
    //   else{
    //     parentLine.classList.remove('line-bingo')
    //     parentLine.setAttribute('tag',parseInt(parentCount) - 1 )
    //   }

    //   //if reach count = 5 then announce
    //   if(parentLine.getAttribute('tag') == "5")
    //     {
    //       parentLine.classList.add('line-bingo')
    //       announce()
    //     }
    // })
    // });
  }

  // these functions below used for automatically finding and marking number for many tickets 

  function openNumbersTable(){
    let numbersManagementHTML = document.querySelector('#numbersManagement').cloneNode(true);
    Swal.fire({
      title: 'Picked numbers',
      text: 'These are numbers has been rolled out.',
      imageUrl: 'images/game/cuteCat.jpg',
      imageWidth: 300,
      imageHeight: 300,
      background: '#fff url("images/iput-bg.jpg")',
      imageAlt: 'Custom image',
      html: numbersManagementHTML
    })
  }

  function pickBtn(){

  }

  function addEventToDigits(){
    let boxes = document.querySelector('.numberKeyboard').querySelectorAll('input')



    boxes.forEach((box)=>{box.addEventListener("change",function(e){
      let number = box.parentNode.querySelector('span').innerHTML

      // assign random digits to this number 
      let ran_digit = document.querySelector('#digit-random')
      ran_digit.querySelector('span').innerHTML = number

      // assign to chosenDigit
      if(e.target.checked){    
        chosenDigits = chosenDigits + number
      }
      else{
        chosenDigits = chosenDigits.replace(number,'')
      }
      console.log(chosenDigits)
    })
    });
  }

  function findAndMark(){
    let number = parseInt(chosenDigits)
    // // get all current tickets
    // let tickets = document.getElementsByTagName('main')

    // // find ticket contain this number
    // let ticketsContains
    // tickets.forEach((ticket)=>{
    //   let number = ticket.querySelector('select').value
    //   chesses.find(e => e.id == number)
    // });

    // // find line contain this number (line inside the ticket)



    // find all boxes 
    let boxes = document.querySelectorAll('.mark')
    boxes.forEach((box)=>{
      let value = box.querySelector('span').innerHTML
      if(value == number){
        console.log("CLICK")
        box.parentNode.querySelector('input').click()
      }
    });

    // clear all digits after marked
    chosenDigits = ''
    let digits = document.querySelector('.numberKeyboard').querySelectorAll('input')
    digits.forEach((e)=>{
      if(e.checked)
        e.click()
    })
  }

  function addNumber(e){
    console.log("work")
    
    // add numbers to number management table
    // let numberClone = document.getElementsByClassName('numberPicked')[0]
    // numberClone.innerHTML = parseInt(chosenDigits)
    // numbersManagementHTML.appendChild(numberClone)

    // add to numbers management table
    let a = parseInt(chosenDigits)
    console.log("before function",a)
    addNumberToTable(parseInt(chosenDigits))

    findAndMark()
  }




  function addNumberToTable(number){
    console.log("In function: ",number)
    let clone = document.querySelector('.numberPicked').cloneNode(true)
    clone.innerHTML = number
    clone.classList.remove('hidden')
    let table = document.querySelector('#numbersManagement')
    table.appendChild(clone)

  }

  function findAndUnmarked(number){
    // find all boxes 
    let boxes = document.querySelectorAll('.mark')
    boxes.forEach((box)=>{
      let value = box.querySelector('span').innerHTML
      if(value == number){
        console.log("CLICK")
        box.parentNode.querySelector('input').click()
      }
    });

  }

  function removeNumber(e){
    // delete this number block
    e.remove()
    console.log("Remove  number: ",e.innerHTML)
    findAndUnmarked(e.innerHTML)
  }

  async function confirmAnnounce(e){
    const { value: accept } = await Swal.fire({
      title: 'Delete Confirm',
      text: 'Do you want to delete number '+e.innerHTML,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 
        'Delete <i class="fa fa-arrow-right"></i>',
      confirmButtonColor: '#d33',
    })
    
    if (accept) {
      removeNumber(e)
    }
  }

  
