# Crypto Chart
![home](/readme-resources/home-screenshot.png)

## Demo
[https://crypto-chart-2abm.onrender.com](https://crypto-chart-2abm.onrender.com)

## Summary
Crypto Chart is a full-stack [MERN](https://www.geeksforgeeks.org/mern-stack/) app that lets users view candlestick charts of cryptocurrencies for selected asset pairs and periods.

## About Settings
- Data is retrieved every 8 hours from Cryotowatch
- You can change the exchange and the asset pairs by changing the settings in config/default.json
- Only UTC Time Zone is supported for now

## Why I created this app
1. To show my developing skills

      This app is built using TypeScript for the language, React and Redux for the frontend, Tailwind CSS for styling, and Express with Node.js for the backend. Additionally, I've implemented batch processing using cron jobs. I believe this project effectively demonstrates my skills.

2. Expandable and Practical

      While the app currently offers basic functionality, there is potential to enhance its practicality by incorporating features such as acquiring candlestick data for shorter periods, integrating technical indicators, and more.

## Language and Libraries
- TypeScript
- React
- Redux, Redux Toolkit
- Tailwind CSS
- Express
- Node.js
- MongoDB (mongoose)
- ApexCharts
- cron
- Vite

### React
Data fetching from the backend in React is facilitated using custom hooks, making it explicit when the API is called.

### Redux
The selected asset pair and period are stored in the Redux store. Upon accessing the home screen, configuration and constant data are fetched from the server side and stored in Redux.

### MongoDB
MongoDB is employed to store OHLCV data obtained from the Cryptowatch API and provide it upon server request.

### ApexCharts
ApexCharts is utilized for rendering candlestick and volume charts.

### cron
cron is employed to regularly retrieve OHLCV data from the Cryptowatch API and store it in MongoDB.

### Vite
Vite is the tool used for building the frontend.

## Architecture
![architecture](/readme-resources/architecture.png)

## How to run
### 1. Clone this repository
   
### 2. Install dependencies
```bash
npm install
```

### 3. Set environment variables
```bash
cp .env.example .env
```
```MONGODB_URI``` is the URI of the MongoDB database to be used.

### 4. Set config
If you want to change the exchange and the asset pairs, change the settings in config/default.json.

```json
{
  "cryptowatch": {
    ...
    "exchange": "bitfinex",
    "baseAsset": "usd",
    "quoteAssets": ["btc", "eth"],
    ...
  }
}
```
[/config/default.json](/config/default.json)

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
