import React, { useState } from 'react';

const api = {
  key: "13edf749bc3440b882c161233221506",
  base: "https://api.weatherapi.com/v1"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}/current.json?key=${api.key}&q=${query}`)
      .then(res => res.json())
      .then(result => {
          setQuery('');
          setWeather(result)
          console.log(result);
        });
    }
  }

  function dateBuilder () {
    let date = String(new window.Date())
    return date = date.slice(3,15)
  }

  return (
    <div className={(typeof weather.current != "undefined") ? ((weather.current.is_day === 1) ? 'day': 'night') : 'night'}>
      <main>
        <div className="container p-2 w-100 mb-5">
          <input
            type="text"
            className="bg-opacity-75 bg-white border-0 d-block p-3 rounded-3 w-100"
            placeholder="Busque pela sua cidade..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.current != "undefined") ? (
          <div>
            <div className="container">
              <div className="location">
                <h1 className="text-center text-white">{weather.location.name},  {weather.location.region}</h1></div>
              <div className="text-center text-white">{dateBuilder()}</div>
            </div>
            <div className="align-items-center bg-opacity-25 bg-white container d-flex flex-column mt-5 p-1 rounded-3">
            <img className="w-25" src={weather.current.condition.icon} alt="icon"></img>
              <div className="temp">
                <span className="align-items-center d-flex flex-column h5 text-white">
                  A temperatura atual é de <p>{weather.current.temp_c}°c,</p>
                  com sensação de <p> {weather.current.feelslike_c}°c</p>
                </span>
                </div>
              <div className="text-white">
                <p>O tempo está {weather.current.condition.text}.</p>
                </div>
            </div>
          </div>

        ) : ('')}
        
      </main>
    </div>
  );
};

export default App;
