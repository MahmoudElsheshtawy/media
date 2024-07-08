

// const { Alert } = require("bootstrap")

// ============= FECHING-DATA-FROM API ============//
getdatabyAxios=(relode = true,page =1)=>{
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${page}`)
    .then((response)=>{
       let posts = response.data.data
       lastPage =response.data.meta.last_page
       console.log(posts)
        if (relode) {
         document.getElementById("Posts").innerHTML = ""

        }
      for(post of posts){
        let user = getCurrentuser()
        let ismyPost =user !=null && post.author.id == user.id
        let buttoncontent =``
        let deletebtn =``
        if(ismyPost){
        
        buttoncontent = ` <button onclick="editonclick('${encodeURIComponent(JSON.stringify(post))}')" class="btn btn-primary float-end" style=" margin : 7px;">edit</button>`
        deletebtn = ` <button onclick="deleteonclick('${encodeURIComponent(JSON.stringify(post))}')" class="btn btn-danger float-end" style=" margin : 7px;">delet</button>`


        }
      let content =`
      <div class="card">
       <div class="card-header">
      

       <div class="hed d-flex justify-content-between shadow-lg mb-2">
       <div style="cursor: pointer;" onclick="handleProfilePage(${post.author.id})">
       <img id="img-profile" style="width: 40px; height: 40px; object-fit: cover;" class="  m-2 rounded-circle " src="${post.author.profile_image}">
         
       <span>${post.author.username}</span>
       </div>
        <div>
        ${buttoncontent}
        ${deletebtn}</div>
         </div>


     
  
       </div>
       <div class="card-body" onclick="postcliced(${post.id})">
       <img  class="immg w-100  " src="${post.image}"/>

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
    // const addpost = document.getElementById("add_post")
   
   if(token == null){ //not logd in
    if (blus != null) {
      blus.style.setProperty("display", "none", "important")
    }
   login_Div.style.setProperty("display", "flex", "important")
     logout_Div.style.setProperty("display", "none", "important")
    //  addpost.style.setProperty("display", "none", "important")

   
     
   }else{
    if (blus != null) {
     blus.style.setProperty("display", "flex", "important")
      
    }
     login_Div.style.setProperty("display", "none", "important")
     logout_Div.style.setProperty("display", "flex", "important")
    //  addpost.style.setProperty("display", "flex", "important")
    
   
   
   const user =getCurrentuser()
   
     document.getElementById("name-user").innerHTML =user.username
     document.getElementById("img-user").src=user.profile_image
   
   }
   }
setupUi()

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

// ============= CURRNT-USER ============//
function getCurrentuser(){
  let user =null
   const storageUser =localStorage.getItem("user")
   if(storageUser != null){
    user = JSON.parse(storageUser)
   }

return user

}
// ============= CURRNT-USER ============//



const postcliced=(postid)=>{

window.location =`Postditels.html?postid=${postid}`
  // alert(postid)
}
// ==============editonclick =============//
const editonclick =(postobject)=>{
 let post= JSON.parse(decodeURIComponent(postobject))
 console.log(post)



 document.getElementById("post-edit-id").value = post.id
 document.getElementById("think-edit-post").innerHTML = "update"

  document.getElementById("post-modle-title").innerHTML = "edit post"
  document.getElementById("text-post").value = post.body
  document.getElementById("title-post").value = post.title
 
postModle = new bootstrap.Modal(document.getElementById("think"),{})
postModle.toggle()
}
// ==============editonclick =============//



const handleaddpost=()=>{
  // let post= JSON.parse(decodeURIComponent(postobject))
  // console.log(post)
 
 
 
  document.getElementById("post-edit-id").value = ""
  document.getElementById("think-edit-post").innerHTML = "Create"
 
   document.getElementById("post-modle-title").innerHTML = "Create Your Post"
   document.getElementById("text-post").value =""
   document.getElementById("title-post").value = ""
  
 postModle = new bootstrap.Modal(document.getElementById("think"),{})
 postModle.toggle()



}



function deleteonclick(postobject){

  let post= JSON.parse(decodeURIComponent(postobject))
  console.log(post)
 
  document.getElementById("delete-post-id-input").value =post.id


  
 postModle = new bootstrap.Modal(document.getElementById("delate-modle"),{})
 postModle.toggle()

}

// delete 
let deletePost=(id)=> {
  const postId = document.getElementById("delete-post-id-input").value 
  let token = localStorage.getItem("token");
  const headers ={
    "authorization":`Bearer ${token}`
  }

    
  // alert(postId)
axios.delete(`https://tarmeezacademy.com/api/v1/posts/${postId}`,{
  headers:headers
}).then((res)=>{
  // console.log(id)
  // showalert("تم الحذف بنجاح")
 
  const modal = document.getElementById("delate-modle")
  const modleinstance = bootstrap.Modal.getInstance(modal)
  modleinstance.hide()
 location.reload()
showalert("تم حذف المنشور  بنجاح") 

console.log(res)
}) .catch(function (error) {
  showalert(error.response.data.message,"danger");
    console.log(error.response)
})


}
// 
function addpost(){ 
  let postId =document.getElementById("post-edit-id").value
  let iscreate =postId ==null ||postId ==""


  let Title= document.getElementById("title-post").value
  let textarea= document.getElementById("text-post").value
  let img= document.getElementById("img-post").files[0]

//  createing form data
 let formData =new FormData()
 formData.append("title", Title)
 formData.append( "body" ,textarea)
 formData.append("image",img)


     let token = localStorage.getItem("token");
     const headers ={
       "authorization":`Bearer ${token}`
     }

if (iscreate) {
 axios.post(('https://tarmeezacademy.com/api/v1/posts'),formData,{
      
      headers:headers
    
  })

   .then(function (response) {
       console.log(response);

       const modal = document.getElementById("think")
       const modleinstance = bootstrap.Modal.getInstance(modal)
       modleinstance.hide()
       showalert("تم انشاء المنشور بنجاح")
   // location.reload()
   getdatabyAxios()
   })
   .catch(function (error) {
     showalert(error.response.data.message,"danger");
       console.log(error.response.data.message)
   });

}else{
 formData.append("_method" ,"put")
 axios.post((`https://tarmeezacademy.com/api/v1/posts/${postId}`),formData,{
      
      headers:headers
    
  })

   .then(function (response) {
       console.log(response);

       const modal = document.getElementById("think")
       const modleinstance = bootstrap.Modal.getInstance(modal)
       modleinstance.hide()
       showalert("تم انشاء المنشور بنجاح")
   location.reload()

   })
   .catch(function (error) {
     showalert(error.response.data.message,"danger");
       console.log(error.response.data.message)
   });

}




}
// 
const handleProfilePage= (userId)=>{
//  alert(userid)

window.location = `ProfilePage.html?userid=${userId}`

}
const myprofilepage =()=>{
  let user = getCurrentuser()
  const userId =user.id
window.location = `ProfilePage.html?userid=${userId}`
  
}