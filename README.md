# Crypto Chart
![home-screenshot](https://github.com/masakifukunishi/crypto-chart/assets/42294938/ab5fb783-fff8-48fd-a4fd-a5257421486d)

## Demo
[https://crypto-chart-1r7g.onrender.com](https://crypto-chart-1r7g.onrender.com/)

## Summary
Crypto Chart is a full-stack [MERN](https://www.geeksforgeeks.org/mern-stack/) app that lets users view candlestick charts of cryptocurrencies for selected asset pairs and periods.

## About Settings
- Data is retrieved every 6 hours from Kraken REST API and stored in MongoDB
- You can change the asset pairs by changing the settings in config/default.json
- Only UTC Time Zone is supported for now

## Motivation
1. Demonstrating my development skills

      This app is built using TypeScript for the language, React and Redux for the frontend, Tailwind CSS for styling, and Express with Node.js for the backend. Additionally, I've implemented batch processing using node-cron. I believe this project effectively demonstrates my skills.

2. Expandable and Practical

      While the app currently offers basic functionality, there is potential to enhance its practicality by incorporating features such as acquiring candlestick data for shorter periods, integrating technical indicators, and more.

## Language and Libraries

- Client
    - TypeScript
    - React
    - Redux, Redux Toolkit
    - Tailwind CSS
    - ApexCharts
    - Vite

- Server
    - TypeScript
    - Express
    - Node.js
    - MongoDB (mongoose)
    - node-cron

### React
Data fetching from the backend in React is facilitated using custom hooks, making it explicit when the API is called.

### Redux
The selected asset pair and period are stored in the Redux store. Upon accessing the home screen, configuration and constant data are fetched from the server side and stored in Redux.

### ApexCharts
ApexCharts is utilized for rendering candlestick and volume charts.

### Vite
Vite is the tool used for building the frontend.

### MongoDB
MongoDB is employed to store OHLCV data obtained from the Kraken API and provide it upon server request.

### node-cron
node-cron is employed to regularly retrieve OHLCV data from the Kraken API and store it in MongoDB.

## Architecture
![architecture](https://github.com/masakifukunishi/crypto-chart/assets/42294938/dd8d3c97-c1e0-4d06-b038-c6a14fffe872)

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
If you want to change the asset pairs, change the settings in server/config/default.json.

```json
{
  "kraken": {
    ...
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
    ...
  }
}
```
[server/config/default.json](server/config/default.json)

For the list of asset pairs, see the following link.

https://docs.kraken.com/rest/#tag/Market-Data/operation/getTradableAssetPairs

### 5. Run batch processing to register initial ohlcv data
```bash
npm run dev-batch-init
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
