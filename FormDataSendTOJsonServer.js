
function Info(givenNome,givenCognome,givendataDiNascita,givenLuogoNascita,givenNumeroTel,
    givenemail,givencap,giveneta,
    givenresidenza,givenNumeroFam,givenIntereFam){
    this.nome=givenNome;
    this.cognome=givenCognome;
    this.dataDiNascita=givendataDiNascita;
    this.luogonascita=givenLuogoNascita;
    this.numerotel=givenNumeroTel;
    this.email=givenemail;
    this.cap=givencap;
    this.eta=giveneta;
    this.residenza=givenresidenza;
    this.numerofam=givenNumeroFam;
    this.interessefam=givenIntereFam;Tag

   
}

//tre variabile globali che ho creati per poi convaildare dei input
let nomeValido=false;
let cognomeValido=false;
let numeroDiTelefonoValido=false;
let emailValido=false;

let nomeInputTag=document.getElementById('nome');
let CognomeInputTag=document.getElementById('cognome');
let numeroTelefonoInputTag=document.getElementById('numeroDiTelefono');
let emailInputTag=document.getElementById('email');


//per convaildare se il nome che il cliente insersci è valido
nomeInputTag.addEventListener('blur',()=>{
  let regx=/^[a-zA-Z]([a-zA-Z]){2,20}$/;
  let stringNomeVer=nomeInputTag.value;
  if(regx.test(stringNomeVer)){
    nomeInputTag.classList.remove("is-invalid");
    nomeValido=true;
    
  }else{
    nomeInputTag.classList.add("is-invalid");
    
  }
})

//per convalidare se il client inserisce il nome valid ovver il nome puo inziare 
//da un lettera minuscolo o maiuscolo per non può inziare con un numero

CognomeInputTag.addEventListener('blur',()=>{
  let regx1=/^[a-zA-Z]([a-zA-Z]){2,20}$/;
  let stringCognome=CognomeInputTag.value;
  if(regx1.test(stringCognome)){
    CognomeInputTag.classList.remove("is-invalid");
    cognomeValido=true;
  }else{
    CognomeInputTag.classList.add("is-invalid");
  }
})





//per convalidare se il client inserisce il numeroDiTelefono giusto

numeroTelefonoInputTag.addEventListener('blur',()=>{
  let regx3=/^([0-9]){10}$/;
  let StringnumeroTelefono=numeroTelefonoInputTag.value;
  if(regx3.test(StringnumeroTelefono)){
    numeroTelefonoInputTag.classList.remove("is-invalid");
    numeroDiTelefonoValido=true;
  }else{
    numeroTelefonoInputTag.classList.add("is-invalid");
  }
})






let submitButtonInfo=document.getElementById('submitButtonInfo');
submitButtonInfo.addEventListener('click',(event)=>{

    event.preventDefault();
    let nomeInput=document.getElementById('nome').value;
    let CognomeInput=document.getElementById('cognome').value;
    let dataDiNascitaInput=document.getElementById('dataDiNascita').value;
    let luogoDiNascitaInput=document.getElementById('luogoDiNascita').value;
    let numeroTelefonoInput=document.getElementById('numeroDiTelefono').value;
    let emailInput=document.getElementById('email').value;
    let capInput=document.getElementById('cap').value;
    let etaInput=document.getElementById('eta').value;
    let ResidenzaInput=document.getElementById('residenza').value;
    let numeroFamInput=document.getElementById('numeroFamiliare').value;
    let InteressiFamInput=document.getElementById('interessiFamiliare').value;
    
    let newObject=new Info(nomeInput,CognomeInput,dataDiNascitaInput,luogoDiNascitaInput,numeroTelefonoInput,
        emailInput,capInput,etaInput,ResidenzaInput,numeroFamInput,InteressiFamInput);
    console.log(newObject);
    console.log(newObject.nome);


    
      if(nomeInput==="" || cognome==="" || dataDiNascitaInput==="" || luogoDiNascitaInput==="" || numeroTelefonoInput==" " || emailInput===""
      ||capInput==="" || emailInput==="" || ResidenzaInput==="" || numeroFamInput==="" || InteressiFamInput===""){
          let messageDiv=document.getElementById('messageDiv');
          let stringMessage=`  <div class="alert alert-danger alert-dismissible" role="alert">
          <span type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></span>
          <strong>Attenzione!</strong> Non puoi Lasciare i campi in bianco.
        </div>`;
         messageDiv.innerHTML=stringMessage;
      }else{
        let url='http://localhost:3000/posts';
        let params={
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify(newObject)
        }
       
       
        fetch(url,params).then((response)=>{
         return response.json();
        }).then((data)=>{
         console.log(data);
         alert('Data Has been sent Succesfully')
        }).catch(()=>console.error("SomeThing went wrong")) 
       
      }
    })

    
let ShowButtonDiv=document.getElementById('ShowButtonInfo');
ShowButtonDiv.addEventListener('click',callGetData);

//function used to call the function getDatafromServer for getting the data from the server
function callGetData(){
  getDatafromServer();
}







let j=1;
function getDatafromServer(){
  if(j===1){
  let url="http://localhost:3000/posts";
  
  //using fetch api to getting the data;
  
  fetch(url).then((response)=>{
    return response.json();
  }).then((data)=>{
    let dataFetched=data;
    console.log(dataFetched)
    console.log(dataFetched.length)
    let stringTable="";
    for(i=0;i<dataFetched.length;i++){
      stringTable=`
      <tr class="table-striped">
              <td>${dataFetched[i].nome}</td>
              <td>${dataFetched[i].cognome}</td>
              <td>${dataFetched[i].DataDiNascita}</td>
              <td>${dataFetched[i].Email}</td>
              <td>${dataFetched[i].LuogoDiNascita}</td>
              <td>${dataFetched[i].NumeroDiTelefono}</td>
              <td>${dataFetched[i].Cap}</td>
              <td>${dataFetched[i].Eta}</td>
              <td>${dataFetched[i].Residenza}</td>
              <td>${dataFetched[i].NumeroFamiliare}</td>
              <td>${dataFetched[i].InteresseFamiliare}</td>
              </tr>
              </table>`;
              
              tableBody=document.getElementById('TableBody');
              tableBody.innerHTML+=stringTable;
            }
})
}else{
  let messageDiv=document.getElementById('messageDiv');
          let stringMessage=`  <div class="alert alert-danger alert-dismissible" role="alert">
          <span type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></span>
          <strong>Attenzione!</strong> Stai gia vedendo i clienti!! Lista finito..
        </div>`;
         messageDiv.innerHTML=stringMessage;
}
j++;
}



//function used to hide the div when the hide button is presed
let HideButtonDiv=document.getElementById('HideButtonInfo');
HideButtonDiv.addEventListener('click',()=>{

  divMainTable=document.getElementById('divTable').style.display="none";

})

let showButtonTabella=document.getElementById('showButtonTabellaInfo');
showButtonTabella.addEventListener('click',()=>{
  divMainTable=document.getElementById('divTable').style.display="block";
})
