const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function temperatureFinder() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const miamiTempurature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = miamiTempurature
}

temperatureFinder()

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true)
    clone.querySelector("h3").textContent = pet.name
    wrapper.appendChild(clone)
  })
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()