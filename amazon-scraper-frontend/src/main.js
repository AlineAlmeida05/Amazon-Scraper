// JavaScript
const btn = document.getElementById("scrapeBtn");
const results = document.getElementById("results");

btn.onclick = async () => {
  const keyword = document.getElementById("keyword").value.trim();
  if (!keyword) {
    results.innerHTML = "<p>Digite uma palavra-chave.</p>";
    return;
  }
  results.innerHTML = "<p>Buscando...</p>";
  try {
    const res = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    if (data.length === 0) {
      results.innerHTML = "<p>Nenhum produto encontrado.</p>";
      return;
    }
    results.innerHTML = data.map(prod =>
      `<div class="product">
        <img src="${prod.image}" alt="Imagem do produto" />
        <div>
          <strong>${prod.title}</strong><br>
          ⭐ ${prod.rating} | ${prod.reviews} avaliações
        </div>
      </div>`
    ).join("");
  } catch (e) {
    results.innerHTML = `<p>Erro: ${e.message}</p>`;
  }
};

