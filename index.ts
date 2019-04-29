import { BusNaviDao } from './src/dao/BusNaviDao';

(async () => {
    // 処理開始時間
    console.time('get-busnavi');

    const busNaviDao = new BusNaviDao();
    const resultSet = await busNaviDao.get();
    console.info(resultSet);

    // 処理終了時間
    console.timeEnd('get-busnavi');
})();
