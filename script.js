let votes = JSON.parse(localStorage.getItem("votes")) || {
    "Narendra Damodardas Modi": 0,
    "Rahul Gandhi": 0,
    "HD Deve Gowda": 0,
  };
  let finalized = JSON.parse(localStorage.getItem("finalized")) || false;
  
  function showVotePage() {
    document.getElementById("vote-page").classList.remove("hidden");
    document.getElementById("results-page").classList.add("hidden");
  }
  
  function showResultsPage() {
    document.getElementById("vote-page").classList.add("hidden");
    document.getElementById("results-page").classList.remove("hidden");
    updateResults();
  }
  
  function castVote(candidate) {
    if (finalized) {
      alert("The results have been finalized. Voting is closed.");
      return;
    }
    votes[candidate]++;
    localStorage.setItem("votes", JSON.stringify(votes));
    alert(`You voted for ${candidate}!`);
  }
  
  function updateResults() {
    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = ""; // Clear the results table
  
    Object.keys(votes).forEach((candidate) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${candidate}</td><td>${votes[candidate]}</td>`;
      resultsList.appendChild(row);
    });
  
    if (finalized) {
      displayWinner();
    }
  }
  
  function finalizeResults() {
    if (finalized) {
      alert("The results are already finalized.");
      return;
    }
  
    finalized = true;
    localStorage.setItem("finalized", JSON.stringify(finalized));
    updateResults();
  }
  
  function displayWinner() {
    const winner = Object.keys(votes).reduce((a, b) => (votes[a] > votes[b] ? a : b));
    document.getElementById("winner").innerText = `The winner is ${winner} with ${votes[winner]} votes!`;
    document.getElementById("finalize-btn").style.display = "none";
    document.getElementById("reset-btn").style.display = "inline-block";
  }
  
  function resetElection() {
    votes = {
      "Narendra Damodardas Modi": 0,
      "Rahul Gandhi": 0,
      "HD Deve Gowda": 0,
    };
    finalized = false;
    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("finalized", JSON.stringify(finalized));
  
    document.getElementById("winner").innerText = "";
    document.getElementById("finalize-btn").style.display = "inline-block";
    document.getElementById("reset-btn").style.display = "none";
    showVotePage(); // Redirect to the vote page
  }
  
  // Initialize the app by showing the correct tab
  if (finalized) {
    showResultsPage();
  } else {
    showVotePage();
  }
  