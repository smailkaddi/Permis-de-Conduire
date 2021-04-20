// ------------------------------Register----------------------------
function register() {

    const matricule = document.getElementById('matricule').value
    const fullName = document.getElementById('fullName').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const telephone = document.getElementById('telephone').value
    const adresse = document.getElementById('adresse').value
    const numero_de_Permis = document.getElementById('numero_de_Permis').value

  
      const user = {adresse,password,matricule,fullName,email,telephone,numero_de_Permis};
  // console.log(user);
  
    axios.post('http://localhost:3030/Conducteur/authentication',user)
       .then((res) => {
            if(res.data.message){
                   return false        
         } else {
            window.location.href = "loginConducteur.html"
         }
       })
       .catch((err) => {
       console.log(err)
       })
  }
// -------------------------------login----------------------------------
function SignInConducteur() {

  
    const matricule = document.getElementById('login').value
    const password = document.getElementById('password').value
  
      const user = {matricule,password};
  // console.log(user);
  
    axios.post('http://localhost:3030/Conducteur/loginConducteur',user)
       .then((res) => {
               if(!res.data.message){ 
  
  
                 localStorage.setItem("token", res.data.token);
                 console.log(res.data.token)
                 localStorage.setItem('id', res.data._id)
                 console.log(res.data._id);
                 window.location.href = "dashboardConducteur.html"
         
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
//   -------------------------get name condactor--------------
  let rowConducteur = document.getElementById('name');
  let idcondactor= localStorage.getItem('id');
  let rowConducteur2 = document.getElementById('row2');
  axios.get(`http://localhost:3030/Admin/getConducteurById/${idcondactor}`)

  .then((res) => {

          rowConducteur.innerHTML += `<h3>${res.data.fullName}</h3>`
       
          rowConducteur2.innerHTML +=`<tr>
          <td>${res.data.matricule}</td>
          <td>${res.data.fullName}</td>
          <td>${res.data.email}</td>
          <td>${res.data.telephone}</td>
          <td>${res.data.adresse}</td>
          <td>${res.data.numero_de_Permis}</td>
          <td>${res.data.nombre_de_Point}</td>
          <td>${res.data.infraction}</td>
        </tr>`
           
     
        

  }).catch((err) => {
    console.log(err)
    })

  // -----------------------------logOut-------------------------------------
  function logOut() {
    localStorage.removeItem('token')
    window.location.href = 'loginConducteur.html'
  }


