//getting all required elements
const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const option_list = document.querySelector(".option-list");
const timeCount = quiz_box.querySelector(".timer .timer-sec");
const timeLine = quiz_box.querySelector("header .time-line");
const timeOff = quiz_box.querySelector("header .time-text");






//if start quiz button clicked
start_btn.onclick=()=>{
    info_box.classList.add("activeInfo"); // show the info box
}

//if exit quiz button in the info box is clicked
exit_btn.onclick=()=>{
    info_box.classList.remove("activeInfo"); // hide the info box
}


//if continue button in the info box is clicked
continue_btn.onclick=()=>{
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.classList.add("activeQuiz"); // show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);

}

let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 15;
let widthValue = 0;
let counterLine;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next-btn");
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick=()=>{
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    let que_count = 0;
    let que_numb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let counterLine;
    let userScore = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    next_btn.style.display = "none";
    timeOff.textContent = "Time Left";

}

quit_quiz.onclick=()=>{
    window.location.reload();
}


//if the next button in the quiz box is clicked
next_btn.onclick = ()=>{
    if( que_count < questions.length-1)
    {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";

    }
    else
    {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        console.log("Questions completed");
        showResultBox();
    }
}


//getting the questions and options from the array in the questions.js file
function showQuestions(index)
{

    const que_text = document.querySelector(".que-text");
    const option_list = document.querySelector(".option-list");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';

    if (questions[index].type === "multiple-choice") 
     {
        let option_tag = '';
        for (let i = 0; i < questions[index].options.length; i++) {
          option_tag += '<div class="option">' + questions[index].options[i] + '<span></span></div>';
        }
        option_list.innerHTML = option_tag;
      }
      
      else if (questions[index].type === "open-ended") 
      {
        option_list.innerHTML = '<div class="answer-input"><input type="text" id="userAnswer"></div>';
      }

    que_text.innerHTML = que_tag;
  
    const option = option_list.querySelectorAll(".option") ;

    for (let i = 0; i < option.length; i++) 
    {
        option[i].setAttribute("onclick","optionSelected(this)");        
    }

}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';


function optionSelected(answer)
{
    clearInterval(counter);
    clearInterval(counterLine);

    const questionType = questions[que_count].type;
    if (questionType === "multiple-choice")
    {
        // Check for correct multiple-choice answer
        const userAns = answer.textContent;
        const correctAns = questions[que_count].answer;
    
        if (userAns === correctAns) 
         {
            userScore += 1;
            answer.classList.add("correct");
            console.log("Answer is correct");
            answer.insertAdjacentHTML("beforeend", tickIcon);
          } 
          else {
            answer.classList.add("incorrect");
            console.log("Answer is wrong");
            answer.insertAdjacentHTML("beforeend", crossIcon);
      
            // Automatically select the correct option
            const allOptions = option_list.children.length;
            for (let i = 0; i < allOptions; i++) {
              if (option_list.children[i].textContent === correctAns) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
              }
            }
          }

    }
    else if (questionType === "open-ended") 
    {
        // Handle open-ended answer submission
       const userAnswer = document.getElementById("userAnswer").value.toLowerCase();
       const correctAnswer = questions[que_count].answer.toLowerCase();

       if (userAnswer === correctAnswer) 
       {
        userScore += 1;
        answer.classList.add("correct");
        console.log("Answer is correct");
      } 
      else 
      {
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
      }
    }


    next_btn.style.display = "block";
}




function queCounter(index)
{
    const bottom_que_counter = quiz_box.querySelector(".total-que");
    let totaQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    bottom_que_counter.innerHTML = totaQuesCountTag;
}


function startTimer(time)
{
    counter = setInterval(timer,1000);
    function timer()
    {
        timeCount.textContent = time;
        time--;
        if(time < 9)
        {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0)
        {
            clearInterval(counter);
            timeCount.textContent = "00";
            timeOff.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions =  option_list.children.length;
            for (let i = 0; i < allOptions; i++) 
            {
                if(option_list.children[i].textContent == correctAns)
                {
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend",tickIcon);
    
                }        
            }
            for (let i = 0; i < allOptions; i++) 
                {
                    option_list.children[i].classList.add("disabled");
                    
                }

             next_btn.style.display = "block";
        }
    }
}

function startTimerLine(time)
{
    counterLine = setInterval(timer, 29);
    function timer()
    {   
        time +=1 ;
        timeLine.style.width = time + "px";
        if(time > 549)
        {
            clearInterval(counterLine);
        }
    }
}


function showResultBox()
{
    info_box.classList.remove("activeInfo"); // hide the info box
    quiz_box.classList.remove("activeQuiz"); // hide the quiz box
    result_box.classList.add("activeResult"); // show the result box

    const scoreText = result_box.querySelector(".score-text") ;
    if (userScore > 3)
    {
        let scoreTag = '<span>and congrates!, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (userScore > 1)
    {
        let scoreTag = '<span>and nice, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoreText.innerHTML = scoreTag;
    }
    else
    {
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p> </span>';
        scoreText.innerHTML = scoreTag;
    }

}




