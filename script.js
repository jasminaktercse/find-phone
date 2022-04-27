//CLear Data
const clearData = resultId => {
    const result = document.getElementById(resultId);
    result.textContent = '';  
  }

//Messages
const messages = (isCheck) => {
    const result = document.getElementById('message');
    if(isCheck == true){
    result.textContent = ''; 
    } else{
        result.textContent = 'Product Not Found';
    }
  }
 
//Phone find
   const findPhone = () =>{ 
    const findField = document.getElementById('find-field');
    const findText = findField.value;  

    if(findText == ''){
        clearData('find-result');
        clearData('phone-details');
        messages(false);
    }else{
    const url = `https://openapi.programming-hero.com/api/phones?search=${findText}`
 
    //Load Data
    fetch (url)
    .then(res => res.json())
    .then(data => displayFindResult(data.data)) 
    }
}

//Phone Show
const displayFindResult = phones => {
    
    const findResult = document.getElementById('find-result'); 
    findResult.textContent = ''; 
    const phoneCount = phones.length;
    if( phoneCount == 0){
        messages(false);
    }else{ 
        messages(true);
        clearData('phone-details')
        let count = 0;
        phones.forEach(phone => { 
        count=count+1;
           
     if(count <= 20){
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card p-5 shadow-lg text-center h-100 " >
                <img src="${phone.image}" class="card-img-top" alt="..." height="350px">
                <div class="card-body">
                <h5 class="card-title"> ${phone.phone_name}</h5>
                <p class="card-text">${phone.brand} </p>
                <button  class="btn btn-primary px-5"  onclick="loadPhoneDetail('${phone.slug}')" >Details</button>
                </div>
            </div> 
                      `
                      
            findResult.appendChild(div); 
     } 
     

    }); 

     

}
}




 
//Detailse Url Load 
const loadPhoneDetail = phoneSlug => { 
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    //Load Data
    fetch(url)
    .then(res => res.json())
    .then(phonedata => displayPhoneDetail(phonedata.data)); 
}





//Show all Detailse
const displayPhoneDetail = phone => {  
    const phoneDeatils = document.getElementById('phone-details'); 
    phoneDeatils.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    const sensors = phone.mainFeatures.sensors; 
     
    div.innerHTML = `
                  
            <div class="card shadow " >
                <div class="row g-0">
                    
                    <div class="col-md-5 d-flex">
                      <img src="${phone.image}" class="img-fluid rounded-start m-5" alt="...">
                    </div>

                    <div class="col-md-7">
                            <div class="card-body">
                            
                                <h3 class="card-title " >${phone.name}</h3> 
                                ${ 
                               `${phone.releaseDate == '' ? 
                                ` <p class="card-text text-muted border-bottom">release date not found</p> `: 
                                 ` <p class="card-text text-muted border-bottom">${phone.releaseDate}</p>
                                `}`
                                }
                                
                                <p class="card-text border-bottom"><strong>Brand :</strong>${phone.brand}</p>

                            <h5 class="border-bottom">MainFeatures:</h5>
                                <ul>
                                    <li ><strong> ChipSet:</strong>${phone.mainFeatures.chipSet} </li>
                                    <li><strong> DisplaySize: </strong> ${phone.mainFeatures.displaySize} </li>
                                    <li><strong>Memory:</strong> ${phone.mainFeatures.memory}</li>
                                    <li><strong>Sensors</strong>
                                        
                                        <ul>
                                        ${sensors.map(sensor => `<li>${sensor}</li>`).join('\n')}
                                        </ul> 
                                    </li>
                                    <li><strong>Storage:</strong> "128GB/256GB/1TB storage, no card slot"</li> 
                                </ul> 
                               
                                
                                
                                ${ `${phone.others == undefined ?  `   `:  ` 
                                    <h5 class="border-bottom">Others:</h5>  
                                <ol> 
                                    <li><strong>Bluetooth:</strong> ${phone.others.Bluetooth}</li>
                                    <li><strong>GPS:</strong> ${phone.others.GPS}</li>
                                    <li><strong>NFC:</strong> ${phone.others.NFC}</li>
                                    <li><strong>Radio:</strong> ${phone.others.Radio}</li>
                                    <li><strong>USB:</strong> ${phone.others.USB}</li>
                                    <li><strong>WLAN:</strong> ${phone.others.WLAN}</li>
                                
                                </ol> 
                       
                                `}` } 
                                    
                                 
                            
                            
                            </div>
                        </div>
                </div>
            </div>
    `
    phoneDeatils.appendChild(div);



    
}
 
 