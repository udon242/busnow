export interface IBusNaviResultSet {
    results: Array<IBusNaviResult>;
}

export interface IBusNaviResult {
    predictionTime: string;
    upToDeparture: string;
}
