const imgHang = document.querySelector("#imgHang");
const questTitle = document.querySelector("#questTitle");
const question = document.querySelector("#question");
const questLeng = document.querySelector("#questLeng");
const compScore = document.querySelector("#compScore");
const guestLeft = document.querySelector("#guestLeft");
const youScore = document.querySelector("#youScore");
const guessArr = document.querySelector("#guessArr");
const trueAns = document.querySelector("#trueAns");
const HangmanQuestions = [
    {
        category: "School Subjects",
        question: "This subject involves studying the past events, people, and societies.",
        answer: "History"
    },
    {
        category: "Classroom Objects",
        question: "Students use this writing tool to take notes during class.",
        answer: "Pen"
    },
    {
        category: " Mathematics",
        question: "What is the term for a number that can only be divided evenly by 1 and itself?",
        answer: "Prime"
    },
    {
        category: "Science",
        question: "This is the smallest unit of an element, consisting of protons, neutrons, and electrons.",
        answer: "Atom"
    },
    {
        category: "Literature",
        question: " In this Shakespeare play, two star-crossed lovers take their lives.",
        answer: " Romeo and Juliet"
    },
    {
        category: "Classroom Activities",
        question: "Students often work in groups to complete this collaborative project.",
        answer: "Presentation"
    },
    {
        category: "Geography",
        question: "What is the imaginary line that divides the Earth into Northern and Southern Hemispheres?",
        answer: "Equator"
    },
    {
        category: "Language Arts",
        question: "What is the term for a word that is the opposite in meaning to another word?",
        answer: "Antonym"
    },
    {
        category: "Technology",
        question: "This device is used to display visual information to the entire class.",
        answer: "Projector"
    },
    {
        category: "Classroom Rules",
        question: "What is the term for the set of rules that students are expected to follow in school?",
        answer: "Code of Conduct"
    },
];


class HangmanGame {
    hangData = [];
    win = 0;
    lose = 0;
    hangImg = 0;
    chanceTry = 6;
    wrongWords = [];
    arrTrue = [];
    imgINdex = 0;
    answerArr = [];
    constructor(data){
        this.hangData = data
    }

    dom(){
        compScore.innerHTML = this.lose;
    youScore.innerHTML = this.win;
    guestLeft.innerHTML = this.chanceTry;
    guessArr.innerHTML = this.wrongWords.join("");
  

    };
    compChoise(){
        return Math.floor(Math.random() * this.hangData.length)
    }
    indexArr(compAns, questAns) {
        let correctIndexes = [];
        for (let i = 0; i < compAns.length; i++) {
          if (compAns[i] === questAns) {
            correctIndexes.push(i);
          }
        }
        return correctIndexes;
      }

      start() {
        let randIndex = this.compChoise();
        questTitle.innerHTML = this.hangData[randIndex].category;
        question.innerHTML = this.hangData[randIndex].question;
        this.answerArr = this.hangData[randIndex].answer.toLowerCase().split("");
    
        let list = [];
        for (let i = 0; i < this.answerArr.length; i++) {
          list.push(`<li id="list_${i}" class="letter"></li>`);
        }
        questLeng.innerHTML = list.join("");
      }

      restart() {
        this.imgINdex = 0;
        this.chanceTry = 6;
        imgHang.src = `./Assets/image/hang-0.png`;
        questLeng.innerHTML = "";
        this.wrong_words = [];
        this.arr_true = [];
        this.answer_arr = [];
        trueAns.innerHTML = "";
        guessArr.innerHTML = "";
        this.start();
      }
    }
    
    const Mygame = new HangmanGame(HangmanQuestions);
    Mygame.dom();
    Mygame.restart();
    
    window.addEventListener("keypress", (e) => {
      if (
        !((e.keyCode >= 97 && e.keyCode <= 122) || (e.keyCode >= 65 && e.keyCode <= 90))
      ) {
        alert("Yalnız hərf daxil edə bilərsiz!");
        return; 
      }
    
      let myChoice = e.key.toLowerCase();
    
      if (
        Mygame.arrTrue.includes(myChoice) ||
        Mygame.wrongWords.includes(myChoice)
      ) {
        alert("Bu hərfi istifadə etdiz");
      } else if (Mygame.answerArr.includes(myChoice) && Mygame.chanceTry > 0) {
        let correctIndex = Mygame.indexArr(Mygame.answerArr, myChoice);
        for (let index of correctIndex) {
          Mygame.arrArue[index] = myChoice;
          const listIndex = document.querySelector(`#list_${index}`);
          listIndex.innerHTML = myChoice;
        }
      } else if (Mygame.chanceTry > 0) {
        Mygame.wrongWords.push(myChoice);
        Mygame.chanceTry -= 1;
        Mygame.imgINdex++;
        imgHang.src = `./Assets/image/hang-${Mygame.imgINdex}.png`;
      } else if (Mygame.chanceTry === 0) {
        console.log("Kaybettiniz");
        Mygame.lose++;
        trueAns.innerHTML = `True answer: ${Mygame.answerArr.join("")}`;
    
        setTimeout(() => {
          Mygame.restart();
        }, 1000);
      }
    
      if (Mygame.arrTrue.join("") === Mygame.answerArr.join("")) {
        console.log("Qalibsiniz!");
        Mygame.win++;
        Mygame.restart();
        Mygame.dom();
      }
    
      Mygame.dom();
    });

