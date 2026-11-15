
// AETHRIX STUDIOS
// Main website interactions

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

// Close menu after selecting a link
document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    });

});

// Automatic copyright year
document.getElementById("year").textContent =
    new Date().getFullYear();

console.log("AETHRIX STUDIOS initialized successfully.");
const AI_URL =
"https://aethrix-ai.chaudhryprashu07.workers.dev/chat";

const toggle = document.getElementById("ai-toggle");
const windowAI = document.getElementById("ai-window");
const closeAI = document.getElementById("ai-close");
const input = document.getElementById("ai-input");
const send = document.getElementById("ai-send");
const messages = document.getElementById("ai-messages");

toggle.onclick = () => {
    windowAI.classList.toggle("hidden");
};

closeAI.onclick = () => {
    windowAI.classList.add("hidden");
};

function addMessage(text, type) {
    const div = document.createElement("div");
    div.className = type + "-message";
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

async function sendMessage() {
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    const loading = document.createElement("div");
    loading.className = "bot-message";
    loading.textContent = "AETHRIX AI is thinking...";
    messages.appendChild(loading);

    send.disabled = true;

    try {
        const response = await fetch(AI_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Request failed");
        }

        const reply =
            data.response ||
            data.reply ||
            data.message ||
            data.result;

        loading.textContent =
            typeof reply === "string"
                ? reply
                : JSON.stringify(data);

    } catch (error) {
        loading.textContent =
            "Connection error. Please try again.";
        console.error(error);
    } finally {
        send.disabled = false;
    }
}

send.onclick = sendMessage;

input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        sendMessage();
    }
});