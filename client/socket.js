const socket = io("ws://localhost:3500");

const msgInput = document.querySelector(".msg-input");
const activityMsg = document.querySelector(".activity");

const handleSubmit = (e) => {
  e.preventDefault();
  if (msgInput.value !== "") {
    socket.emit("message", msgInput.value);
    msgInput.value = "";
    activityMsg.textContent = "";
  }
  msgInput.focus();
};

document.querySelector(".msg-form").addEventListener("submit", handleSubmit);

socket.addEventListener("message", (data) => {
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector(".messages").append(li);
});

msgInput.addEventListener("keypress", () => {
  socket.emit("activity", socket.id.substring(0, 6));
});

let activityTimeout;

socket.on("activity", (name) => {
  activityMsg.textContent = `${name} is typing...`;
  clearTimeout(activityTimeout);
  activityTimeout = setTimeout(() => {
    activityMsg.textContent = "";
  }, 3000);
});
