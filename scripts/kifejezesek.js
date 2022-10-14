const kifejezesek = [

  "IoT - Internet of Things - Dolgok Internete",
  "AGV - Automated Guided Vehicle - Automatizált Irányított Jármű",
  "PLC - Programmable Logic Controller - Programozható Logikai Vezérlő",
  "ICT - In-Circuit Test - Áramköri Teszt",
  "MMS - Modular Mechatronics System - Moduláris Mechatronikai Rendszer",
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
  "TCP - Tool Center Point - Szerszámközéppont",
  "IPC - Industrial PC (Personal Computer) - Ipari Számítógép",
  "ISO - International Organization for Standardization - Nemzetközi Szabványügyi Szervezet",
  "FIFO - First In, First Out - Az első termék távozozik először",
  "LIFO - Last In, First Out - Az utolsó termék távozozik először",
  "MES - Manufacturing Execution System - Gyártás-Végrehajtási Rendszer",
  "MCU - Microcontroller Unit - Mikrokontroller (Pl. Atmega - Arduino)",
  "ML - Machine Learning - Gépi Tanulás",
  "SMT - Surface Mount Technology - Felületszerelt (Alkatrész)",
  "THT - Through-Hole Technology - Furatszerelt (Alkatrész)",



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

const kifejezesekRendezett = kifejezesek.sort((a, b) => {
  return a.localeCompare(b, undefined, {sensitivity: 'base'});
});


for(let i=0;i<kifejezesekRendezett.length;i++) {

  let startChar = kifejezesekRendezett[i].substr(0,1);

  let insertIntoThis = document.getElementById(`subList${startChar}`) ? '' : `<div id="subList${startChar}"><h1><u>${startChar.toUpperCase()}</u></h1><ul id="listFor${startChar}"></ul></div>`;

  console.log(insertIntoThis);

  kifejezesLista.innerHTML += insertIntoThis;

}


for(let j=0;j<kifejezesekRendezett.length;j++) {

  let startChar = kifejezesekRendezett[j].substr(0,1);

  let insertIntoThis = document.getElementById(`listFor${startChar}`);

  let text = `<b>${kifejezesekRendezett[j]}`.replace(" ", "</b> ");
  //text = text.replace(" ", "</b> ")

  insertIntoThis.innerHTML += `<li>${text}</li>`;

}
