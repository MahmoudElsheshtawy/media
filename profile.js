
setupUi()

// logoud()
// 
function getuserId(){
  const urlParams = new URLSearchParams(window.location.search)
  const id =urlParams.get("userid")
  return id
}
getUserPost=()=>{
let id = getuserId()
// alert(id)
// return
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then((response)=>{
       let users = response.data.data
       console.log(users)
      
         document.getElementById("name").innerHTML =users.username
        //  heder
        document.getElementById("user-email").innerHTML =users.email
        document.getElementById("user-name").innerHTML =users.username
        document.getElementById("user-age").innerHTML =users.name
        // posts
        document.getElementById("user-number-post").innerHTML =users.posts_count
        document.getElementById("user-number-comment").innerHTML =users.comments_count
        document.getElementById("user-img").src =users.profile_image

      }).catch((err)=>{
            console.log(err)
        })
}
getUserPost()


getpostuserPage=()=>{
  
let id = getuserId()
  axios.get(`https://tarmeezacademy.com/api/v1/users/${id}/posts`)
  .then((response)=>{
     let posts = response.data.data
    
   
      // if (relode) {
                document.getElementById("oooo").innerHTML = ""


      // }
    for(post of posts){

      console.log(post)
      let user = getCurrentuser()
      let ismyPost =user !=null && post.author.id == user.id
      let buttoncontent =``
      let deletebtn =``
      if(ismyPost){
      
      buttoncontent = ` <button onclick="editonclick('${encodeURIComponent(JSON.stringify(post))}')" class="btn btn-primary float-end" style=" margin : 7px;">edit</button>`
      deletebtn = ` <button onclick="deleteonclick('${encodeURIComponent(JSON.stringify(post))}')" class="btn btn-danger float-end" style=" margin : 7px;">delet</button>`


      }
    let contents =`
    <div class="card">
     <div class="card-header">
     
      <div class="hed d-flex justify-content-between shadow-lg mb-2">
     <div style="cursor: pointer;">
     <img id="img-profile" style="width: 40px; height: 40px; object-fit: cover;" class="  m-2 rounded-circle " src="${post.author.profile_image}">
       
     <span>${post.author.username}</span>
     </div>
      <div>
      ${buttoncontent}
      ${deletebtn}</div>
       </div>
     </div>

     <div class="card-body" onclick="postcliced(${post.id})">
     <img  class="w-100  " src="${post.image}"/>

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
 document.getElementById("oooo").innerHTML += contents
    }

  }).catch((err)=>{
      console.log(err)
  })
}
getpostuserPage()
// rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
