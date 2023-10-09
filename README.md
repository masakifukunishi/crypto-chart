# Crypto Chart
![home-screenshot](https://github.com/masakifukunishi/crypto-chart/assets/42294938/90eeb254-a569-48fc-ab90-15a5ee57791f)

## Demo
[https://crypto-chart-1r7g.onrender.com](https://crypto-chart-1r7g.onrender.com/)

## Summary
Crypto Chart is a full-stack [MERN](https://www.geeksforgeeks.org/mern-stack/) app that lets users view candlestick charts of cryptocurrencies for selected asset pairs and periods.

## About Settings
- You can change the asset pairs and candlestick period by changing the settings in config/default.json
- The default settings are ETH/USD, XRP/USD as currency pairs and candlesticks are daily
- Only UTC Time Zone is supported for now

## Motivation
1. To prove my skills

      Both the client and server sides are written in TypeScript, and the code is checked by ESLint. Each responsibility is properly separated in the code, which makes the code easy to understand and maintain. I believe this project will allow me to prove my skills.

2. Expandable and Practical

      Currently only basic functions are implemented, but I believe that with support for other exchanges and the addition of technical indicators, it will become a practical application.

## Language and Libraries

- Client
    - TypeScript
    - React
    - Redux, Redux Toolkit
    - Tailwind CSS
    - ApexCharts
    - Vite
    - Prettier
    - ESLint

- Server
    - TypeScript
    - Express
    - Node.js
    - MongoDB
    - mongoose
    - ws (WebSocket)
    - Kraken REST API
    - Kraken WebSockets API
    - Prettier
    - ESLint

### React
Components are divided by feature, and data is fetched from the server side with custom hooks.

### Redux
The selected asset pair and period are stored in the Redux store. Upon accessing the home screen, configuration and constant data are fetched from the server side and stored in Redux.

### ApexCharts
ApexCharts is used to render candlestick and volume charts.

### Vite
Vite is the tool used for building the client side.

### MongoDB
MongoDB is used to store OHLCV data obtained from the Kraken API and provide it upon server request.

### ws (WebSocket)
Websocket is used to get OHLCV data from the exchange

## Architecture
![architecture](https://github.com/masakifukunishi/crypto-chart/assets/42294938/eb1d32c1-3dce-488c-897b-3ae2cd53e993)

## How to run
### 1. Clone this repository
   
### 2. Install dependencies
```bash
npm run install-all
```

### 3. Set environment variables
```bash
cp server/.env.example server/.env
```
`MONGODB_URI` is the URI of the MongoDB database to be used.

### 4. Set config
If you want to change the asset pairs or candlestick period, change the settings in server/config/default.json.

```json
{
  "kraken": {
    "apiUrl": "https://api.kraken.com",
    "wsUrl": "wss://ws.kraken.com",
    "baseAsset": {
      "symbol": "ZUSD",
      "altname": "USD"
    },
    "quoteAssets": [
      {
        "symbol": "XETH",
        "altname": "ETH"
      },
      {
        "symbol": "XXRP",
        "altname": "XRP"
      }
    ],
    "dataNum": 365,
    "period": {
      "daily": 1440
    }
  }
}
```
[server/config/default.json](server/config/default.json)

For the list of asset pairs, see the following API documentation.

https://docs.kraken.com/rest/#tag/Market-Data/operation/getTradableAssetPairs

### 5. Run batch processing to register initial ohlcv data
```bash
npm run dev-initialize-data
```

### 6. Run frontend and backend
```bash
npm run dev
```

## How to build
### 1. The same as 1-5 of 'How to run'

### 2. Build frontend and backend
```bash
npm run build
```

### 3. Run the built app
```bash
npm run start
```
