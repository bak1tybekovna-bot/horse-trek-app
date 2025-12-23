const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

const BOT_TOKEN = "8526774323:AAGFNA4wa_Dqu1drZbmflOEVRcFm9rO_hj8";
const CHAT_ID = "1276496852";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/booking", async (req, res) => {
  const { name, phone, email, date } = req.body;

  const message =
`Новая бронь!  
Имя: ${name}  
Телефон: ${phone}  
Email: ${email}  
Дата: ${date}`;

  try {
    const tgResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }
    );

    const data = await tgResponse.json();

    if (data.ok) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false, error: data });
    }

  } catch (err) {
    console.error("Ошибка отправки Telegram:", err);
    return res.json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});



