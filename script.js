let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phoneNo = document.querySelector("#phone-no");
let tableBody = document.querySelector(".table-body");
let radioButtons = document.querySelectorAll(".radio-button");
let userFile = document.querySelector("#user-img");
let submitBtn = document.querySelector(".submit");
let radioButtonValue = "";
let userImg = document.createElement("img");
let editingRow = null;

let id = 0;
function submitForm(e) {
  e.preventDefault();

  let tempTr = document.querySelector(".temporary-tr");
  if(tempTr){
 tempTr.remove();
  }

  if (editingRow) {
    editingRow.children[1].textContent = name.value;
    editingRow.children[2].textContent = email.value;
    editingRow.children[3].textContent = phoneNo.value;
    editingRow.children[4].querySelector("img").src = URL.createObjectURL(
      userFile.files[0]
    );
    editingRow.children[5].textContent = radioButtonValue;
    editingRow = null;
  } else {
    id = id + 1;

    userImg.setAttribute("src", URL.createObjectURL(userFile.files[0]));
    radioButtons.forEach((radioButton) => {
      if (radioButton.checked) {
        radioButtonValue = radioButton.value;
      }
    });
    tableBody.innerHTML += `
   <tr>
   <td>${id}</td>
   <td>${name.value}</td>
   <td>${email.value}</td>
                <td>${phoneNo.value}</td>
                <td>${userImg.outerHTML}</td>
                <td>${radioButtonValue}</td>
                <td><i class="ri-edit-2-fill" onclick="editFunction(this)"></i></td>
                <td><i class="ri-delete-bin-6-fill" onclick="deleteFunction(this)"></i></td>
                </tr>
                `;
              }


              name.value = "";
              email.value = "";
              phoneNo.value = "";
              userFile.value = "";
              radioButtons.forEach((radioButton) => {
                if (radioButton.checked) {
                  radioButton.checked = false;
                }
              });
  submitBtn.value = "Submit";
}

function editFunction(currentIcon) {
  let parentTr = currentIcon.parentElement.parentElement;
  editingRow = parentTr;
  let tdArr = parentTr.children;

  name.value = tdArr[1].textContent;
  email.value = tdArr[2].textContent;
  phoneNo.value = tdArr[3].textContent;
  radioButtons.forEach((radioButton) => {
    if (radioButton.value === tdArr[5].textContent) {
      radioButton.checked = true;
    }
  });

  name.value = tdArr[1].textContent;
  email.value = tdArr[2].textContent;
  phoneNo.value = tdArr[3].textContent;

  submitBtn.value = "Update";
}

function deleteFunction(currentIcon) {
  let parentTr = currentIcon.parentElement.parentElement;
  parentTr.remove();

  if(tableBody.children.length === 0){
  tableBody.innerHTML = `
   <tr class="temporary-tr">
        <td colspan="8">
          <div style="display: flex;
          align-items: center;
          justify-content: center; column-gap: 10px;">
          <span style="font-size: 20px; color: rgba(128, 128, 128, 0.846); font-weight: 600;">No records yet</span>
          <i class="ri-sticky-note-line" style="
              font-size: 45px;
              color: rgba(128, 128, 128, 0.625);
          "></i>  
            </div>
        </td>
      </tr>
  `;
  }
}
document.querySelector("form").addEventListener("submit", submitForm);
