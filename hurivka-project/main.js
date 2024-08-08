document.addEventListener('DOMContentLoaded', function() {
  // Модальное окно
  let modal = document.getElementById('myModal');
  let btn = document.getElementById('openModal');
  let span = document.getElementsByClassName('close')[0];

  btn.onclick = function() {
    modal.style.display = 'block';
    setTimeout(function() {
      modal.querySelector('.modal-content').style.opacity = 1;
    }, 10);
  }

  span.onclick = function() {
    modal.querySelector('.modal-content').style.opacity = 0;
    setTimeout(function() {
      modal.style.display = 'none';
    }, 500);
  }

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.querySelector('.modal-content').style.opacity = 0;
      setTimeout(function() {
        modal.style.display = 'none';
      }, 500);
    }
  }

  // Таймер
  let timeMinute = document.getElementById('timer1');
  let timeSecond = document.getElementById('timer2');
  let numSecond = 60;
  let numMinute = 19;
  let timerInterval;

  function formatNumber(number) {
    return number < 10 ? '0' + number : number;
  }

  function updateNumber() {
    if (numSecond === 0) {
      numSecond = 59;
      if (numMinute > 0) {
        numMinute -= 1;
      } else {
        clearInterval(timerInterval);
        alert("Час вийшов!");
        window.location.href = './index.html'; // Перенаправление после завершения времени
        return;
      }
    } else {
      numSecond -= 1;
    }

    timeSecond.textContent = formatNumber(numSecond);
    timeMinute.textContent = formatNumber(numMinute);
  }

  timerInterval = setInterval(updateNumber, 1000);

  // Вопросы и модальное окно результатов
  fetch('questions.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Мережна помилка: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      let variants = [
        document.getElementById('variant-1'),
        document.getElementById('variant-2'),
        document.getElementById('variant-3'),
        document.getElementById('variant-4')
      ];
      let questionChange = document.getElementById("question");
      let numberQuestion = document.getElementById("number-question");
      let correctAnswer = 1;
      let i = 0;
      
      function updateQuestion(selectedOption) {
        if (data.questions[i].answer === data.questions[i].options[selectedOption]) {
          correctAnswer++;
        }
        console.log(`Correct Answers: ${correctAnswer}`);
        i++;
        if (i < data.questions.length) {
          questionChange.textContent = data.questions[i].question;
          variants.forEach((variant, index) => {
            variant.textContent = data.questions[i].options[index];
          });
          numberQuestion.textContent = i + 1;
        } 

        if (i === data.questions.length) {
          showResultModal(correctAnswer);
        }
      }

      function showResultModal(correctAnswers) {
        const modal = document.getElementById("quizResultModal");
        const modalTitle = document.getElementById("quizModalTitle");
        const modalMessage = document.getElementById("quizModalMessage");
        const closeModal = document.getElementById("closeQuizModal");
    
        modalTitle.textContent = "Вітаю з проходженням вікторини!";
    
        let message;
        if (correctAnswers <= 3) {
          message = "Вам потрібно навідатись у Гурівку. Все вже забулось.";
        } else if (correctAnswers <= 6) {
          message = "Ви добре розумієтеся по питаннях з Гурівкою, але є над чим працювати!";
        } else if (correctAnswers <= 9) {
          message = "Ви — справжній знавець такого краю, як Гурівка!";
        } else {
          message = "Вау! Ви перевершили всі очікування!";
        }
    
        modalMessage.innerHTML = `${message}<br><br>Правильних відповідей: ${correctAnswers}`;
    
        modal.classList.remove("hidden");
        modal.style.display = "flex";
    
        closeModal.onclick = function() {
          modal.style.display = "none";
          window.location.href = './index.html';
        }
    
        window.onclick = function(event) {
          if (event.target === modal) {
            modal.style.display = "none";
            window.location.href = './index.html';
          }
        }
      }
    
      variants.forEach((variant, index) => {
        variant.onclick = () => updateQuestion(index);
      });
    });
});
