import React from 'react'
import ReactDOM from 'react-dom'
import FarmSearch from './FarmSearch';

const appContainer = document.querySelector('#app');

function App() {
  return (
	<FarmSearch />
  );
}

ReactDOM.render(<App />, document.getElementById('app'));