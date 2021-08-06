let store = {
    user: { name: "Student" },
    apod: '',
    rovers: ['Curiosity', 'Opportunity', 'Spirit'],
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

const roverInfo = async (rover)=>{
    const res = await fetch('/nasarover',{
        headers: {
            'Rover': rover
        }
    }).then(res=> res.json())
    console.log(res)
    return res
}
// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// create content
const App = (state) => {

    let { rovers, apod } = state

    return `
        <header></header>
        <main>
        <div class="tab">
        <button class="tablinks" onclick="openCity(event, 'London')">${rovers[0]}</button>
        <button class="tablinks" onclick="openCity(event, 'Paris')">${rovers[1]}</button>
        <button class="tablinks" onclick="openCity(event, 'Tokyo')">${rovers[2]}</button>
        </div>
            ${rovers.map(rover=>{
                return selectRover(rover)
        })}
        </main>
        <footer></footer>
    `
}

const selectRover = async (rover)=>{
    let roverData = await roverInfo(rover)
            return `
            <div id="${rover}" class="tabcontent">
            <h6><b>Rover name:</b> ${roverData.photo_manifest.name}</h6>
            <h6><b>Launch date:</b> ${roverData.photo_manifest.launch_date}</h6>
            <h6><b>Landing date:</b> ${roverData.photo_manifest.landing_date}</h6>
            <h6><b>Status:</b> ${roverData.photo_manifest.status}</h6>
            <h6><b>Most recently available photos:</b>${roverData.photo_manifest.max_sol}</h6>
            <h6><b>Date the most recent photos were taken:</b>${roverData.photo_manifest.max_date}</h6>
            
        </div>
        `
    }

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// // High-order function- process rover received from serve
// function processRoverGallery(responseData) {
// 	let rover = responseData;
// 	const toShow =  rover.data.photos.slice(0, 50);
// 		const wrapper = document.getElementById('image-gallery');
// 		wrapper.innerHTML = ``;
// 		toShow.map((item) => {
// 				let img = document.createElement('img');
// 				img.src = item.img_src;
// 				wrapper.appendChild(img);
// 		})
// }
