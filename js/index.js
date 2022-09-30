var siteNameInput = document.getElementById("sitename");
var siteUrlInput = document.getElementById("siteurl");
var btnSaveUpdates = document.getElementById("btnSaveUpdates");
var btnSubmitUrl = document.getElementById("btnSubmitUrl");
var btnclearDatabase = document.getElementById("btnclearDatabase");
var tableUrls = document.getElementById("tableUrls");
var searchInput = document.getElementById("searchInput");
var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");
var alertAlreadyAdded = document.getElementById("alertAlreadyAdded");
var localStorageName = "sharedData";
var sitesList = [];
var currentIndex = 0;
var regexUrlName = /^[a-zA-Z]{3,100}$/;
var regexUrl = /^((http|https):\/\/)www\.([A-z]){3,20}\.[A-z]{2,4}(\.[A-z]{2})?$/;


if (localStorage.getItem(localStorageName) != null) {

  sitesList = JSON.parse(localStorage.getItem(localStorageName))

  displayUrls();

} else {

  sitesList = []
}

function addURL() {

  if (validcationUrlName() && validcationUrl()) {

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
      + (currentdate.getMonth() + 1) + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();

    var sites = {

      siteName: siteNameInput.value,
      siteUrl: siteUrlInput.value,
      addedAt: datetime,

    }


    if (checkAddedUrl()) {

      alertAlreadyAdded.classList.remove("d-none");

    } else {

      alertAlreadyAdded.classList.add("d-none");
      sitesList.push(sites);
      localStorage.setItem(localStorageName, JSON.stringify(sitesList));
      displayUrls();
      clearForm();


    }

  }

}

function displayUrls() {

  var temp = "";

  for (var i = 0; i < sitesList.length; i++) {

    temp += `<tr>
    <td>`+ (i + 1) + `</td>
    <td>`+ sitesList[i].siteName + `</td>
    <td>`+ sitesList[i].siteUrl + `</td>

    <td><button class="btn btn-outline-warning" onclick="updateURL(`+ i + `)">Update</button>
    </td>    

    <td>
    <button class="btn btn-outline-info" onclick="openUrl(`+ i + `)">Open Url</button>
    </td>    

    <td><button class="btn btn-outline-danger" onclick="deleteUrl(`+ i + `)">Delete</button></td> 

    <td>`+ sitesList[i].addedAt + `</td>
          
    </tr>`
  };

  if (sitesList.length != 0) {

    document.getElementById("tableBody").innerHTML = temp;

    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");

    btnclearDatabase.classList.remove("d-none");

    tableUrls.classList.remove("d-none");

    searchInput.classList.remove("d-none");

  } else {

    tableUrls.classList.add("d-none");
    btnclearDatabase.classList.add("d-none");
    searchInput.classList.add("d-none");

  }

}

function deleteUrl(indexPath) {

  sitesList.splice(indexPath, 1);
  localStorage.setItem(localStorageName, JSON.stringify(sitesList));
  displayUrls();
  clearForm();
}

function openUrl(indexPath) {

  window.open(sitesList[indexPath].siteUrl, '_blank');

}

function clearForm() {

  siteNameInput.value = "";
  siteUrlInput.value = "";
  btnSaveUpdates.classList.replace("d-inline-block", "d-none");
  btnSubmitUrl.classList.replace("d-none", "d-inline-block");
  alertAlreadyAdded.classList.add("d-none");
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
  siteNameInput.classList.remove("is-invalid");
  siteUrlInput.classList.remove("is-invalid");
  alertName.classList.add("d-none");
  alertUrl.classList.add("d-none");


}

function updateURL(indexPath) {

  currentIndex = indexPath;
  siteNameInput.value = sitesList[indexPath].siteName;
  siteUrlInput.value = sitesList[indexPath].siteUrl;
  btnSaveUpdates.classList.replace("d-none", "d-inline-block");
  btnSubmitUrl.classList.replace("d-inline-block", "d-none");

}

function saveUpdates() {

  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();


  if (validcationUrlName() && validcationUrl()) {


    if (checkAddedUrl()) {

      alertAlreadyAdded.classList.remove("d-none");


    } else {

      sitesList[currentIndex].siteName = siteNameInput.value;
      sitesList[currentIndex].siteUrl = siteUrlInput.value;
      sitesList[currentIndex].addedAt = datetime;
      localStorage.setItem(localStorageName, JSON.stringify(sitesList));
      displayUrls();
      clearForm();
      btnSaveUpdates.classList.replace("d-inline-block", "d-none");
      btnSubmitUrl.classList.replace("d-none", "d-inline-block");

    }

  }


}

function clearDataBase() {

  localStorage.removeItem(localStorageName);
  sitesList = [];
  displayUrls();
  clearForm();
}

function searchUrl() {

  var searchWords = searchInput.value.toLowerCase();

  var temp = "";

  for (var i = 0; i < sitesList.length; i++) {

    if (sitesList[i].siteName.toLowerCase().includes(searchWords) || sitesList[i].siteUrl.toLowerCase().includes(searchWords)) {

      temp += `<tr>
      <td>`+ (i + 1) + `</td>

      <td>`+ sitesList[i].siteName.toLowerCase().replace(searchWords, "<span class='text-danger fw-bold'>" + searchWords + "</span>") + `</td>


      <td>`+ sitesList[i].siteUrl.toLowerCase().replace(searchWords, "<span class='text-danger fw-bold'>" + searchWords + "</span>") + `</td>
  
      <td><button class="btn btn-outline-warning" onclick="updateURL(`+ i + `)">Update</button>
      </td>    
  
      <td>
      <button class="btn btn-outline-warning" onclick="openUrl(`+ i + `)">Open Url</button>
      </td>    
  
      <td><button class="btn btn-outline-danger" onclick="deleteUrl(`+ i + `)">Delete</button></td>  
      <td>`+ sitesList[i].addedAt + `</td>

      </tr>`

    }
  };

  document.getElementById("tableBody").innerHTML = temp;


}

// siteNameInput.addEventListener("blur", validcationUrlName);
function validcationUrlName() {

  if (regexUrlName.test(siteNameInput.value)) {

    siteNameInput.classList.add("is-valid")

    siteNameInput.classList.remove("is-invalid")

    alertName.classList.add("d-none")

    return true;

  } else {

    siteNameInput.classList.add("is-invalid")

    siteNameInput.classList.remove("is-valid")

    alertName.classList.remove("d-none")

    alertAlreadyAdded.classList.add("d-none");

    return false;
  }

}

// siteUrlInput.addEventListener("blur", validcationUrl);
function validcationUrl() {

  if (regexUrl.test(siteUrlInput.value)) {

    siteUrlInput.classList.add("is-valid")

    siteUrlInput.classList.remove("is-invalid")

    alertUrl.classList.add("d-none")

    return true;

  } else {

    siteUrlInput.classList.add("is-invalid")

    siteUrlInput.classList.remove("is-valid")

    alertUrl.classList.remove("d-none")

    alertAlreadyAdded.classList.add("d-none");

    return false;
  }

}

function checkAddedUrl() {

  var checkBySiteUrlInput = siteUrlInput.value.toLowerCase();

  for (var i = 0; i < sitesList.length; i++) {

    if (sitesList[i].siteUrl.toLowerCase().includes(checkBySiteUrlInput)) {

      return true;

    }

  };


}
