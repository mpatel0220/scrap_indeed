  const puppeteer = require("puppeteer");
  const express =require('express')
  const cors=require('cors');

   


const app=express()

app.use(express.urlencoded({extended:true}))

app.use(express.json())
app.use(cors())
app.post('/search',async (req,res)=>{ 
  
  let {item}=req.body;
  console.log(item)
  let data= await getresult(item) 
  
  res.send({data});})

app.listen(8080,()=>{console.log('start server')});


 
 

async function getresult (query)   {
  // Launch the browser
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });

    // Create a page
    const page = await browser.newPage();

    // Go to your indeed site
    await page.goto(
      `https://in.indeed.com/m/jobs?q=${query}&from=searchOnHP&l=`
    );
    
    
    
    const element = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".resultContent"), (e) => ({
        title: e.querySelector("div>h2 a").innerText,
        link: e.querySelector("div>h2 a").href,
        company: e.querySelector("div>span").innerText,
      }))
    );
    await browser.close();
    return (element);
    
     
 
   
  } catch (e) {
    console.log(e);
  }
}



// let btn= document.querySelector('submit');
//  btn.addEventListener('click',()=>{
//   console.log("hi")
//  })