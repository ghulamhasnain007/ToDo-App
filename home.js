import { auth , app } from './config.js';
import { signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';
import { getFirestore , collection, addDoc , onSnapshot ,doc, deleteDoc ,updateDoc,getDocs} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const db = getFirestore(app);
var send = document.querySelector('#send');

send.addEventListener('click',async()=>{
    var inp = document.querySelector('#exampleFormControlInput1');
    var docRef = await addDoc(collection(db, "todos"), {
        name: inp.value ,
        time : new Date().toLocaleString()
      });
       inp.value = "";
      console.log("Document written with ID: ", docRef.id);
      
      
})
function getData(){
    let ul = document.querySelector('#ul');
    onSnapshot(collection(db,"todos"),(data)=>{
        data.docChanges().forEach((newData)=>{
        // console.log(newData.doc.id);

        if (newData.type == 'removed') {
            let del = document.getElementById(newData.doc.id);
    
            // Check if the element exists and has a next sibling
            if (del && del.nextElementSibling) {
                del.nextElementSibling.remove();
            }
    
            // Remove the element itself
            if (del) {
                del.remove();
            }
        }
        else if(newData.type == "added"){
            ul.innerHTML += `<li
            class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent" id="${newData.doc.id}">
            <p class="lead fw-normal mb-0">${newData.doc.data().name}</p>
          </li>
          <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent" id="${newData.doc.id}">
            <div class="d-flex flex-row justify-content-end mb-1">
              <button onclick="edit(this,'${newData.doc.id}')" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
                  class="fas fa-pencil-alt me-3"></i></button>
                  <button onclick="dltTodo('${newData.doc.id}')" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo">
            <i class="fas fa-trash-alt"></i>
            </button>
            </div>
            <div class="text-end text-muted">
              <a href="#!" class="text-mclassuted" data-mdb-toggle="tooltip" title="Created date">
                <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>${newData.doc.data().time}</p>
              </a>
            </div>
          </li>`
        }
            
        })

    }
    )}
    
    getData();

    async function dltTodo(id){

        await deleteDoc(doc(db, "todos", id));

    }
    async function edit(e, id) {
        let editVal = prompt("Enter Edit Value");
    
        if (editVal !== null) {
            await updateDoc(doc(db, "todos", id), {
                name: editVal,
                time: new Date().toLocaleString()
            });
    
            // Update the name in the UI
            const listItem = document.getElementById(id);
    
            // Check if the listItem is found
            if (listItem) {
                const nameElement = listItem.querySelector('.lead');
                if (nameElement) {
                    nameElement.textContent = editVal;
                } else {
                    console.error('Name element not found.');
                }
            } else {
                console.error('List item not found.');
            }
        }
    }
    
    async function deleteAll() {
        // Get a reference to the "todos" collection
        const todosCollection = collection(db, "todos");
    
        // Get all documents in the "todos" collection
        const querySnapshot = await getDocs(todosCollection);
    
        // Delete each document
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
    
        // Clear the UI
        const ul = document.querySelector('#ul');
        ul.innerHTML = ''; // Remove all list items from the UI
    }
    
    
window.getData = getData
window.dltTodo = dltTodo
window.edit = edit
window.deleteAll = deleteAll