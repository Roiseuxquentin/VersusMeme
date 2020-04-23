// */=============================================\* 
//  ||                      .__                  || 
//  ||   ____   ____   ____ |  |   ____   ____   || 
//  || _/ __ \_/ __ \ / ___\|  |  /  _ \ /  _ \  || 
//  || \  ___/\  ___// /_/  >  |_(  <_> |  <_> ) || 
//  ||  \___  >\___  >___  /|____/\____/ \____/  || 
//  ||      \/     \/_____/                  2020|| 
// .\=============================================/.

//const ip = "http://192.168.0.41"
const ip = "88.121.253.98"
const port = 42000

const DOM = document.getElementById("visite")

const params = (method,data) => {
	
	let setting = {
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: method,
		}

	return setting
}



const load = () => { 

	return 	fetch(`http://${ip}:${port}/`,params("GET"))
		    .then(res => res.json())
		    // .then(res => 	console.log('%c DebuGg : ', 'background: orange; color: red' , res ))
		    .then(log => log.localData.map(visite => 	`<ul class="list">
		    												<li>Le <span class="blue"> ${visite.date.replace("T","</span> à <span class='red'> ").split(".")[0]}</span> </li>
		    												<li>l'ip <span class="red">${visite.ip}</span> obtient</li>
		    												<li>la visite numero <span class="blue">${visite.num}</span> </li>
	    												</ul>` ) )
		    .then(log => DOM.innerHTML = log.reverse().join('') )
}

load()

