
var row = null
var srow = null

//Registration Function
function register()
{   
    var dataEntered = createData()
     if (dataEntered === false){
         alert("Enter all the fields");
     }
     else if (dataEntered === "Invalid"){
        alert("User Name Already Exist");
    }
     else{
             
         // Retrieve existing data from local storage
         var existingData = JSON.parse(localStorage.getItem("users")) || [];
 
         // To insert data into the table
         if (row === null) {
             existingData.push(dataEntered);
             alert("User Registred Successfully");
         } 
         // Store the updated data in local storage
         localStorage.setItem("users", JSON.stringify(existingData));
         window.location.href="login.html"
     }
 
     document.getElementById("rform").reset();
     
 
     }
     var form = document.getElementById("rform");
     form.addEventListener("submit", (e) => {
     e.preventDefault();});


//Data Create Function
function createData()
{
    var name = document.getElementById("rname").value;
    var uname = document.getElementById("runame").value;
    var pass = document.getElementById("rpass").value;  
    if(name==""||uname==""||pass=="")
    {
        return false;
    }
    else if(check(uname)==false)
    {
        return "Invalid";
    }
    else
    {
       return {name,uname,pass,
            py:{},
            js:{},
            qa:{},};
    }
}



function check(uname)
{
    var uname = uname
    var existingData = JSON.parse(localStorage.getItem("users")) || [];
    var flag
    for(i of existingData)
    {
        if(uname == i.uname)
        {
            flag = false
            break
        }
        else{
            flag =  true
        }
    }
    return flag
}





//Login function

function login()
{
    sessionStorage.clear();
    
    var existingData = JSON.parse(localStorage.getItem("users")) || [];
    var luname = document.getElementById("luname").value;
    var lpass = document.getElementById("lpass").value;
    var flag=false
    
    for(let i of existingData)
    {
        if(luname===i.uname && lpass===i.pass)
        {
           window.location.href="choose.html";
           var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
           if (srow === null) {
            sessionData.push({luname,lpass});
            alert("User Login Successfully");
        } 
           sessionStorage.setItem("user",JSON.stringify(sessionData))
            flag=true
            
    
        }
    }
    if(flag==false)
        {
            alert("Enter valid Name and Password")
            
        }
        return [luname,lpass]
    
       
}



var form2 = document.getElementById("lform");
    form2.addEventListener("submit", (e) => {
    e.preventDefault();});

var form3 = document.getElementById("pform");
form3.addEventListener("submit", (e) => {
e.preventDefault();});

function validate(dom,event)
{
    
    var dom = dom
    fname = document.getElementById("name").value;
    dob = document.getElementById("dob").value;
    phno = document.getElementById("phno").value;
    email = document.getElementById("email").value;
    address = document.getElementById("address").value;
    edu = document.getElementById("edu").value;
    skill = getSkillValues()
    work_year = document.getElementById("work_year").value;
    work_exp = document.getElementById("work_exp").value;
    lk = getLangValues()
    ctc = document.getElementById("ctc").value; 
    
    if(fname==''||dob==''|| phno==''|| email==''|| address==''|| edu ==''||skill==''|| work_year==''|| work_exp==''|| lk==''|| ctc=='')
    {
        event.preventDefault();
        alert("Fill All The Fields");
    }
    else
    {
        
        save(dom)
        

    }
    

}


function save(dom)
{
    var dom = dom
    var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
    var existingData = JSON.parse(localStorage.getItem("users")) || [];

  for(let j of sessionData)
  {
    
    for(let i of existingData)
    {
        if(j.luname===i.uname && j.lpass===i.pass)
        {
            if(dom=='py')
            {
                i[dom].formName = "Python Application"
            }
            else if(dom == 'js')
            {
                i[dom].formName = "Java Script Application"
            }
            else if(dom == 'qa')
            {
                i[dom].formName = "Quality Assurance Application"
            }
            
            i[dom].fname = document.getElementById("name").value;
            i[dom].dob = document.getElementById("dob").value;
            i[dom].phno = document.getElementById("phno").value;
            i[dom].email = document.getElementById("email").value;
            i[dom].address = document.getElementById("address").value;
            i[dom].edu = document.getElementById("edu").value;
            i[dom].skill = getSkillValues()
            i[dom].work_year = document.getElementById("work_year").value;
            i[dom].work_exp = document.getElementById("work_exp").value;
            i[dom].lk = getLangValues()
            i[dom].ctc = document.getElementById("ctc").value;     
        }
        }
    }   
    
    localStorage.setItem("users", JSON.stringify(existingData));
    window.location.href="app_dash.html"
    insert()
    
    
}

function getSkillValues()
{
    var checkboxes = document.querySelectorAll('input[name="skill"]:checked');
  var values = [];
  checkboxes.forEach(function(checkbox) {
    values.push(checkbox.value);
  });
  return values
}

function getLangValues()
{
    var checkboxes = document.querySelectorAll('input[name="lk"]:checked');
  var values = [];
  checkboxes.forEach(function(checkbox) {
    values.push(checkbox.value);
  });
  return values
}

function insert() {
    var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
    var existingData = JSON.parse(localStorage.getItem("users")) || [];

    for (let j of sessionData) {
        for (let i of existingData) {
            if (j.luname === i.uname && j.lpass === i.pass) {
               
                
                Object.keys(i).forEach(k => {
                    if ((k === "py" || k === "js" || k === "qa") && (typeof i[k] === "object" && Object.keys(i[k]).length > 0)) 

                    {

                        var table = document.getElementById("table");
                        var newRow = table.insertRow();
                        newRow.insertCell(0).innerHTML = i[k].formName;
                        if(k === "py"){
                            var ht = `<button onclick="edit('py')">View</button> 
                                <button onclick="remove('py')">Delete</button>`;
                        }
                        if(k === "js"){
                            var ht = `<button onclick="edit('js')">View</button> 
                                <button onclick="remove('js')">Delete</button>`;
                        }
                        if(k === "qa"){
                            var ht = `<button onclick="edit('qa')">View</button> 
                            <button onclick="remove('qa')">Delete</button>`;
                        }
                        newRow.insertCell(1).innerHTML = ht;
                    }
                    
                });
            }
        }
    }
}


function btn()
{
    var dom = dom
    var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
    var existingData = JSON.parse(localStorage.getItem("users")) || [];

    for (let j of sessionData) {
        for (let data of existingData) {
            if (j.luname === data.uname && j.lpass === data.pass) {
                if(data['py'].fname!=undefined){
                    document.getElementById('btn-py').innerHTML = ''

                }
                if(data['js'].fname!=undefined){
                    document.getElementById('btn-js').innerHTML = ''

                }
                if(data['qa'].fname!=undefined){
                    document.getElementById('btn-qa').innerHTML = ''

                }
            }
        }
    }
}


// Edit function
function edit(k) {
    if(k === "py"){
        window.location.href="py.html";
    }
    if(k === "js"){
        window.location.href="js.html";
    }
    if(k === "qa"){
    window.location.href="qa.html";
    }
}

function fetch(dom)
{
    var dom = dom
    var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
    var existingData = JSON.parse(localStorage.getItem("users")) || [];

    for (let j of sessionData) {
        for (let data of existingData) {
            if (j.luname === data.uname && j.lpass === data.pass) {
                if(data[dom].fname!=undefined){
               
            
            document.getElementById("name").value = data[dom].fname;
            document.getElementById("dob").value = data[dom].dob;
            document.getElementById("phno").value = data[dom].phno;
            document.getElementById("email").value = data[dom].email; 
            document.getElementById("address").value = data[dom].address;
            document.getElementById("edu").value = data[dom].edu;
            var skillCheckboxes = document.querySelectorAll('input[name="skill"]');
                skillCheckboxes.forEach(function(checkbox) {
                    checkbox.checked = data[dom].skill.includes(checkbox.value);
                });

            document.getElementById("work_year").value = data[dom].work_year;
            document.getElementById("work_exp").value = data[dom].work_exp;
            var lkCheckboxes = document.querySelectorAll('input[name="lk"]');
                lkCheckboxes.forEach(function(checkbox) {
                    checkbox.checked = data[dom].lk.includes(checkbox.value);
                });

            document.getElementById("ctc").value = data[dom].ctc; 
            }
            
            
            }
        }
    }
}


function remove(k) {

    var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
    var existingData = JSON.parse(localStorage.getItem("users")) || [];

    for (let j of sessionData) {
        for (let data of existingData) {
            if (j.luname === data.uname && j.lpass === data.pass) {
               
            
                if(k === "py"){
                    data.py =  {};
                }
                if(k === "js"){
                   data.js = {};
                }
                if(k === "qa"){
                    data.qa = {};
                }
                
            }
        }
    }
    localStorage.setItem("users", JSON.stringify(existingData));
    window.location.href="app_dash.html"
}

function insert_candy(data)
{
    
    var table = document.getElementById("table");
    var rowCount = table.rows.length;
    for (var t = rowCount - 1; t > 0; t--) {
        table.deleteRow(t);
        
    }
    document.getElementById("show").innerHTML ='<div>'+'</div>'
    var existingData = JSON.parse(localStorage.getItem("users")) || [];
    for (let i of existingData) {
            Object.keys(i).forEach(k => {
                if ((k === data) && (typeof i[k] === "object" && Object.keys(i[k]).length > 0)) 

                {
                    var newRow = table.insertRow();
                    newRow.insertCell(0).innerHTML = i.name;
                    newRow.insertCell(1).innerHTML = i.uname;
                    console.log(i.name)
                    if(k === "py"){
                        var ht = `<button onclick="view(this,'py')">View</button>`;   
                    }
                    if(k === "js"){
                                var ht = `<button onclick="view(this,'js')">View</button>`;
                    }
                    if(k === "qa"){
                        var ht = `<button onclick="view(this,'qa')">View</button>`;
                    }
                    newRow.insertCell(2).innerHTML = ht;
                    }
                }
                
                
            );
        }
    }
    function view(td,d) {
        var d = d
        row = td.parentElement.parentElement;
        var existingData = JSON.parse(localStorage.getItem("users")) || [];

    for (let i of existingData) {

        if(i.uname==row.cells[1].innerHTML)
        {
            document.getElementById("show").innerHTML =
            '<fieldset>' +
            '<legend>' +
            '<h2>Job Application View</h2>' +
            '</legend>' +
            '<table border="2">' +
            '<tr>' +
            '<th class="col">Name:</th>' +
            '<td class="col">'+i[d].fname+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">DOB:</th>' +
            '<td class="col">'+i[d].dob+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Phone NO:</th>' +
            '<td class="col">'+i[d].phno+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Email ID:</th>' +
            '<td class="col">'+i[d].email+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Address:</th>' +
            '<td class="col">'+i[d].address+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Skills:</th>' +
            '<td class="col">'+i[d].skill+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Year of experience:</th>' +
            '<td class="col">'+i[d].work_year+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Work experience:</th>' +
            '<td class="col">'+i[d].work_exp+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Languages known:</th>' +
            '<td class="col">'+i[d].lk+'</td>' +
            '</tr>' +
            '<tr>' +
            '<th class="col">Expected CTC:</th>' +
            '<td class="col">'+i[d].ctc+'</td>' +
            '</tr>' +
            '</table>' +
            '</fieldset>';
        

        }
    }


    }
var form4 = document.getElementById("hform");
form4.addEventListener("submit", (e) => {
e.preventDefault();});



// function save_js()
// {
//     var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
//     var existingData = JSON.parse(localStorage.getItem("users")) || [];

//   for(let j of sessionData)
//   {
    
//     for(let i of existingData)
//     {
//         if(j.luname===i.uname && j.lpass===i.pass)
//         {
//             i.js.formName = "Java Script Application"
//             i.js.fname = document.getElementById("name").value;
//             i.js.dob = document.getElementById("dob").value;
//             i.js.phno = document.getElementById("phno").value;
//             i.js.email = document.getElementById("email").value;
//             i.js.address = document.getElementById("address").value;
//             i.js.edu = document.getElementById("edu").value;
//             i.js.skill = getSkillValues()
//             i.js.work_year = document.getElementById("work_year").value;
//             i.js.work_exp = document.getElementById("work_exp").value;
//             i.js.lk = getLangValues()
//             i.js.ctc = document.getElementById("ctc").value;     
//         }
//         }
//     }
//     localStorage.setItem("users", JSON.stringify(existingData));
//     window.location.href="app_dash.html"
//     insert()
// }
// function save_qa()
// {
//     var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
//     var existingData = JSON.parse(localStorage.getItem("users")) || [];

//   for(let j of sessionData)
//   {
    
//     for(let i of existingData)
//     {
//         if(j.luname===i.uname && j.lpass===i.pass)
//         {
//             i.qa.formName ="Quality Assurance Application"
//             i.qa.fname = document.getElementById("name").value;
//             i.qa.dob = document.getElementById("dob").value;
//             i.qa.phno = document.getElementById("phno").value;
//             i.qa.email = document.getElementById("email").value;
//             i.qa.address = document.getElementById("address").value;
//             i.qa.edu = document.getElementById("edu").value;
//             i.qa.skill = getSkillValues()
//             i.qa.work_year = document.getElementById("work_year").value;
//             i.qa.work_exp = document.getElementById("work_exp").value;
//             i.qa.lk = getLangValues()
//             i.qa.ctc = document.getElementById("ctc").value;     
//         }
//         }
//     }
//     localStorage.setItem("users", JSON.stringify(existingData));
//     window.location.href="app_dash.html"
//     insert()
// }


// function fetch_js()
// {
//     var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
//     var existingData = JSON.parse(localStorage.getItem("users")) || [];

//     for (let j of sessionData) {
//         for (let data of existingData) {
//             if (j.luname === data.uname && j.lpass === data.pass) {
               
//             if(data.js.fname!=undefined){
//             document.getElementById("name").value = data.js.fname;
//             document.getElementById("dob").value = data.js.dob;
//             document.getElementById("phno").value = data.js.phno;
//             document.getElementById("email").value = data.js.email; 
//             document.getElementById("address").value = data.js.address;
//             document.getElementById("edu").value = data.js.edu;
//             var skillCheckboxes = document.querySelectorAll('input[name="skill"]:checked');
//             var skillCheckboxes = document.querySelectorAll('input[name="skill"]');
//                 skillCheckboxes.forEach(function(checkbox) {
//                     checkbox.checked = data.js.skill.includes(checkbox.value);
//                 });

//             document.getElementById("work_year").value = data.js.work_year;
//             document.getElementById("work_exp").value = data.js.work_exp;
//             var lkCheckboxes = document.querySelectorAll('input[name="lk"]');
//                 lkCheckboxes.forEach(function(checkbox) {
//                     checkbox.checked = data.js.lk.includes(checkbox.value);
//                 });

//             document.getElementById("ctc").value = data.js.ctc; 
//             }
//             }
//         }
//     }
// }

// function fetch_qa()
// {
//     var sessionData = JSON.parse(sessionStorage.getItem("user")) || [];
//     var existingData = JSON.parse(localStorage.getItem("users")) || [];

//     for (let j of sessionData) {
//         for (let data of existingData) {
//             if (j.luname === data.uname && j.lpass === data.pass) {
//                 if(data.qa.fname!=undefined){
            
//             document.getElementById("name").value = data.qa.fname;
//             document.getElementById("dob").value = data.qa.dob;
//             document.getElementById("phno").value = data.qa.phno;
//             document.getElementById("email").value = data.qa.email; 
//             document.getElementById("address").value = data.qa.address;
//             document.getElementById("edu").value = data.qa.edu;
//             var skillCheckboxes = document.querySelectorAll('input[name="skill"]:checked');
//             var skillCheckboxes = document.querySelectorAll('input[name="skill"]');
//                 skillCheckboxes.forEach(function(checkbox) {
//                     checkbox.checked = data.qa.skill.includes(checkbox.value);
//                 });

//             document.getElementById("work_year").value = data.qa.work_year;
//             document.getElementById("work_exp").value = data.qa.work_exp;
//             var lkCheckboxes = document.querySelectorAll('input[name="lk"]');
//                 lkCheckboxes.forEach(function(checkbox) {
//                     checkbox.checked = data.qa.lk.includes(checkbox.value);
//                 });

//             document.getElementById("ctc").value = data.qa.ctc; 
//                 }
//             }
//         }
//     }
// }
