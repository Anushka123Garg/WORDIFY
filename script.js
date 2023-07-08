
const input = document.querySelector('input')//returns the first element that matches a CSS selector
const btn = document.querySelector('button')
const dictionary = document.querySelector('.dictionary')

//The fetch() method starts the process of fetching a resource from a server.
// The fetch() method returns a Promise that resolves to a Response object.

async function dictionaryFn(word) {
    const resp = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(resp => resp.json())
    //in json format

    // console.log(resp)
    return resp[0]
}

btn.addEventListener('click', fetch_createcard) //on clicking button

async function fetch_createcard() {
    const data = await dictionaryFn(input.value) //whatever is the input work on that input value
    console.log(data)

    let partofSpeech = []

    for (let i = 0; i < data.meanings.length - 1; i++) {
        partofSpeech.push(data.meanings[i].partOfSpeech)
    }

    dictionary.innerHTML = `
    <div class="card"> 
                <div class="property">
                    <font size=6px><b><span>${data.word}</span></b></font>
                </div>

                <div class="property">
                    <span>Phonetics:</span> 
                    <span>${data.phonetics}</span> 
                </div>

                <div class="property">
                    <span>
                    <audio controls src="${data.phonetics[0].audio}"></audio>
                    </span>
                </div>

                <div class="property">
                    <span>Definition:</span> 
                    <span>${data.meanings[0].definitions[0].definition}</span>  
                </div>

                <div class="property">
                    <span>Example:</span>
                    <span>${data.meanings[0].definitions[0].example}</span> 
                </div>

                <div class="property">
                    <span>${partofSpeech.map(e => e)}</span> 
                </div>
            </div>`
}

dictionaryFn('chair') //function call