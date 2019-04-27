import * as puppeteer from 'puppeteer';

const URL = 'https://transfer.navitime.biz/keiseibus/pc/location/BusLocationResult?startId=00180459&goalId=00180454&sort=predictionDep';

(async () => {
    // 処理開始時間
    console.time('get-busnavi');

    const browser = await puppeteer.launch({
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
    const page = await browser.newPage();
    await page.goto(`${URL}/users/sign_in`, {
        waitUntil: 'networkidle2', // 画像, JSの読み込み後まで待つ
    });

    // スクリーンショットを保存
    await page.screenshot({path: 'screenshot/1-page-ss.png'})

    await browser.close();

    // 処理終了時間
    console.timeEnd('get-busnavi');
})();
