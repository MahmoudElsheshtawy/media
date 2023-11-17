
setupUi()

// ============= FECHING-DATA-FROM API ============//
getdatabyAxios=(relode = true,page =1)=>{
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
    .then((response)=>{
       let posts = response.data.data
       lastPage =response.data.meta.last_page
       console.log(lastPage)
        if (relode) {
         document.getElementById("Posts").innerHTML = ""

        }
      for(post of posts){
      let content =`
      <div class="card">
       <div class="card-header">
       
        <div class="hed shadow-lg mb-2">
         <img id="img-profile" style="width: 40px; height: 40px; object-fit: cover;" class="  m-2 rounded-circle " src="${post.author.profile_image}">
         
         <span>${post.author.username}</span>
        </div>
         <img  class="w-100  " src="${post.image}"/>
       </div>
       <div class="card-body">
         <h6>${post.created_at}</h6>
         <h4>${post.author.name}</h4>
         <h5>${post.body}</h5>
         <hr>
         <span>
           <i class="fa-regular fa-comment"></i> comimnts
         </span>
       
       </div>
     </div>
      
      
      
      `
     //  console.log(post.author)
    let img = document.getElementById("Posts").innerHTML += content
      }

    }).catch((err)=>{
        console.log(err)
    })
}
getdatabyAxios()

// ============= FECHING-DATA-FROM API ============//

// ============= LOGIN-BTN ============//
document.getElementById("btn").addEventListener("click",function(){
     
    let username= document.getElementById("gmail-id").value
    let password= document.getElementById("password-id").value
  
    let userInfo =document.getElementById("name-user").innerHTML =username
     var body = {
     "username": username,
     "password": password,
       }

     axios({
         method: 'post',
         url: 'https://tarmeezacademy.com/api/v1/login',
         data: body
         
     })
     .then(function (response) {
         console.log(response.data.token);
         let token =response.data.token
         localStorage.setItem("token" ,token)
         localStorage.setItem("user" ,JSON.stringify(response.data.user))
         localStorage.setItem("userInfo",userInfo)
       
         const modal = document.getElementById("login-modal")
         const modleinstance = bootstrap.Modal.getInstance(modal)
   
         modleinstance.hide()
       
        
         showalert("تم تسجسل الدخول بنجاح")
      
       setupUi()
       

     })
     .catch(function (error) {
       showalert(error.response.data.message,"danger");
         console.log(error.response)
     });

  

})
// ============= LOGIN-BTN ============//

// ============= REGISTER-PAGE ============//
document.getElementById("btn-register").addEventListener("click",function(){
    let name= document.getElementById("name-id").value
    let username= document.getElementById("register-gmail-id").value
    let password= document.getElementById("register-password-id").value
    let image=document.getElementById("register-img").files[0]

    let formData =new FormData()
   formData.append("name", name)
   formData.append( "username" ,username)
   formData.append("password",password)
   formData.append("image",image)

 
   const headers ={
         "Content-Type":"multipart/form-data"
       }
   axios.post('https://tarmeezacademy.com/api/v1/register',formData,{
     headers:headers
   })
 
     .then(function (response) {
         console.log(response.data.user.profile_image);
         let token =response.data.token
         localStorage.setItem("token" ,token)
         localStorage.setItem("user" ,JSON.stringify(response.data.user))
       
       // hide modle 
         const modal = document.getElementById("register-modal")
         const modleinstance = bootstrap.Modal.getInstance(modal)
         modleinstance.hide()
     
       showalert("تم انشاء حساب جديد بنجاح") 
       setupUi()
       

     })
     .catch(function (error) {
         showalert(error.response.data.message,"danger")
     });

  

})
// ============= REGISTER-PAGE ============//

// ============= SETAP-UI ============//
function setupUi() {
    const token = localStorage.getItem("token")
    const logout_Div =document.getElementById("logoutDiv")
    const login_Div =document.getElementById("loginDiv")
    const nameuser =document.getElementById("name-user")
    const imguser =document.getElementById("img-user")
    const blus =document.getElementById("blus")
   
   if(token == null){ //not logd in
   login_Div.style.setProperty("display", "flex", "important")
     logout_Div.style.setProperty("display", "none", "important")
     blus.style.setProperty("display", "none", "important")
   
     
   }else{
     login_Div.style.setProperty("display", "none", "important")
     logout_Div.style.setProperty("display", "flex", "important")
     blus.style.setProperty("display", "flex", "important")
   
   
   const user =getCurrentuser()
   
     document.getElementById("name-user").innerHTML =user.username
     document.getElementById("img-user").src=user.profile_image
   
   }
   }
// ============= SETAP-UI ============//

// ============= ALARTE-MESSAGE ============//
function showalert(message,type="success"){
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }
   alert(message,type)
    
      setTimeout(()=>{
        const alertt = bootstrap.Alert.getOrCreateInstance('#liveAlertPlaceholder')
        // alertt.close()
      },2000)
    
  }
// ============= ALARTE-MESSAGE ============//

// ============= LOGE-OUT ============//
function logoud(type){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showalert("تم تسجيل خروج بنجاح")
    setupUi()
  location.reload()
  }
// ============= LOGE-OUT ============//



