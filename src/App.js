import React from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin'

function App() {

	const [coins, setCoins] = React.useState([])
	const [search, setSearch] = React.useState([])

	React.useEffect(()=>{
		axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
		.then(res => {
			setCoins(res.data)
		}).catch(error => console.log(error))
	}, [])

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toString().toLowerCase())
  );
  return (
  	<div className="App">
  		<div className="coin__search">
  			<form>
  				<input 
  					value={search}
  					onChange={e => setSearch(e.target.value)}
	  				type="text" 	
	  				placeholder="Search currency" 
	  				className="coin__input" />
  			</form>
  		</div>
  		{filteredCoins?.map(coin => (
  			<Coin 
  			key={coin.id} 
  			name={coin.name} 
  			image={coin.image} 
  			symbol={coin.symbol}
  			volume={coin.total_volume}
  			price={coin.current_price}
  			marketcap={coin.market_cap}
  			priceChange={coin.price_change_percentage_24h}
  			/>
  		))}
  	</div>
  )
}

export default App;
