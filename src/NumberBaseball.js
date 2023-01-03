var count = 0; //정답을 입력한 횟수
var answer = [];
var strike = 0;
var answerCheck = false;
var ball = 0;
var key;
var trList = document.getElementById("gameTable").getElementsByTagName("tr");

//값 입력 시
document.getElementById("form").onsubmit = function () {
  var inputNumber = document.getElementById("inputNumber");
  var num = inputNumber.value;
  var digits = [];
  digits[0] = Math.floor(num / 1000); //천의 자리 숫자
  digits[1] = Math.floor((num % 1000) / 100); //백의 자리 숫자
  digits[2] = Math.floor((num % 100) / 10); //십의 자리 숫자
  digits[3] = num % 10; //일의 자리 숫자

  if (errorCheck(digits)) {
    //에러 발생 시 종료
    inputNumber.value = null;
    return false;
  } else if (answerCheck) {
    alert("You win! 재시작을 눌러주세요.");
    inputNumber.value = null;
    return false;
  } else if (count == 9) {
    alert("You lose! 재시작을 눌러주세요.");
    inputNumber.value = null;
    return false;
  } else if (num > 9999) {
    alert("네 자리 숫자만 입력하세요!");
    inputNumber.value = null;
    return false;
  } else {
    //정상적인 값 입력 시
    count++; //입력 횟수 1증가
    processingGame(digits);

    var tr = trList[count];
    var td1 = tr.getElementsByTagName("td")[1];
    var td2 = tr.getElementsByTagName("td")[2];

    td1.innerHTML = num;
    td2.innerHTML = strike + " 스트라이크 " + ball + " 볼";

    if (strike == 4) {
      document.getElementById("gameClear").style.display = "block";
      answerCheck = true;
    } else if (count == 9) {
      alert("You lose! 정답은 " + key + "입니다.");
    }

    //입력 값과 스트라이크 볼 수를 초기화
    inputNumber.value = null;
    strike = 0;
    ball = 0;
    return false;
  }
};

//입력한 값의 스트라이크와 볼 수를 알려주는 함수
function processingGame(digits) {
  var processingGame_digits = digits;
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (i == j && processingGame_digits[i] == answer[j]) {
        strike++;
      } else if (processingGame_digits[i] == answer[j]) {
        ball++;
      }
    }
  }
}

//랜덤한 서로 다른 4자리 수를 생성
function makeAnswer() {
  var answer_arr = []; //9x8x7x6개의 서로 다른 4자리 수의 배열
  index = 0;

  for (var i = 1; i <= 9; i++) {
    for (var j = 1; j <= 9; j++) {
      for (var k = 1; k <= 9; k++) {
        for (var l = 1; l <= 9; l++) {
          if (i != j && i != k && i != l && j != k && j != l && k != l) {
            answer_arr[index] = i * 1000 + j * 100 + k * 10 + l;
            index++;
          }
        }
      }
    }
  }

  key = answer_arr[Math.floor(Math.random() * (index - 1))];
  answer[0] = Math.floor(key / 1000); //천의 자리 숫자
  answer[1] = Math.floor((key % 1000) / 100); //백의 자리 숫자
  answer[2] = Math.floor((key % 100) / 10); //십의 자리 숫자
  answer[3] = key % 10; //일의 자리 숫자
  console.log(key);
}

//입력한 값에 오류가 있는지 확인
function errorCheck(digits) {
  var errorCheck_digits = digits;
  if (
    Number.isNaN(digits[0]) ||
    Number.isNaN(digits[1]) ||
    Number.isNaN(digits[2]) ||
    Number.isNaN(digits[3])
  ) {
    alert("입력 값이 숫자가 아닙니다!");
    return true;
  } else if (
    digits[0] == digits[2] ||
    digits[0] == digits[2] ||
    digits[0] == digits[3] ||
    digits[1] == digits[2] ||
    digits[2] == digits[3] ||
    digits[2] == digits[3]
  ) {
    alert("서로 다른 숫자를 입력하세요!");
    return true;
  } else if (
    digits[0] == 0 ||
    digits[1] == 0 ||
    digits[2] == 0 ||
    digits[3] == 0
  ) {
    alert("0을 제외한 숫자를 입력하세요!");
    return true;
  }
  return false;
}

//재시작 함수
function restart() {
  for (var i = 1; i <= count; i++) {
    var tr = trList[i];
    var td1 = tr.getElementsByTagName("td")[1];
    var td2 = tr.getElementsByTagName("td")[2];
    td1.innerHTML = " ";
    td2.innerHTML = " ";
  }
  answerCheck = false;
  count = 0; //입력 횟수 초기화
  strike = 0;
  ball = 0;
  document.getElementById("gameClear").style.display = "none";
  inputNumber.value = null;
  makeAnswer();
}

function view() {
  //버튼 클릭 시 게임 화면 보이기
  const displayGame = document.getElementById("displayGame");
  if (displayGame.style.display == "none") {
    displayGame.style.display = "block";
    makeAnswer();
  } else {
    displayGame.style.display = "none";
    restart();
  }

  //버튼 클릭시 start버튼 없어지고 처음으로 버튼 생성
  const startButton = document.getElementById("startButton");
  if (startButton.innerText === "Start") {
    startButton.innerText = "처음으로";
  } else {
    startButton.innerText = "Start";
  }
}
