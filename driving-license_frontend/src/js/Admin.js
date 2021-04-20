function signin() {

  
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value
  
      const user = {login,password};
  // console.log(user);
  
    axios.post('http://localhost:3030/Admin/loginAdmin',user)
       .then((res) => {
               if(!res.data.message){ 
  
  
                 localStorage.setItem("token", res.data.token);
                 console.log(res.data.token)
                 localStorage.setItem('id', res.data.id)
                 window.location.href = "dashboardAdmin.html"
         
         } else {
                 const error = document.getElementById('error')
                 error.innerHTML = res.data.error[0]
                 console.log(res.data.error[0])
         }
       })
       .catch((err) => {
       console.log(err)
       })
  }
  
  
   // decoding token
    const token = localStorage.getItem('token')
    
    const Id = localStorage.getItem('id')
    console.log(Id)
  // ------------------------------------------------------------------
  function logOut() {
    localStorage.removeItem('token')
    window.location.href = 'login.html'
  }

// ------------get admin name-------------

let rowAdmin = document.getElementById('nameAdmin');

  axios.get(`http://localhost:3030/Admin`)
 .then((res) => {
    res.data.forEach(element => {
        rowAdmin.innerHTML += `<h3>${element.fullName}</h3>`
});
  }).catch((err) => {
    console.log(err)
    })

// --------------get category from db---------------- 

let rowConducteur = document.getElementById('row');

axios.get('http://localhost:3030/Admin/getAllConducteur')
.then(function (response) {
  
    response.data.forEach(element => {
        rowConducteur.innerHTML += `<tr>
    <td>${element.matricule}</td>
    <td>${element.fullName}</td>
    <td>${element.email}</td>
    <td>${element.telephone}</td>
    <td>${element.adresse}</td>
    <td>${element.numero_de_Permis}</td>
    <td>${element.nombre_de_Point}</td>

    <td>
    <a onclick="update('${element._id}')" href="#editEmployeeModal" class="edit" data-toggle="modal" id="editCatg"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>    
    </td></tr>`
       
    });
    
}).catch(function (err) {
    console.log(err);
});

// ---------------------update category-------------------- 


function update(id){
    axios.get(`http://localhost:3030/Admin/getConducteurById/${id}`)
    .then(function (response) {
    
        let nombre_de_Point = document.getElementById('nombre_de_Point').value = ` ${response.data.nombre_de_Point}`
    
    
    }).catch(function (err) {
        console.log(err);
    });
    
    let updateConducteur= document.getElementById('updateConducteur');
    
    updateConducteur.addEventListener('click', () => {
     
    
        let nombre_de_Point_Updated = document.getElementById('nombre_de_Point').value;
        let infraction = document.getElementById('infraction').value;
        var obj =     {
            nombre_de_Point : nombre_de_Point_Updated,
            infraction:infraction
           }
    
        axios.put(`http://localhost:3030/Admin/updateConducteur/${id}`,obj)
        .then(function (response) {
    
            const myNotification = new Notification('Notification', {
                body: 'updated successfully'
              })
    
                document.getElementById("closeConducteur").click();
                location.reload();
           
        
        }).catch(function (err) {
            console.log(err);  
        
        
    
    })
    });  
    }
