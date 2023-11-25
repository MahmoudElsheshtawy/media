setupUi()


getUserPost=()=>{
  let id =1
    axios.get(`https://tarmeezacademy.com/api/v1/users/${id}`)
    .then((response)=>{
       let users = response.data.data
       console.log(users)
      
         document.getElementById("Posts-user").innerHTML = ""
         document.getElementById("name").innerHTML =users.username
        //  heder
        document.getElementById("user-email").innerHTML =users.email
        document.getElementById("user-name").innerHTML =users.username
        document.getElementById("user-name").innerHTML =users.name
        // posts
        document.getElementById("user-number-post").innerHTML =users.posts_count
        document.getElementById("user-number-comment").innerHTML =users.comments_count

    

        
      

     
      for(user of users){
     
      let contents =`
      <div class="card">
       <div class="card-header">
       
        <div class="hed shadow-lg mb-2">
         <img id="img-profile" style="width: 40px; height: 40px; object-fit: cover;" class="  m-2 rounded-circle " src="${users.author.profile_image}">
         
         <span>${user.author.username}</span>
       
         </div>
       </div>
       <div class="card-body" onclick="postcliced(${users.id})">
       <img  class="w-100  " src="${user.image}"/>

         <h6>${user.created_at}</h6>
         <h4>${user.author.name}</h4>
         <h5>${user.body}</h5>
         <hr>
         <span>
           <i class="fa-regular fa-comment"></i> comimnts
         </span>
       
       </div>
     </div>
      
      
      
      `
     //  console.log(post.author)
 document.getElementById("Posts-user").innerHTML += contents
      }

    }).catch((err)=>{
        console.log(err)
    })
}
    
 
    
getUserPost()


