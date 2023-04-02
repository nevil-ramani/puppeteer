const puppeteer = require('puppeteer');


require('dotenv').config()

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(process.env.URL);

  const data = await page.evaluate(() => {
    const tableRows = document.querySelectorAll('#curr_table tbody tr');
    const data = [];

    for (let row of tableRows) {
      const date = row.querySelector('td:nth-child(1)').innerText;
      const price = row.querySelector('td:nth-child(2)').innerText;
      data.push({ date, price });
    }

    return data;
  });

  console.log(data);

  await browser.close();
})();
