const api = "https://www.breakingbadapi.com/api/characters/";

async function getInfo() {
	try{
		const response = await fetch(api);
		const data = await response.json();
		printData(data);
	}catch(e){
		console.log("Error: ", e.message);
	}
}

function printData(data) {
	const header = document.querySelector("#header");
	const content = document.querySelector("#content");
	header.innerHTML += `
	<select class="form-control" onchange="getCharacter(this.value)">
		<option>Please Select Any Actor</option>
		${data.map(character => `<option>${character.name}</option>`)}
	</select>
	`;
}
async function getCharacter(name) {
	if(name !== 'Please Select Any Actor'){
		const response = await fetch(`${api}?name=${name}`);
		const data = await response.json();
		content.innerHTML = `
		<h2 class="text-center" style="margin: 20px">${data[0].name} - (${data[0].nickname})</h2>
		<h3 class="text-center" style="margin: 20px">${data[0].portrayed}</h3>
		<h4 class="text-center" style="margin: 20px">${data[0].birthday}</h4>
		<img style=" display: block; margin: 0 auto" src="${data[0].img}" width="250">
		`;
	}
}
getInfo();
