
const PASSWORD_BENAR = "1629";

const screens = document.querySelectorAll(".screen");
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordMessage = document.getElementById("password-message");
const passwordCard = document.querySelector(".glass-card");

const togglePassword = document.getElementById("toggle-password");
const music = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");
const musicStatus = document.getElementById("music-status");

// GANTI HALAMAN
function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// CEK PASSWORD
passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const entered = passwordInput.value.trim();

  if (entered === PASSWORD_BENAR) {
    passwordMessage.textContent = "";
    passwordInput.blur();

    showScreen("loading-screen");

    window.setTimeout(() => {
      showScreen("home-screen");
    }, 2300);
  } else {
    passwordMessage.textContent =
      "Ups, belum tepat, Sayang. Coba ingat-ingat lagi yaa ♡";

    // Mengulang animasi shake setiap password salah
    passwordCard.classList.remove("shake");
    void passwordCard.offsetWidth;
    passwordCard.classList.add("shake");

    passwordInput.value = "";
    passwordInput.focus();

    // Getaran ringan jika didukung perangkat
    if (navigator.vibrate) {
      navigator.vibrate([70, 35, 70]);
    }
  }
});

// TAMPILKAN / SEMBUNYIKAN PASSWORD
togglePassword.addEventListener("click", () => {
  const showing = passwordInput.type === "text";

  passwordInput.type = showing ? "password" : "text";

  togglePassword.setAttribute(
    "aria-label",
    showing ? "Tampilkan password" : "Sembunyikan password"
  );

  togglePassword.textContent = showing ? "♡" : "♥";
});

// NAVIGASI ANTARHALAMAN
document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.go);
  });
});

// MUSIK PLAY / PAUSE
async function toggleMusic() {
  if (music.paused) {
    try {
      await music.play();

      musicToggle.textContent = "Ⅱ";
      musicToggle.setAttribute("aria-label", "Jeda musik");
      musicStatus.textContent = "Sedang diputar ♫";
    } catch (error) {
      musicStatus.textContent =
        "Tambahkan file assets/lagu.mp3 terlebih dahulu";
      musicToggle.textContent = "▶";
    }
  } else {
    music.pause();

    musicToggle.textContent = "▶";
    musicToggle.setAttribute("aria-label", "Putar musik");
    musicStatus.textContent = "Musik dijeda";
  }
}

musicToggle.addEventListener("click", toggleMusic);

// PELUK VIRTUAL
document.getElementById("finish-button").addEventListener("click", () => {
  const message = document.getElementById("finish-message");
  const button = document.getElementById("finish-button");

  message.textContent =
    "Peluk virtual terkirim! 🤗💗 Wisnuchuun sayang Sayang banyak-banyak.";

  button.textContent = "Peluk lagi? ♡";

  button.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.04)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 450,
      easing: "ease-out"
    }
  );
});

// HATI MENGAMBANG
const heartLayer = document.querySelector(".ambient-hearts");
const heartSymbols = ["♡", "♥", "୨୧"];

function createFloatingHeart() {
  if (!heartLayer || document.hidden) return;

  const heart = document.createElement("span");

  heart.className = "ambient-heart";
  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = `${Math.random() * 96}%`;
  heart.style.fontSize = `${12 + Math.random() * 14}px`;

  const duration = 7 + Math.random() * 6;
  heart.style.animationDuration = `${duration}s`;

  heartLayer.appendChild(heart);

  window.setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Hanya beberapa hati di awal agar tetap ringan di handphone
for (let i = 0; i < 5; i++) {
  window.setTimeout(createFloatingHeart, i * 500);
}

window.setInterval(createFloatingHeart, 1800);
