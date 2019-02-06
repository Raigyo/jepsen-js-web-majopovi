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
var modalEdit = document.getElementById('modal-edit');
var modalComment = document.getElementById('modal-comment');

// Get the button that opens the modal
var btn = document.getElementById("modal-add-btn");
var edit = document.querySelector('.modal-edit-btn');
var display = document.querySelector('.modal-display-btn');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1 = document.getElementsByClassName("close")[1];
var span2 = document.getElementsByClassName("close")[2];


// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";

}
span1.onclick = function() {

  modalEdit.style.display = "none";
}
span2.onclick = function() {

  modalComment.style.display = "none";
}


//-----------------------fin des fct de la modal box----------------------------------
// debut des fonctions de l'application

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

// When adding idea, reload the page
document.querySelector(".add-idea").addEventListener("click", () => {
  location.reload();
})

//-------------------------------------------------------------------------
/*On affiche sur la page index la liste des idées
on ajoute pour chaque idée un bouton delete edit et afficher */

let displayIdeas = () => {
  //decommenter pour nettoyer le localstorage
  //localStorage.setItem('content', JSON.stringify(dataJson));
  let listIdeas = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')) : [];
  let toDisplay = "";

  // je parcours le tableau
  // ----debut for
  for (let i = 0; i<listIdeas.length; i++){
    let li = document.createElement ("li");
    li.innerText = listIdeas[i].idea;

    //creation du bouton edit
    let editBtn = document.createElement ("button");
    editBtn.setAttribute("class", "modal-edit-btn");
    editBtn.innerText = "";

    // function edit
    editBtn.addEventListener('click', () => {
      document.querySelector("#edit-title").value = listIdeas[i].idea;
      document.querySelector("#edit-descr").value = listIdeas[i].description;
      document.querySelector(".modal-com").innerText = listIdeas[i].commentary;



      // on sauvegarde dans la local nos changement
      let saveBtn = document.querySelector(".save-idea");
      saveBtn.addEventListener("click", () => {
        listIdeas[i].idea = document.querySelector("#edit-title").value;
        listIdeas[i].description = document.querySelector("#edit-descr").value;
        localStorage.setItem('content', JSON.stringify(listIdeas));
        window.location.reload();
      });// end of save

      modalEdit.style.display = "block";

    }); // end of edit

    // creation du bouton delete
    let deleteBtn = document.createElement ("button");
    deleteBtn.setAttribute("id", "delete" + i);
    deleteBtn.setAttribute("class", "modal-delete-btn");
    deleteBtn.innerText = "";

    // function delete
    deleteBtn.addEventListener('click', () => {
      listIdeas.splice(i, 1);
      localStorage.setItem('content', JSON.stringify(listIdeas));
      window.location.reload();
    }); // end of delete


  /*Pour chaque idée, on doit pouvoir donner un
  commentaire qui lui est propre*/
    // creation du bouton Display
    let displayBtn = document.createElement ("button");
    displayBtn.setAttribute("class", "modal-display-btn");
    displayBtn.innerText = "";


    // function Display
    displayBtn.addEventListener('click', () => {

      // fonction add commentaire
      let input_textarea = document.querySelector('.modal-comment');
      let pComments = document.querySelector('.modal-com');
      let addCommentBtn = document.querySelector('.add-comment');
      let listIdeas = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')) : [];
      input_textarea.value="";

      console.log(JSON.parse(localStorage.getItem('content')));

      //function addComment pour ajouter
      addCommentBtn.addEventListener('click', () => {
        listIdeas[i].commentary.push(input_textarea.value);
        localStorage.setItem('content', JSON.stringify(listIdeas));
        window.location.reload();
      }); //end addComment.btn

      // on affiche tous les commentaires d'une idée
      input_textarea.value="";
      let toDisplay = "";

      for (let j=0; j<listIdeas[i].commentary.length; j++ ){
        toDisplay += "<p>" + listIdeas[i].commentary[j] + "</p>";
      }// end of for

      //listIdeas[i].commentary = document.querySelector(".modal-comment").value;
      pComments.innerHTML = toDisplay;
      modalComment.style.display = "block";
      document.getElementById("show-title").innerHTML = listIdeas[i].idea;
      // If you use require (Node etc), require as first the module and then create the instance
      let Remarkable = require('remarkable');
      // If you're in the browser, the Remarkable class is already available in the window
      let md = new Remarkable();
      let md_descr = listIdeas[i].description;
      document.getElementById("show-descr").innerHTML = md.render(md_descr);



  }); //end displayBtn

    // on affiche la liste avec le ul et li +  avec les boutons display, delete et edit
    let ul =document.querySelector('ul');
    ul.appendChild(li);
    ul.appendChild(deleteBtn);
    ul.appendChild(editBtn);
    ul.appendChild(displayBtn);



  }; // end of for de la liste des idées
};// en of displayIdeas-----------------


/*Sur la page index, on doit pouvoir ajouter une nouvelle idée
on a besoin de l'id de cette idée de sa value ainsi que sa description
A chaque idée, on peut lui donner des commentaires*/

//Fonction ajoute idée, desciption, id
//---------------------------------------------------

let newIdea = document.querySelector("#modal-title");
let newDes = document.querySelector("#modal-descr");

let addIdea = (i, d) =>{

  let listIdeas = localStorage.getItem('content') ? JSON.parse(localStorage.getItem('content')) : [];

  listIdeas.push({id: listIdeas.length ,idea: i.value,description: d.value,commentary: []});
  localStorage.setItem('content', JSON.stringify(listIdeas));

}// end of function addIdea

// on ajoute une idée
let addBtn =  document.querySelector(".add-idea");

addBtn.addEventListener("click", () => {
  addIdea(newIdea, newDes);

});// end of add


//--------------------------------------------------------------------------------------

/*Pour chaque champs texte, on doit generer du markdown*/
// -------------------------- Jeremy markdown convert to html--------------------------//
