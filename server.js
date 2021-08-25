const express = require("express");
const server = express();
const puppeteer = require("puppeteer");

const port = 3000;

server.get("/", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.alura.com.br/formacao-react");
  const pageContent = await page.evaluate(() => {
    return {
      title: document.querySelector(".formacao-headline-titulo").innerText,
      subtitle: document.querySelector(".formacao-headline-subtitulo")
        .innerHTML,
    };
  });

  console.log("Conteúdo achado pelo bot scraper:", pageContent);

  await browser.close();

  res.send({
    title: pageContent.title,
    subtitle: pageContent.subtitle,
  });
});

server.listen(port, () => {
  console.log(`Acesse o JSON em: http://localhost:${port}`);
});
