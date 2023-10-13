import { getOhlcv, watchOhlcv } from "../controllers/ohlcvController.js";
import { WebSocket } from "ws";

interface FormattedChartData {
  ohlc: { x: number; y: number[] }[];
  volume: { x: number; y: number }[];
}

export const ohlcvWebSocketConnection = (socket: WebSocket) => {
  socket.on("message", async (message: string) => {
    const { period, currencyPair } = JSON.parse(message);
    const ohlcv = await getOhlcv(period, currencyPair);
    socket.send(JSON.stringify(ohlcv));
    watchOhlcv(period, currencyPair, ohlcv, (ohlcv: FormattedChartData) => {
      socket.send(JSON.stringify(ohlcv));
    });
  });
};
