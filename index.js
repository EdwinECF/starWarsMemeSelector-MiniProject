import { memeData } from '/data.js'

const characterRadios = document.getElementById('character-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

characterRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderMeme)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderMeme(){
    const memeObject = getSingleCatObject()
    memeModalInner.innerHTML =  `
        <img 
        class="starwars-img" 
        src="./images/${memeObject.image}"
        alt="${memeObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

function getSingleCatObject(){
    const memesArray = getMatchingMemesArray()
    
    if(memesArray.length === 1){
        return memesArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        return memesArray[randomNumber]
    }
}

function getMatchingMemesArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedCharacter = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
        
        const matchingMemesArray = memeData.filter(function(meme){
            
            if(isGif){
                return meme.characterTag.includes(selectedCharacter) && meme.isGif
            }
            else{
                return meme.characterTag.includes(selectedCharacter)
            }            
        })
        return matchingMemesArray 
    }  
}

function getMemeArray(memes){
    const memesArray = []    
    for (let meme of memes){
        for (let character of meme.characterTag){
            if (!memesArray.includes(character)){
                memesArray.push(character)
            }
        }
    }
    return memesArray
}

function renderCharacterRadios(memes){
        
    let radioItems = ``
    const characters = getMemeArray(memes)
    for (let character of characters){
        radioItems += `
        <div class="radio">
            <label for="${character}">${character}</label>
            <input
            type="radio"
            id="${character}"
            value="${character}"
            name="character"
            >
        </div>`
    }
    characterRadios.innerHTML = radioItems
}

renderCharacterRadios(memeData)




