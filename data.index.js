 

let loading = false;

function setLoadingIndicator(loading) {
  let container = document.querySelector("#container");
  if (loading) {
    container.innerHTML = "Loading...PLEASE WAIT FOR A WHILE";
    // or show a loader animation here
  } else {
    container.innerHTML = "";
  }
}

 
 


function display(data){
    let container=document.querySelector("#container");
    container.innerHTML=""
   
    data.forEach(element => { 
    let div=document.createElement('div');    
    let p=document.createElement("p");
    p.innerText=element.title

    let btn=document.createElement('button');
    btn.innerText="Apply here";
    btn.setAttribute("class", "btn");

    let a=document.createElement('a');
    a.target="_blank";
    a.href=element.link;
    
    a.append(btn)
     let company=document.createElement("p");
    company.innerText=element.company
   div.append(p,company,a)
    container.append(div)
    });
   
   }


let btn=document.querySelector("#submit");
btn.addEventListener('click', ()=>{

 let value= document.querySelector("#search").value
 if(!value){
    alert("provide input");
    return
 }
 console.log(value,"S")
 setLoadingIndicator(true);
 fetch('https://scrap-aolx.onrender.com/search', {
    method: 'POST',
    body: JSON.stringify({item:value }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
        return response.json();
  }).then((res)=>{
      setLoadingIndicator(false);
    display(res.data)
  })
   
loading=false
})


   