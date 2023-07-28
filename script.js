
const input = document.querySelector('input')//returns the first element that matches a CSS selector
const btn = document.querySelector('button')
const dictionary = document.querySelector('.dictionary')

//The fetch() method starts the process of fetching a resource from a server.
// The fetch() method returns a Promise that resolves to a Response object.

async function dictionaryFn(word) {
    const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(resp => resp.json())
    //converting to json format

    console.log(resp)
    return resp[0]
}

// btn.addEventListener('click', fetch_createcard); //only onclicking button

//on clicking button and pressing enter
input.addEventListener('keyup', e=>{
    e.preventDefault();
    if(e.keyCode === 13){
        console.log("enter is pressed");
        btn.click();
    }
});
btn.addEventListener('click', ()=>{
    fetch_createcard();   
});

async function fetch_createcard() {
    const data = await dictionaryFn(input.value) //whatever is the input work on that input value
    console.log(data)

    let partofSpeechArr = []

    for (let i = 0; i < data.meanings.length - 1; i++) {
        partofSpeechArr.push(data.meanings[i].partOfSpeech)
    }

    dictionary.innerHTML = `
    <div class="card"> 
                <div class="property">
                    <font size=6px><b><span>${data?.word}</span></b></font> 
                </div>

                <div class="property">
                    <span>Phonetics:</span> 
                    <span>${data?.phonetic}</span> 
                </div>

                <div class="property">
                    <span>
                    <audio controls src="${data?.phonetics[0]?.audio}"></audio>
                    </span>
                </div>

                <div class="property">
                    <span>Definition:</span> 
                    <span>${data?.meanings[0]?.definitions[0]?.definition}</span>  
                </div>

                <div class="property">
                    <span>Example:</span>
                    <span>${data?.meanings[0]?.definitions[1]?.example}</span> 
                </div>

                <div class="property">
                    <span>Parts of Speech:</span>
                    <span>${partofSpeechArr.map(e => e).join(',')}</span> 
                </div>
            </div>`
}
dictionaryFn() //function call