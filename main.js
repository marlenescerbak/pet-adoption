const template = document.querySelector("#pet-card-template")
const wrapper = document.createDocumentFragment()

async function temperatureFinder() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
  const weatherData = await weatherPromise.json()
  const miamiTempurature = weatherData.properties.periods[0].temperature
  document.querySelector("#temperature-output").textContent = miamiTempurature
}

temperatureFinder()

function createAgeText(birthYear) {
  const currYear = new Date().getFullYear()
  const age = currYear - birthYear
  if (age == 0) {
    return "Less than a year old"
  }
  return age + " year" + (age > 1 ? "s" : "") + " old"
}

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petsData = await petsPromise.json()
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-description").textContent = pet.description
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)
    if (!pet.photo) pet.photo = "images/fallback.jpg"
    clone.querySelector(".pet-card-photo img").src = pet.photo
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`
    wrapper.appendChild(clone)
  })
  document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea()

//pet filter button
const petButtons = document.querySelectorAll(".pet-filter button")

petButtons.forEach(el => el.addEventListener("click", handleButtonClick))

function handleButtonClick(e) {
  //remove active class from all buttons
  petButtons.forEach(el => el.classList.remove("active"))

  //add active class to selected button
  e.target.classList.add("active")

  //filter pets below by species
}