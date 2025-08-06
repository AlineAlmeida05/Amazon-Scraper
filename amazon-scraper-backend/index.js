// JavaScript
import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";
import cors from "cors";

const app = express(); // Inicialize o app antes de usar

app.use(cors()); // Agora pode usar o app normalmente


const PORT = 3000;

// Função para extrair dados dos produtos
async function scrapeAmazon(keyword) {
  const url = `https://www.amazon.com.br/s?k=${encodeURIComponent(keyword)}`;
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0", // Amazon bloqueia bots sem user-agent
    },
  });

  const dom = new JSDOM(data);
  const document = dom.window.document;
  const products = [];

  // Seleciona os cards de produtos
  document.querySelectorAll("div.s-result-item[data-asin]").forEach((item) => {
    const title = item.querySelector("h2 span")?.textContent?.trim();
    const rating = item.querySelector("span.a-icon-alt")?.textContent?.split(" ")[0];
    const reviews = item.querySelector("span.a-size-base")?.textContent?.replace(/\D/g, "");
    const image = item.querySelector("img.s-image")?.src;

    if (title && image) {
      products.push({
        title,
        rating: rating || "N/A",
        reviews: reviews || "0",
        image,
      });
    }
  });

  return products;
}

// Endpoint de scraping
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) return res.status(400).json({ error: "Keyword obrigatória" });

  try {
    const products = await scrapeAmazon(keyword);
    res.json(products);
  } catch (err) {
    console.error("Erro no scrapeAmazon:", err); // <-- Adicione esta linha
    res.status(500).json({ error: "Erro ao buscar dados da Amazon" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
