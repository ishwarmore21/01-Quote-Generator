//Get DOM Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Javascript Logic
let apiQuotes = [];

//Loading 
const loading = ()=>{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Loading complete
const loadingComplete = ()=>{
    loader.hidden = true;
    quoteContainer.hidden = false;
}

const newQuote = async ()=>{
    // loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //If length of quote is too long change fontsize
    quote.text.length > 120  ? quoteText.classList.add('long-quote')
    :quoteText.classList.remove('long-quote');

    loadingComplete();
    quoteText.textContent = quote.text;

    quote.author ? authorText.textContent = quote.author : authorText.textContent = "Unknown";
    
}

const getQuotes = async ()=>{
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log(error);
    }
}

const tweetQuote = async ()=>{
    const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} 
    - ${authorText.textContent}` ;
    window.open(tweeterUrl,'_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
