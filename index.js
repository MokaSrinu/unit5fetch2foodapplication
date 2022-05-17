let mealsdata;
if(localStorage.getItem("mealsdata")===null){
   fetchdata();
}else{
    mealsdata=JSON.parse(localStorage.getItem("mealsdata"));
}

async function fetchdata(){
    try {
        let url=`https://www.themealdb.com/api/json/v1/1/categories.php`
        let response=await fetch(url);
        let res=await response.json();
        let data=res.categories;
        //console.log(data);
        let meals=[];
        data.forEach((ele)=>{
          //console.log(ele.strCategory)
          meals.push(ele.strCategory)
        })
        console.log(meals);
        localStorage.setItem("mealsdata",JSON.stringify(meals));
    } catch (error) {
        console.log(error);
    }
}

function appendselectbutton(){
    let mealstype=document.createElement("select");
    mealsdata.forEach((ele)=>{
       let option=document.createElement("option");
       option.innerHTML=ele;
       option.value=ele;
       mealstype.append(option);
    })
    document.querySelector("#container").append(mealstype);
}
appendselectbutton();


async function fetchdatabycategory(type){
    try {
        let url=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`
        let response=await fetch(url);
        let res=await response.json();
        let data=res.meals;
        console.log(res);
        console.log(data);
        displaydata(data);
        
    } catch (error) {
        console.log(error);
    }
}
document.querySelector("select").addEventListener("change",()=>{
    let type=document.querySelector("select").value;
    fetchdatabycategory(type);
})


function displaydata(data){
    document.querySelector("#container2").innerHTML="";
    data.forEach((ele)=>{
      let{strMeal,strMealThumb,idMeal}=ele;
      let card=document.createElement("div");
      card.setAttribute("id","divelement");
      let image=document.createElement("img");
      image.src=strMealThumb;
      let mealname=document.createElement("p");
      mealname.innerText=`Meal:${strMeal}`;
      let mealid=document.createElement("p");
      mealid.innerText=`MealID:${idMeal}`;
      card.append(image,mealname,mealid);
      document.querySelector("#container2").append(card);
      //console.log(card);
    })
}