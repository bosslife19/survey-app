// Function to handle moving to the next level
function nextLevels(level) {
  const current = document.getElementById('level' + level);
  const inputs = current.querySelectorAll('input[type="radio"]');
  const total = new Set();
  const answered = new Set();

  inputs.forEach(input => {
    total.add(input.name);
    if (input.checked) answered.add(input.name);
  });

  if (total.size !== answered.size) {
    alert("Please answer all questions before continuing.");
    return;
  }

  current.classList.remove('active');
  const next = document.getElementById('level' + (level + 1));
  if (next) {
    next.classList.add('active');
    updateProgress(level + 1);
  } else {
    updateProgress(4);
    alert("Assessment complete!");
  }
}
function nextLevel(level) {
  const questions = document.querySelectorAll('.question');
  const data = {
      level: level,
      responses: []
  };

  questions.forEach((questionDiv) => {
      const label = questionDiv.querySelector('label').innerText.trim(); // Get the question text
      const selectedInput = questionDiv.querySelector('input[type="radio"]:checked');
      
      data.responses.push({
          question: label,
          answer: selectedInput ? selectedInput.value : null
      });
  });

  fetch('/store', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
  })
  .then(result => {
      console.log('Success:', result);
      // Optional: redirect, show success message, etc.
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

// Function to update the progress bar
function updateProgress(level) {
  const percent = Math.round((level / 4) * 100);
  const bar = document.getElementById("progress");
  bar.style.width = percent + "%";
  bar.innerText = percent + "%";
}

// Function to submit the assessment
async function submitAssessment(level) {
  const current = document.getElementById('level' + level);
  const inputs = current.querySelectorAll('input[type="radio"]');
  const responses = {};

  inputs.forEach(input => {
    if (input.checked) {
      responses[input.name] = input.value;
    }
  });

  try {
    console.log(responses)
    const response = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, responses }),
    });

    if (response.ok) {
      alert('Assessment submitted successfully!');
    } else {
      alert('Failed to submit assessment.');
    }
  } catch (error) {
    console.error('Error submitting assessment:', error);
    alert('Error submitting assessment.');
  }
}
