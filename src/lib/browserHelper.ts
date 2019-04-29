import * as puppeteer from 'puppeteer';

export const getBrowser = async(): Promise<puppeteer.Browser> => {
    return await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',  // Cloud Functionsで動かす場合には'--no-sandbox'が必須
            "--proxy-server='direct://'",
            "--proxy-bypass-list=*",
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-setuid-sandbox',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
        ]
    });
};

export const getNewPage = async(url: string, browser: puppeteer.Browser): Promise<puppeteer.Page> => {
    const page: puppeteer.Page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle2', // 画像, JSの読み込み後まで待つ
    });
    return page;
};

export const getRowData = async(page: puppeteer.Page, evaluateFn: puppeteer.EvaluateFn) => {
    return await page.evaluate(evaluateFn);
};
