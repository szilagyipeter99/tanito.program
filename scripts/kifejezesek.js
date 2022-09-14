const fruits = [

  "IoT - Internet of Things - Dolgok Internete",
  "AGV - Automated Guided Vehicle - Automatizált Irányított Jármű",
  "PLC - Programmable Logic Controller - Programozható Logikai Vezérlő",
  "ICT - In-Circuit Test - Áramköri Teszt",
  "mMS - Modular Mechatronics System - Moduláris Mechatronikai Rendszer",
  "API - Application Programming Interface - Alkalmazás Programozási Felület",
  "AI - Artificial Intelligence - Mesterséges Intelligencia",
  "AR - Augmented Reality - Kiterjesztett Valóság",
  "VR - Virtual Reality - Virtuális Valóság",
  "UI - User Interface - Felhasználói Felület",
  "RFID - Radio Frequency Identification - Rádiófrekvenciás Azonosítás",
  "R&D - Research and Development - Kutatás-Fejleszés",
  "QMS - Quality Management System - Minőségirányítási Rendszer",
  "PCB - Printed Circuit Board - Nyomtatott Áramkör",
  "I/O - Input / Output - Bemenet/Kimenet",
  "HMI - Human-Machine Interface - Ember-Gép Interfész",
  "CAD - Computer Aided Design - Számítógépes Tervezőprogram",



];

function createElement(element, attribute) {
  var el = document.createElement(element);
  if (typeof(attribute) === 'object') {
    for (var key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }
  if (!Array.isArray(inner)) {
    inner = [inner];
  }
  for (var k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.appendChild(inner[k]);
    } else {
      el.appendChild(document.createTextNode(inner[k]));
    }
  }
  return el;
}


const kifejezesLista = document.getElementById('kifejezesLista');

const fruitsOrdered = fruits.sort((a, b) => {
  return a.localeCompare(b, undefined, {sensitivity: 'base'});
});


for(let i=0;i<fruitsOrdered.length;i++) {

  let startChar = fruitsOrdered[i].substr(0,1);

  let insertIntoThis = document.getElementById(`subList${startChar}`) ? '' : `<div id="subList${startChar}"><h1><u>${startChar.toUpperCase()}</u></h1><ul id="listFor${startChar}"></ul></div>`;

  console.log(insertIntoThis);

  kifejezesLista.innerHTML += insertIntoThis;

}


for(let j=0;j<fruitsOrdered.length;j++) {

  let startChar = fruitsOrdered[j].substr(0,1);

  let insertIntoThis = document.getElementById(`listFor${startChar}`);

  let text = `<b>${fruitsOrdered[j]}`.replace(" ", "</b> ");
  //text = text.replace(" ", "</b> ")

  insertIntoThis.innerHTML += `<li>${text}</li>`;

}
