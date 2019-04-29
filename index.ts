import { BusNaviDao } from './src/dao/BusNaviDao';
import { BusStop } from './src/enum/BusStopId';

(async () => {
    // 処理開始時間
    console.time('get-busnavi');

    const busNaviDao = new BusNaviDao();
    const resultSet = await busNaviDao.get(BusStop.FUZISAKI_6_CHOME, BusStop.TSUDANUMA_STATION);
    console.info(resultSet);

    // 処理終了時間
    console.timeEnd('get-busnavi');
})();
