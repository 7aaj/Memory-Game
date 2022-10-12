// Effect Duration
let duration = 1000;

// Select Blocks Container
const blocksContainer = document.querySelector(".game");

// Create Array From Game Blocks
const blocksArray = Array.from(blocksContainer.children);

// Add Order Css Property To Game Blocks
blocksArray.forEach((block) => {
  // Add CSS Order Property
  block.style.order = Math.floor(Math.random() * blocksArray.length);
  block.onclick = () => {
    flipBlock(block);
  };
});

// Select The Start Game Button
document.querySelector(".start-game span").onclick = function () {
  // Prompt Window To Ask For Name
  let yourName = prompt("Whats Your Name");

  // If Name Is Empty
  if (yourName == null || yourName == "") {
    // Set Name To Unknown
    document.querySelector(".info .name span").innerHTML = "guest";

    // Name Is Not Empty
  } else {
    // Set Name To Your Name
    document.querySelector(".info .name span").innerHTML = yourName;
  }

  // Remove Splash Screen
  document.querySelector(".start-game").remove();
  // show all blocks for 5 seconds on the start
  blocksArray.forEach((block) => {
    block.classList.add("flipped");
    setTimeout(() => {
      block.classList.remove("flipped");
    }, duration * 5);
  });
};

// flip block function
function flipBlock(selectedBlock) {
  // Add Class is-flipped
  selectedBlock.classList.add("flipped");

  // Collect All Flipped Cards
  let allFlippedBlocks = blocksArray.filter((flippedBlock) => flippedBlock.classList.contains("flipped"));

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // Stop Clicking
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  // Add Class No Clicking on Main Container
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block function
function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("flipped");
    secondBlock.classList.remove("flipped");

    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
    // ceeb play
    ceeb.play();
  } else {
    // fail play
    fail.play();
    document.querySelector(".tries span").innerHTML++;
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);
  }
  const winning = blocksArray.filter((win) => win.classList.contains("matched"));
  if (winning.length === blocksArray.length) {
    setTimeout(() => {
      blocksContainer.remove();
      win.play();
      document.querySelector(".winnig").style.display = "block";
    }, duration * 2);
  }
}
