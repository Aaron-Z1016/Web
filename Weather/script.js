const query = document.getElementById('query');
const searchButton = document.getElementById('searchButton');
const weatherResult = document.getElementById('weatherResult');

const apiKey = 'f98fd203189d4284a66144620240712';


console.log(query, searchButton, weatherResult);

searchButton.addEventListener('click', ()=>{
    const cityName = query.value;
    
    if(!cityName){
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        return;
        // 如果用户没有输入城市名，继续执行 fetch 请求就没有意义，
        // 因为请求会发到错误的 URL 或者返回错误的结果。如果不终止，后续的 fetch 请求会被发送，而这可能会浪费时间和资源。
    }
    //动态请求url，每次都不一样
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            if(!data.location){
                // console.log(data);
                console.log(data.error);
                weatherResult.innerHTML = `<p>error:${data.error.message}</p>`;
                return;
            }
            
            const result = {
                name: data.location.name,
                temperature: data.current.temp_c,
                conditionText: data.current.condition.text,
                conditionIcon: `http:${data.current.condition.icon}`
            };

            console.log(result);

            const weatherCard = 
               `<div class = 'card'>
                    <h3>${result.name}</h3>
                    <p>The current temperature of ${result.name} is <strong>${result.temperature}</strong>°C</p>
                    <p>Condition: ${result.conditionText}</p>
                    <img src='${result.conditionIcon}' alt='Weather Icon'>
                </div>`
            ;

            weatherResult.innerHTML = weatherCard;

            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
})

