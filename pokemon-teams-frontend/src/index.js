const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainContainer = document.querySelector('main')
// render all trainers, put each trainer on each card
function getTrainers(){
    fetch(TRAINERS_URL)
    .then(res=>res.json())
    .then(trainers=>{trainers.forEach(trainer=>{
      let cardContainer = document.createElement('div')
      cardContainer.setAttribute('class', 'card')
      cardContainer.dataset.id = trainer.id
      cardContainer.innerHTML = renderCard(trainer)
      mainContainer.appendChild(cardContainer)
      cardContainer.addEventListener('click', handleButton)

    })
  })
}
getTrainers()
function renderCard(trainer){
  return`<p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id}>Add Pokemon</button>
    <ul>
    ${trainer.pokemons.map(pokemon=>{return `<li>${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`}).join('')}
    </ul>`
}

function handleButton(e){
  // console.log(e.target.tagName) tagName is uppercase
  //In HTML, the returned value of the tagName property is always in UPPERCASE.
    if(e.target.tagName === 'BUTTON'){
      // console.log(e.target.innerText)
       if(e.target.innerText === 'Add Pokemon'){
      // console.log(e.target.dataset.trainerId)
        let trainerId = e.target.dataset.trainerId
             createPokemon(trainerId)

       }else if(e.target.innerText === 'Release'){
        // console.log(e.target.dataset.pokemonId)
        let pokemonId = e.target.dataset.pokemonId
        // console.log(e.target.parentElement)
        let list = e.target.parentElement
        list.remove()
        releasePokemon(pokemonId)
       }
    }
}

function createPokemon(trainerId){
      fetch(POKEMONS_URL, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                  trainer_id: trainerId
                })
        })
        .then(res=>res.json())
        // .then(console.log)
        .then(pokemon=>{
          // debugger
          if(!pokemon.error){
            let cardContainer = document.querySelector(`div[data-id='${pokemon["trainer_id"]}']`)
            // console.log(cardContainer)
            let ul = cardContainer.querySelector('ul')
            return ul.innerHTML +=
            `<li>${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
          }else{
          alert('Please release one pokemon')
          }
        })
}

function releasePokemon(pokemonId){
    fetch(POKEMONS_URL+`/${pokemonId}`,{
      method:'DELETE',
    })
}
// const mainContainer = document.querySelector('main')
// function refresh(){
//     fetch(TRAINERS_URL)
//     .then(res=>res.json())
//     .then(trainers=>{
//       trainers.forEach(trainer=>{
//         renderTrainer(trainer)
//       })
//     })
// }
//
// function renderTrainer(trainer){
//   console.log(trainer['pokemons'])
//   mainContainer.innerHTML +=
//   `<div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
//     <button class='add' data-trainer-id=${trainer.id}>Add Pokemon</button>
//     <ul>
//         ${renderPokemon(trainer['pokemons']).join('')}
//     </ul>
//   </div>
//   `
// }
//
// function renderPokemon(pokemons){
//   return pokemons.map(pokemon=>{
//      return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
//     // ul.appendChild(list)
//   })
// }
// //add Pokemon or release pokemon
// mainContainer.addEventListener('click', e=>{
//   // console.log(e.target.dataset)
//   const ul = e.target.nextElementSibling
//   const listArray = document.getElementsByTagName('li').length
//   console.log(listArray)
// let trainerId = e.target.dataset.trainerId
//    if(e.target.className == 'add'){
//         fetch(POKEMONS_URL,  {
//           method: 'POST',
//           headers:{
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//                 trainer_id: trainerId
//               })
//         })
//         .then(res=>res.json())
//         .then(pokemon=>{
//           // debugger
//             if(pokemon.error){
//               alert('Please release one pokemon')
//
//            }else{
//              ul.innerHTML +=`<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.trainer_id}>Release</button></li>`
//            }
//         })
//
//     }
// })
//
// mainContainer.addEventListener('click', e=>{
//   // let trainerId = e.target.dataset.trainerId
//   console.log(e.target.parentElement)
//   const list = e.target.parentElement
//    if(e.target.className == 'release'){
//      console.log(e.target.dataset.pokemonId)
//      let pokemonId = e.target.dataset.pokemonId
//
//      fetch(POKEMONS_URL+`/${pokemonId}`, {
//        method: 'DELETE'
//        })
//        .then(res=>res.json())
//        .then(pokemon=>{list.remove()})
//    }
//
// })
// refresh()
