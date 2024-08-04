function getAndUpdate(){
    console.log("Updating List...");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update();
}

function update(){
    if (localStorage.getItem('itemsJson')==null){
        itemJsonArray = []; 
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    } 
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>`; 
    });
    tableBody.innerHTML = str;
    
}

function deleted(itemIndex){
    console.log("Delete", itemIndex);
    itemJsonArrayStr = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();

}
function clearStorage(){
    if (confirm("Do you areally want to clear?")){
    console.log('Clearing the storage')
    localStorage.clear();
    update()
    }
}
function search() {
    let query = document.getElementById("searchQuery").value.toLowerCase();
    let itemJsonArraystr = localStorage.getItem('itemsJson');
    let itemJsonArray = JSON.parse(itemJsonArraystr);

    let results = itemJsonArray.filter(item => 
        item[0].toLowerCase().includes(query) || item[1].toLowerCase().includes(query)
    );

    let searchResults = document.getElementById("searchResults");
    if (results.length > 0) {
        let str = "<h3>Search Results:</h3><ul>";
        results.forEach((item, index) => {
            str += `<li>${item[0]}: ${item[1]}</li>`;
        });
        str += "</ul>";
        searchResults.innerHTML = str;
    } else {
        searchResults.innerHTML = "<p>No items found.</p>";
    }
}
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
document.getElementById("searchButton").addEventListener('click', search);
update();
