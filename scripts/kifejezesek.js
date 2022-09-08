const fruits = [

  "IoT = Internet of Things (Dolgok Internete)",
  "AGV = Automated Guided Vehicle (Automatizált Irányított Jármű)",
  "PLC = Programmable Logic Controller (Programozható Logikai Vezérlő)",
  "ICT = In-Circuit Test (Áramköri Teszt)",
  "mMS = Modular Mechatronics System (Moduláris Mechatronikai Rendszer)",
  "API = Application Programmable Interface (Alkalmazás Programozási Felület)",
  "AI = Artificial Intelligence (Mesterséges Intelligencia)",
  "AR = Augmented Reality (Kiterjesztett Valóság)",
  "VR = Virtual Reality (Virtuális Valóság)",
  "UI = User Interface (Felhasználói Felület)",
  "RFID = Radio Frequency Identification (Rádiófrekvenciás Azonosítás)",
  "R&D = Research and Development (Kutatás-Fejleszés)",
  "QMS = Quality Management System (Minőségirányítási Rendszer)",
  "PCB = Printed Circuit Board (Nyomtatott Áramkör)",
  "I/O = Input / Output (Bemenet/Kimenet)",
  "HMI = Human-Machine Interface (Ember-Gép Interfész)",
  "CAD = Computer Aided Design (Számítógépes Tervezőprogram)"


];


const fruitsOrdered = fruits.sort();


for(let i=0;i<fruitsOrdered.length;i++) {
  let text = `<b>${fruitsOrdered[i]}`;
  text = text.replace(" ", "</b> ")
  console.log(text);
  document.getElementById("kifejezesLista").innerHTML += `<li>${text}</li>`;

}
