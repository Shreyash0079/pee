// Sound effects for gallery images
let soundEnabled = true;

// Create audio elements for different sounds
const clickSound = new Audio(
  "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
);
const popSound = new Audio(
  "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
);
const zoomSound = new Audio(
  "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
);

// Set volume for all sounds
clickSound.volume = 0.3;
popSound.volume = 0.4;
zoomSound.volume = 0.3;

// Function to play sound based on image class
function playImageSound(imageClass) {
  if (!soundEnabled) return;

  switch (imageClass) {
    case "zoom":
      zoomSound.currentTime = 0;
      zoomSound.play().catch((e) => console.log("Sound play failed:", e));
      break;
    case "pop":
      popSound.currentTime = 0;
      popSound.play().catch((e) => console.log("Sound play failed:", e));
      break;
    default:
      clickSound.currentTime = 0;
      clickSound.play().catch((e) => console.log("Sound play failed:", e));
      break;
  }
}

// Add click event listeners to gallery images
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-img");

  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      // Get the animation class (zoom, rotate, fade, slide, pop)
      const classes = this.className.split(" ");
      const animationClass = classes.find((cls) =>
        ["zoom", "rotate", "fade", "slide", "pop"].includes(cls)
      );

      // Play appropriate sound
      playImageSound(animationClass);

      // Add a temporary click effect
      this.style.transform = "scale(0.9) rotate(0deg)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Add sound toggle button to the page
  addSoundToggle();
});

// Function to add sound toggle button
function addSoundToggle() {
  const soundToggle = document.createElement("button");
  soundToggle.id = "sound-toggle";
  soundToggle.innerHTML = soundEnabled ? "🔊" : "🔇";
  soundToggle.title = soundEnabled ? "Disable Sound" : "Enable Sound";
  soundToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: linear-gradient(45deg, #dc2626, #991b1b);
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
        transition: all 0.3s ease;
    `;

  soundToggle.addEventListener("click", function () {
    soundEnabled = !soundEnabled;
    this.innerHTML = soundEnabled ? "🔊" : "🔇";
    this.title = soundEnabled ? "Disable Sound" : "Enable Sound";

    // Add visual feedback
    this.style.transform = "scale(1.1)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 200);
  });

  soundToggle.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.4)";
  });

  soundToggle.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "0 4px 15px rgba(220, 38, 38, 0.3)";
  });

  document.body.appendChild(soundToggle);
}

// Original speak functionality
document.getElementById("speak-btn").addEventListener("click", function () {
  const btn = this;
  const text = document.getElementById("pen-description").textContent;
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1.1;
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
    btn.classList.add("speaking");
    utter.onend = function () {
      btn.classList.remove("speaking");
    };
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
});

// Optional: Animate the button when speaking
const style = document.createElement("style");
style.innerHTML = `
#speak-btn.speaking {
    animation: pulse 0.7s infinite alternate;
}
@keyframes pulse {
    from { box-shadow: 0 0 0 0 #3a3d42; }
    to { box-shadow: 0 0 16px 6px #3a3d4244; }
}`;
document.head.appendChild(style);
