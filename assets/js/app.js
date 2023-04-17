let cl = console.log;

//CRUD ----> create , Read, Update, Delete

var stdform = document.getElementById("stdform");
const fnamecontrols = document.getElementById("fname");
const lnamecontrols = document.getElementById("lname");
const emailcontrols = document.getElementById("email");
const contactcontrols = document.getElementById("contact");
const subBtn = document.getElementById("subBtn");
const upBtn = document.getElementById("upBtn");
const stdInfoContainer = document.getElementById("stdInfoContainer");

let stdArray = [];
function setStdDataInStorage(){
    localStorage.setItem("setStdInfo", JSON.stringify(stdArray))
}
const onEditHandler = (ele) => {
  cl("editted", ele);
  // how to get uniq id
  // find out object from stdArray >> umiq id
  let getID = ele.getAttribute("data-id");

  localStorage.setItem("updateId", getID);

  let getObj = stdArray.find((std) => std.id === getID);
  cl(getObj);
  cl(getID);
  fnamecontrols.value = getObj.fname;
  lnamecontrols.value = getObj.lname;
  emailcontrols.value = getObj.email;
  contactcontrols.value = getObj.contact;

  subBtn.classList.add("d-none");
  upBtn.classList.remove("d-none");
};
const ondeleteHandler=(ele) =>{
    cl(ele)
    let deleteId = ele.dataset.id;
    cl(deleteId)
    let getIndex = stdArray.findIndex(std=> std.id === deleteId);
    stdArray.splice(getIndex, 1);
    setStdDataInStorage();
    // localStorage.setItem("setStdInfo", JSON.stringify(stdArray));
    ele.parentElement.parentElement.remove()

}
const templeting = (arr) => {
  let result = "";
  arr.forEach((std, i) => {
    result += `
                    <tr>
                        <td>${i + 1}</td>
                        <td>${std.fname}</td>
                        <td>${std.lname}</td>
                        <td>${std.email}</td>
                        <td>${std.contact}</td>
                        
                        <td>
                            <button class="btn btn-info" data-id=${
                              std.id
                            } onclick="onEditHandler(this)">Edit</button>
                        </td>
                        <td>
                            <button class="btn btn-danger" data-id=${std.id} onclick="ondeleteHandler(this)">Delete</button>
                        </td>
                     </tr>
        `;
  });

  stdInfoContainer.innerHTML = result;
};

if (localStorage.getItem("setStdInfo")) {
  stdArray = JSON.parse(localStorage.getItem("setStdInfo"));
  templeting(stdArray);
}

const onstdsubmit = (eve) => {
  eve.preventDefault();
  //// cl("submit")
  let obj = {
    fname: fnamecontrols.value,
    lname: lnamecontrols.value,
    email: emailcontrols.value,
    contact: contactcontrols.value,
    id: uuid(),
  };

  stdArray.push(obj);
  localStorage.setItem("setStdInfo", JSON.stringify(stdArray));

  templeting(stdArray);
  stdform.reset();
};

const btnEdit = [...document.querySelectorAll("#stdInfoContainer .btn-info")];
cl(btnEdit);

btnEdit.forEach((btn) => {
  btn.addEventListener("click", function (eve) {
    cl(eve.target);
  });
});

const onstdUpdate = (e) => {
  cl("updated");
  let getupdateId = localStorage.getItem("updateId");
  cl(getupdateId);
  stdArray.forEach((std) => {
    if (getupdateId === std.id) {
      std.fname = fnamecontrols.value;
      std.lname = lnamecontrols.value;
      std.email = emailcontrols.value;
      std.contact = contactcontrols.value;
    }
    setStdDataInStorage()
    //localStorage.setItem("setStdInfo", JSON.stringify(stdArray));
    templeting(stdArray);
    stdform.reset();
    subBtn.classList.remove("d-none");
    upBtn.classList.add("d-none");
  });
  // u have to update obj in array >> obj ?? get Id of that object
};

stdform.addEventListener("submit", onstdsubmit);
upBtn.addEventListener("click", onstdUpdate);

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

var userID = uuid();

// on the fly element ----> HTML elements which are created in javascript
