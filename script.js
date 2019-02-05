// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

/*Modal Box*/
/* With buttons in html to open the right one for test purpos */
// Get the Add modal
var modal = document.getElementById('modal-add');
// Get the button that opens the modal
var btn = document.getElementById("modal-add-btn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("modal-add-close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Get the Edit modal
var modal2 = document.getElementById('modal-edit');
// Get the button that opens the modal
var btn2 = document.getElementById("modal-edit-btn");
// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("modal-edit-close")[0];

// When the user clicks the button, open the modal
btn2.onclick = function() {
  modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
}
//---------------------------------------------------------
let dataJson = [
{
  "id": "0",
  "idea": "Test: Idea 1",
  "description": "Idea 1 description",
  "commentary": []
},
{
  "id": "1",
  "idea": "Test: Idea 2",
  "description": "Idea 2 description",
  "commentary": []
},
{
  "id": "2",
  "idea": "Test: Idea 3",
  "description": "Idea 3 description",
  "commentary": []
}
];

// Au chargement de page j'affiche la liste
window.addEventListener("load", ()=>{

  displayIdeas();
});

////////////////////////Magali/////////////////////////////
// fonction qui liste la liste des idées
//-----------------------------------------
let displayIdeas = () => {
  //decommenter pour nettoyer le localstorage
  //localStorage.setItem('content', JSON.stringify(dataJson));
  let listIdeas = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')) : [];
  let toDisplay = [];
  console.log(listIdeas);
  for (let i = 0; i<listIdeas.length; i++){
    toDisplay += "<li>id="+listIdeas[i].id+" "+listIdeas[i].idea+"</li>";
  }
  
  document.querySelector('ul').innerHTML += toDisplay;    
}

//Fonction ajoute idée, desciption, id
//---------------------------------------------------

let newIdea = document.querySelector("#modal-title");
let newDes = document.querySelector("#modal-descr");


let addIdea = (i, d) =>{
  let listIdeas = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')) : [];
  
  listIdeas.push({id: listIdeas.length ,idea: i.value,description: d.value,commentary: []});
  localStorage.setItem('content', JSON.stringify(listIdeas));
}
document.querySelector(".add-idea").addEventListener("click", () => {
  addIdea(newIdea, newDes);

});

// fonction qui ajoute un commentaire 
// passer en parametre le numero de l'idée

//----------------------------------------
let input_textarea = document.querySelector('.modal-comment');
let output_div = document.querySelector('.modal-com');
let save_button = document.querySelector('.save-idea');
let listIdeas = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')) : [];
let listComments = listIdeas[1].commentary;
let comment ="";

let addComments = () => {
  
  comment.push(input_textarea.value);
  
  //localStorage.setItem('content', JSON.stringify(listIdeas));

  input_textarea.value="";
  let toDisplay = "";

  for(let i=0; i<listComments.length; i++ ){

    toDisplay += "<p>" + listComments[i] + "</p>";
  }
  output_div.innerHTML = toDisplay;

};

//save_button.addEventListener('click', () => {
  //addComments();
//};

// fonction qui delete une idée
//-------------------------------------------------

//fonction qui edit une idée
//--------------------------------------------------