const generateButton = document.getElementById('generateButton');
const quoteResult = document.getElementById('quoteResult');


const apiKey = 'XnMELkyd7Yo8e0uHUOmQ+g==SjGvVLHCtkouAI8X';
const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

generateButton.addEventListener('click',()=>{
    fetch(apiUrl,{
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey
        }
    })
    .then(res=>res.json())
    .then(data=>{
        const result = {
            quote: data[0].quote,
            quoteAuthor: data[0].author
        };
        console.log(result);
        const quoteCard =  
            `<div class = 'card'>
                <h2>${result.quoteAuthor}:<br>${result.quote}</h2>
             </div>`
        ;

        quoteResult.innerHTML = quoteCard;
    })
    .catch(error =>{
        console.error(("Error:", error));
    })
})