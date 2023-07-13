let title = document.getElementById('title') ;
let price = document.getElementById('price') ;
let taxes = document.getElementById('taxes') ;
let ads = document.getElementById('ads') ;
let discount = document.getElementById('discount') ;
let total = document.getElementById('total') ;
let count = document.getElementById('count' ) ;
let category = document.getElementById('category' ) ;
let submit = document.getElementById('submit' ) ;
let tmp ;
let mode = 'create' ;
//console.log(title,price,taxes,ads,discount,total,count,category,submit) ;

function getTotal()
{
  if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value ;
    total.innerHTML = result ;
    total.style.background = "#040" ;
  }else{
    total.innerHTML = '' ;
    total.style.background = "red" ;
  }
}

let dataPro ;

if(localStorage.product != null)
{
  dataPro = JSON.parse(localStorage.product) ;
}else{
  dataPro = [] ;
}


submit.onclick =  () => {

    
    let newPro = {
      title:title.value ,
      price:price.value ,
      taxes:taxes.value ,
      ads:ads.value ,
      discount:discount.value ,
      total:total.innerHTML ,
      count:count.value,
      category:category.value,
      
    }
    if(mode == 'create')
    {
      for(let i = 0 ; i < count.value ; i++)
      {
        dataPro.push(newPro) ;
      }
      
      localStorage.setItem('product', JSON.stringify(dataPro))
      console.log(newPro) ;
    }else{
      dataPro[tmp] = newPro ;
      mode = 'create' ;
      submit.innerHTML = 'Create' ;
      count.style.display = 'block' ;
    }
    

    clearData() ;
    showData() ;
    getTotal()
}

function clearData(){
  title.value = '';
  price.value = '';
  taxes.value ='';
  ads.value ='';
  discount.value ='';
  total.innerHTML ='';
  count.value = '';
  category.value ='';

}


function showData()
{
   
    let table = '' ;
    for(let i = 0 ; i < dataPro.length ; i++)
    {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>


    </tr>

        
        `
    }
    let btnDelete = document.getElementById('deleteAll') ;
    if(dataPro.length > 0)
    {
      btnDelete.innerHTML = `
      <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
      `
    }else
    {
        btnDelete.innerHTML = '' ;
    }

    document.getElementById('tbody').innerHTML = table ;
} 




function deleteData(i)
{
    dataPro.splice(i,1) ;
    localStorage.product = JSON.stringify(dataPro) ;
    showData() ;
}

function deleteAll()
{
  localStorage.clear();
  dataPro.splice(0) ;
  showData() ;
}

showData() ;


function update(i)
{
  
  title.value = dataPro[i].title ;
  price.value = dataPro[i].price ;
  taxes.value = dataPro[i].taxes ;
  ads.value = dataPro[i].ads ;
  discount.value = dataPro[i].discount ;
  category.value = dataPro[i].category ;
  tmp = i ; 
  scroll({
    top:0,
    behavior:"smooth",
  })
  mode = 'update' ;
  count.style.display = 'none' ;
  submit.innerHTML = 'Update' ;
  getTotal() ;
}

let searchMode = 'title' ;

function getSearchMode(id)
{
    let search = document.getElementById('search') ;
  if(id == 'searchTitle')
  {
    searchMode = 'title' ;
    
  }else{
    searchMode = 'catogery' ;
    

  }
  search.placeholder = 'Search by ' + searchMode ;
  search.focus() ;
  search.value = '' ;

  showData() ;

}


function searchData(value)
{
  let table = '' ;
  for(let i = 0 ; i < dataPro.length ; i++)
    {
  if(searchMode == 'title')
  {

    
      if(dataPro[i].title.toLowerCase().includes(value.toLowerCase()))
      {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>


    </tr>

        
        `

        
      }
     

    }



  
  else
  {
    
      if(dataPro[i].category.toLowerCase().includes(value.toLowerCase()))
      {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="update(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>


    </tr>

        
        `

        
      }
     

    

  }
}
  document.getElementById('tbody').innerHTML = table ;
}