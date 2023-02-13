
  //variables
  let count = 0
  let chesses
  let totalTickets = 1

  //elements
  let grid = document.getElementsByClassName('grid')[0];



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
    console.log(ticket)
    console.log("plesae above")

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

  function announce(){
    let audio = new Audio('sound/tick.mp3');
    audio.play()
  }

  function addEventToNumber(ticket_id){
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
          parentLine.classList.add('line-bingo')
          announce()
        }
    })
    });
  }

  function addTicket() {
    //copy empty ticket --> totalTicket + 1 --> update id of main tag element = 'ticket*' with * is totalTicket
    let container = document.getElementById('container')
    let newTicket = document.getElementById('ticket1').cloneNode(true)
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
