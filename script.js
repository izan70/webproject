
    window.onload = function() {
      const clickButton = document.getElementById('clickButton');

      const clickCountDisplay = document.getElementById('clickCount');

      let count = 0;

      clickButton.addEventListener('click', function() {
        count = count + 1;

        clickCountDisplay.textContent = count;
      });
    };

