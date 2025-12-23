const modal = document.getElementById("bookingModal");

function openModal() { modal.style.display = "flex"; }
function closeModal() { modal.style.display = "none"; }

window.onclick = function(e) {
  if(e.target === modal) closeModal();
};

const form = document.getElementById("bookingForm");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;

  try {
    const res = await fetch("/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, date })
    });

    const data = await res.json();

    if(data.success){
      document.getElementById("result").textContent = "Заявка успешно отправлена!";
      form.reset();
      setTimeout(closeModal, 2000);
    } else {
      document.getElementById("result").textContent = "Ошибка: " + (data.error || "Попробуйте позже");
    }

  } catch(err) {
    document.getElementById("result").textContent = "Ошибка соединения.";
  }
});







