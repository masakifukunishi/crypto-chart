import { getOhlcv, watchOhlcv } from "../controllers/ohlcvController.js";

export const ohlcvWebSocketConnection = (socket: any) => {
  socket.on("message", async (message: any) => {
    const { period, currencyPair } = JSON.parse(message);
    const ohlcv = await getOhlcv(period, currencyPair);
    socket.send(JSON.stringify(ohlcv));
    watchOhlcv(period, currencyPair, (ohlcv: any) => {
      socket.send(JSON.stringify(ohlcv));
    });
  });
};
