import * as puppeteer from 'puppeteer';
import { IBusNaviResult, IBusNaviResultSet } from '../interface/IBusNaviResult';
import { getBrowser, getNewPage, getRowData } from '../lib/browserHelper'
import { cleanString } from '../lib/StringHelper'
import { BusStop } from '../enum/BusStopId';

export class BusNaviDao {
    async get(startBusStop: BusStop, goalBusStop: BusStop): Promise<IBusNaviResultSet> {
        const url = `https://transfer.navitime.biz/keiseibus/pc/location/BusLocationResult?startId=${startBusStop}&goalId=${goalBusStop}&sort=predictionDep`;

        const browser: puppeteer.Browser = await getBrowser();
        const page: puppeteer.Page = await getNewPage(url, browser);

        // HTMLからデータを抜き出す
        const evaluateFn = () => {
            const rowDataList: Array<{predictionTime: string, remainingMinutes: string}> = [];
            document.querySelectorAll('.locationSummary').forEach(node => {
                const predictionTimeElement = node.getElementsByClassName('predictionTime')[0];
                const predictionTime = predictionTimeElement ? predictionTimeElement.innerHTML : '';

                const orvPaneElements = node.querySelectorAll('div.orvPane div');
                const remainingMinutesElement = orvPaneElements[3];
                const remainingMinutes = remainingMinutesElement ? remainingMinutesElement.innerHTML : '';

                rowDataList.push({predictionTime, remainingMinutes});
            });
            return rowDataList;
        };
        const rowDataList = await getRowData(page, evaluateFn);

        // ブラウザを閉じる
        await browser.close();

        // データの整形
        const results: Array<IBusNaviResult> = rowDataList.map((rowData: any): IBusNaviResult => {
            return {
                predictionTime: cleanString(rowData.predictionTime),
                upToDeparture: cleanString(rowData.remainingMinutes),
            }
        });

        return { results }
    }
}
