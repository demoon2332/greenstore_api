var mainAudio = new Audio('sound/sound.mp3');
$(document).ready(function() {
    // process bar
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({
            'overflow': 'visible'
        });
    }, 600);
})

function firstQuestion(){
    $('.content').hide();
    Swal.fire({
        title: 'Cậu ơi ',
        text: 'Tớ có điều này muốn hỏi cậu nhớ phải trả lời thật lòng nhaaa.',
        imageUrl: 'images/game/cuteCat.jpg',
        imageWidth: 300,
        imageHeight: 300,
        background: '#fff url("images/iput-bg.jpg")',
        imageAlt: 'Custom image',
      }).then(function(){
        secondQuestion();
      })
}

function secondQuestion(){
    Swal.fire({
        title: 'Tên của bạn là gì',
        input: 'text',
        //inputLabel: 'Tên hoặc nickname',
        inputValue: "",
        inputPlaceholder: 'Tên hoặc nickname của cậu',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'Cho tớ biết tên cậu đi mà :< '
            }
        }
       })
        .then(function(){
         thirdQuestion();
       })
}

async function thirdQuestion(){
    const { value: accept } = await Swal.fire({
  title: 'Terms and conditions',
  input: 'checkbox',
  inputValue: 1,
  inputPlaceholder:
    'Cậu sẽ không méc với người khác.',
  confirmButtonText:
    'Continue <i class="fa fa-arrow-right"></i>',
  inputValidator: (result) => {
    return !result && 'Hứa đi , hong hứa là hong chơi với cậu.'
  }
})

if (accept) {
  Swal.fire('Cậu hứa rồi đó nha :)')
  $('.content').show(200);
  mainAudio.play();
}
}

 // switch button position
 function switchButton() {
    var audio = new Audio('sound/duck.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}
// move random button póition
function moveButton() {
    var audio = new Audio('sound/Swish1.mp3');
    audio.play();
    if (screen.width<=600) {
        var x = Math.random() * 300;
        var y = Math.random() * 500;
    } else{
        var x = Math.random() * 500;
        var y = Math.random() * 500;
    }
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}


var n = 0;
$('#no').mousemove(function() {
    if (n < 1)
        switchButton();
    if (n > 1)
        moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width>=900)
        switchButton();
})

// generate text in input
function textGenerate() {
    var n = "";
    var text = " Ngồi kế Trọng chứ còn ai nữa...........  ";
    var a = Array.from(text);
    var textVal = $('#txtReason').val() ? $('#txtReason').val() : "";
    var count = textVal.length;
    if (count > 0) {
        for (let i = 1; i <= count; i++) {
            n = n + a[i];
            if (i == text.length + 1) {
                $('#txtReason').val("");
                n = "";
                break;
            }
        }
    }
    $('#txtReason').val(n);
    setTimeout("textGenerate()", 1);
}

// show popup
$('#yes').click(function() {
    var audio = new Audio('sound/tick.mp3');
    audio.play();
    Swal.fire({
        title: 'Bạn mới sẽ ngồi chỗ nào nè ?  :vvvv',
        html: true,
        width: 900,
        padding: '3em',
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate()  placeholder='Ngồi kế bạn ....'>",
        background: '#fff url("images/iput-bg.jpg")',
        backdrop: `
              rgba(0,0,123,0.4)
              url("images/giphy2.gif")
              url("images/mafia.gif")
              url("images/Cute.jpg")
              left top
              no-repeat
            `,
        showCancelButton: true,
        cancelButtonText: "Thôi ngại lém :<<",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonColor: '#fe8a71',
        cancelButtonColor: '#f6cd61',
        confirmButtonText: 'Gửi cho tớ nha  <3'
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: 'Okiiiii lun <3',
                background: '#fff url("img/iput-bg.jpg")',
                title: 'Tớ biết mà ^^ Yêu cậu 300.000',
                text: "Cuối tuần tớ dắt cậu đi ăn kem :>>>   ",
                confirmButtonColor: '#83d0c9',
                onClose: () => {
                    window.location = 'http://fb.com';
                  }
            })
        }
    })
})

// 01/August/2022
// radio button animation
function playPause(e){
    console.log("jj")
    console.log(e.animationPlayState)
    if(e.style.animationPlayState=='running'){
        e.style.animationPlayState = 'paused'
        mainAudio.pause();
    }
    else{
        e.style.animationPlayState = 'running'
        mainAudio.play();
    }
}

//
