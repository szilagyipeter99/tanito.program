const gateWidth = 240;
const gateHeight = 160;
const pointerRadius = 8;


let declareText = '';
let setupText = '';
let loopText = '';


document.getElementById("newBlock").addEventListener("click", addNewBlock);
document.getElementById("newLine").addEventListener("click", addNewLine);
const buttonArray = document.getElementById("gateButtons").querySelectorAll("button");

for (let h = 1; h < buttonArray.length; h++) {
  buttonArray[h].disabled = true;
}

function addNewBlock() {
  let rows = document.querySelectorAll(".plc-network-row");
  let pointers = document.querySelector(".pointers");
  if (rows[0].childElementCount == 0) {
    pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" id="ff" style="left:${pointerRadius}px;top:${2}px;" class="pointer-body"></span>`);
  } else {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].childElementCount; j++) {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" id="${i}${j+1}" style="left:${gateWidth*(j+1) - pointerRadius}px;top:${gateHeight/2 + (i*gateHeight) - pointerRadius}px;" class="pointer-body"></span>`);
      }
      pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" id="${i}f" style="left:${-pointerRadius}px;top:${gateHeight/2 + (i*gateHeight) - pointerRadius}px;" class="pointer-body"></span>`);
      pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" id="${i}0" style="left:${gateWidth/2 - pointerRadius}px;top:${gateHeight*(i+1) - pointerRadius}px;" class="pointer-body"></span>`);
    }
  }
}

function makeActive(e) {
  let activeNow = document.querySelector(".pointer-body.active") || undefined;
  if (activeNow) {
    activeNow.classList.toggle("active");
  }
  buttonArray[0].disabled = true;
  for (let h = 1; h < buttonArray.length; h++) {
    buttonArray[h].disabled = false;
  }
  e.classList.toggle("active");
}

function addBlock(blockname, inputs, outputs) {
  let activePointer = document.querySelector(".pointer-body.active");
  let rowIndex = activePointer.id.charAt(0);
  let colIndex = activePointer.id.charAt(1);
  let labelStr = '<p><input type="text" value=""></p>';
  let bodyInputStr = '<div class="plc-gate-body-input"></div>';
  let bodyOutputStr = '<div class="plc-gate-body-output"></div>';
  let gateText = `<div class="plc-gate plc-gate-${inputs}-${outputs}"><div class="plc-gate-container"><div class="plc-gate-input-labels">
  ${labelStr.repeat(inputs)}</div><div class="plc-gate-body">${bodyInputStr.repeat(inputs)}
    <div class="plc-gate-body-rect">${blockname}</div>${bodyOutputStr.repeat(outputs)}</div>
    <div class="plc-gate-output-labels">${labelStr.repeat(outputs)}</div></div></div>`;
  let rows = document.querySelectorAll(".plc-network-row");
  if (rowIndex == 'f') {
    rows[0].insertAdjacentHTML('beforeend', `${gateText}`);
  } else if (colIndex == 0) {
    rows[rowIndex].insertAdjacentHTML('afterend', `<div class="plc-network-row">${gateText}</div>`);
  } else if (colIndex == 'f') {
    let afterThisGate = rows[rowIndex].querySelector(`.plc-gate:nth-child(${1})`);
    afterThisGate.insertAdjacentHTML('beforebegin', gateText);
  } else {
    let afterThisGate = rows[rowIndex].querySelector(`.plc-gate:nth-child(${colIndex})`);
    afterThisGate.insertAdjacentHTML('afterend', gateText);
  }
  buttonArray[0].disabled = false;
  for (let h = 1; h < buttonArray.length; h++) {
    buttonArray[h].disabled = true;
  }
  document.querySelectorAll('.pointer-body').forEach(pointer => pointer.remove());
}

function cancelPointers() {
  document.querySelectorAll('.pointer-body').forEach(pointer => pointer.remove());
}

function addNewLine() {
  let rows = document.querySelectorAll(".plc-network-row");
  let pointers = document.querySelector(".pointers");
  for (let i = 0; i < rows.length; i++) {
    let childrenArray = rows[i].querySelectorAll('.plc-gate');
    for (let j = 0; j < rows[i].childElementCount; j++) {
      if (childrenArray[j].classList[1] == 'plc-gate-1-1') {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}i11" style="left:${j*gateWidth + 60-2*pointerRadius}px;top:${i*gateHeight + 80-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}o111" style="left:${j*gateWidth + 180}px;top:${i*gateHeight + 80-pointerRadius}px;" class="pointer-body"></span>`);
      } else if (childrenArray[j].classList[1] == 'plc-gate-2-1') {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}i21" style="left:${j*gateWidth + 60-2*pointerRadius}px;top:${i*gateHeight + 50-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}i22" style="left:${j*gateWidth + 60-2*pointerRadius}px;top:${i*gateHeight + 110-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}o112" style="left:${j*gateWidth + 180}px;top:${i*gateHeight + 80-pointerRadius}px;" class="pointer-body"></span>`);
      } else if (childrenArray[j].classList[1] == 'plc-gate-1-2') {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}i11" style="left:${j*gateWidth + 60-2*pointerRadius}px;top:${i*gateHeight + 80-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}o211" style="left:${j*gateWidth + 180}px;top:${i*gateHeight + 50-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}o221" style="left:${j*gateWidth + 180}px;top:${i*gateHeight + 110-pointerRadius}px;" class="pointer-body"></span>`);
      } else if (childrenArray[j].classList[1] == 'plc-gate-2-2') {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}i21" style="left:${j*gateWidth + 60-2*pointerRadius}px;top:${i*gateHeight + 50-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}i22" style="left:${j*gateWidth + 60-2*pointerRadius}px;top:${i*gateHeight + 110-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}o212" style="left:${j*gateWidth + 180}px;top:${i*gateHeight + 50-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" id="${i}${j}o222" style="left:${j*gateWidth + 180}px;top:${i*gateHeight + 110-pointerRadius}px;" class="pointer-body"></span>`);
      }
    }
  }
}


let step = 0;
let firstPointerID;
let secondPointerID;

function makeTheLine(e) {
  if (step == 0 && e.id.charAt(2) === 'o') {
    e.classList.toggle("active");
    firstPointerID = e.id;
    step = 1;
  } else if (step == 1 && e.id.charAt(2) === 'i') {
    secondPointerID = e.id;
    step = 0;
    let linesContainer = document.querySelector(".lines svg");
    let startFromThisMany = firstPointerID.charAt(3);
    let startThisIndex = firstPointerID.charAt(4);
    let startX = firstPointerID.charAt(1) * gateWidth + 180;
    let startY = firstPointerID.charAt(0) * gateHeight + (120 / startFromThisMany) / 2 + 60 * (startThisIndex - 1) + 20;
    let endFromThisMany = secondPointerID.charAt(3);
    let endThisIndex = secondPointerID.charAt(4);
    let endX = secondPointerID.charAt(1) * gateWidth + 60;
    let endY = secondPointerID.charAt(0) * gateHeight + (120 / endFromThisMany) / 2 + 60 * (endThisIndex - 1) + 20;
    linesContainer.insertAdjacentHTML('beforeend', `<path id="${firstPointerID}&${secondPointerID}" d="M ${startX} ${startY} C ${(endX+startX)/2} ${startY}, ${(endX+startX)/2} ${endY}, ${endX} ${endY}" />`)
    document.querySelectorAll('.pointer-body').forEach(pointer => pointer.remove());
  }

}



function scan() {

  declareText = '';
  setupText = '';
  loopText = '';

  getVariables();

  const rows = document.querySelectorAll(".plc-network-row");
  const paths = document.querySelectorAll("path");
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].childElementCount; j++) {
      let gateName = rows[i].querySelectorAll(".plc-gate")[j].querySelector(".plc-gate-body-rect").innerHTML;
      let inputLabels = rows[i].querySelectorAll(".plc-gate")[j].querySelectorAll(".plc-gate-input-labels input");
      let outputLabels = rows[i].querySelectorAll(".plc-gate")[j].querySelectorAll(".plc-gate-output-labels input");
      let inputValues = []
      let outputValues = [];
      for (let l = 0; l < inputLabels.length; l++) {
        inputValues[l] = inputLabels[l].value;
      }
      for (let m = 0; m < outputLabels.length; m++) {
        outputValues[m] = outputLabels[m].value;
      }
      //console.log(gateName, i, j, inputValues[0], outputValues);

      if (inputValues.length == 1 && outputValues.length == 1) {
        createGateCode(gateName, (inputValues[0] == '') ? `v${i}${j}1` : inputValues[0], (outputValues[0] == '') ? `v${i}${j}2` : outputValues[0]);
      } else if (inputValues.length == 2 && outputValues.length == 1) {
        createGateCode(gateName, (inputValues[0] == '') ? `v${i}${j}1` : inputValues[0], (outputValues[0] == '') ? `v${i}${j}3` : outputValues[0], (inputValues[1] == '') ? `v${i}${j}2` : inputValues[1]);
      } else if (inputValues.length == 1 && outputValues.length == 2) {
        createGateCode(gateName, (inputValues[0] == '') ? `v${i}${j}1` : inputValues[0], (outputValues[0] == '') ? `v${i}${j}2` : outputValues[0], null, (outputValues[1] == '') ? `v${i}${j}3` : outputValues[1]);
      } else if (inputValues.length == 2 && outputValues.length == 2) {
        createGateCode(gateName, (inputValues[0] == '') ? `v${i}${j}1` : inputValues[0], (outputValues[0] == '') ? `v${i}${j}3` : outputValues[0], (inputValues[1] == '') ? `v${i}${j}2` : inputValues[1], (outputValues[1] == '') ? `v${i}${j}4` : outputValues[1]);
      }


    }
  }
  for (let k = 0; k < paths.length; k++) {
    let ids = paths[k].id.split("&");
    let pathStartVar = `v${ids[0].charAt(0)}${ids[0].charAt(1)}${parseInt(ids[0].charAt(4))+parseInt(ids[0].charAt(5))}`;
    let pathFinishVar = `v${ids[1].charAt(0)}${ids[1].charAt(1)}${ids[1].charAt(4)}`;
    //console.log(ids[0], ids[1]);
    createLineCode(pathStartVar, pathFinishVar);
  }

  //console.log(declareText);
  //console.log('void setup() {pinMode(ledPin, OUTPUT);  pinMode(buttonPin, INPUT);}')
  //console.log('void loop() {');
  //console.log(loopText);
  //console.log('}');

  //console.log(`${declareText}\nvoid setup() {\n\tpinMode(ledPin, OUTPUT);\n\tpinMode(buttonPin, INPUT);\n}\n\nvoid loop() {${loopText}\n}`);

  declareText = declareText.split("\n").filter((varLine, index, allVarLines) => {
    return index === allVarLines.indexOf(varLine);
  }).join("\n");

  document.getElementById('finishedCode').innerHTML = `${declareText}\nvoid setup() {\n\n${setupText}\n}\n\nvoid loop() {\n\n${loopText}\n}`;


}

let latchCounter = 0;
let timerCounter = 0;

function createGateCode(gateName, inp1, out1, inp2, out2) {


  let outputFields = document.getElementById("outputsTable").querySelectorAll('input');
  let outputsArr = [];

  for (let i = 0; i < outputFields.length; i++) {

    if (i % 2 == 0) {
      outputsArr[i / 2] = outputFields[i].value;
    }

  }

  if (inp1) {
    declareText += `int ${inp1} = 0;\n`;
    //console.log(`int ${inp1} = 0;`);
  }

  if (inp2 && isNaN(inp2)) {
    declareText += `int ${inp2} = 0;\n`;
    //console.log(`int ${inp2} = 0;`);
  }

  if (out1 && outputsArr.indexOf(out1) == -1) {
    declareText += `int ${out1} = 0;\n`;
    //console.log(`int ${out1} = 0;`);
  }

  if (out2 && outputsArr.indexOf(out2) == -1) {
    declareText += `int ${out2} = 0;\n`;
    //console.log(`int ${out2} = 0;`);
  }

  switch (gateName) {
    case 'NOT':
      loopText += `\n\tif (${inp1}==1) {\n\t\t${out1} = 0;\n\t} else {\n\t\t${out1} = 1;\n\t}\n`;
      break;
    case 'AND':
      loopText += `\n\tif (${inp1}==1 && ${inp2}==1) {\n\t\t${out1} = 1;\n\t} else {\n\t\t${out1} = 0;\n\t}\n`;
      break;
    case 'NAND':
      loopText += `\n\tif (${inp1}==1 && ${inp2}==1) {\n\t\t${out1} = 0;\n\t} else {\n\t\t${out1} = 1;\n\t}\n`;
      break;
    case 'OR':
      loopText += `\n\tif (${inp1}==1 || ${inp2}==1) {\n\t\t${out1} = 1;\n\t} else {\n\t\t${out1} = 0;\n\t}\n`;
      break;
    case 'NOR':
      loopText += `\n\tif (${inp1}==1 || ${inp2}==1) {\n\t\t${out1} = 0;\n\t} else {\n\t\t${out1} = 1;\n\t}\n`;
      break;
    case 'XOR':
      loopText += `\n\tif ((${inp1}==1 && ${inp2}==0) || (${inp1}==0 && ${inp2}==1)) {\n\t\t${out1} = 1;\n\t} else {\n\t\t${out1} = 0;\n\t}\n`;
      break;
    case 'NODE':
      loopText += `\n\tif (${inp1}==1) {\n\t\t${out1} = 1;\n\t\t${out2} = 1;\n\t} else {\n\t\t${out1} = 0;\n\t\t${out2} = 0;\n\t}\n`;
      break;
    case 'VAR':
      loopText += `\n\tif (${inp1}==1) {\n\t\t${out1} = 1;\n\t} else {\n\t\t${out1} = 0;\n\t}\n`;
      break;
    case 'RS':
      loopText += `\n\tif ((${inp1}==1 || latchVar${latchCounter}==1) && ${inp2}==0) {\n\t\tlatchVar${latchCounter} = 1;\n\t\t${out1} = 1;\n\t} else {\n\t\tlatchVar${latchCounter} = 0;\n\t\t${out1} = 0;\n\t}\n`;
      declareText += `int latchVar${latchCounter} = 0;\n`
      latchCounter++;
      break;
    case 'SR':
      loopText += `\n\tif ((${inp2}==0 $$ latchVar${latchCounter}==1) || ${inp1}==1) {\n\t\tlatchVar${latchCounter} = 1;\n\t\t${out1} = 1;\n\t} else {\n\t\tlatchVar${latchCounter} = 0;\n\t\t${out1} = 0;\n\t}\n`;
      declareText += `int latchVar${latchCounter} = 0;\n`
      latchCounter++;
      break;
    case 'TON':
      loopText += `\n\tif (${inp1}==1) {\n\t\tif((millis()-prevTime${timerCounter}) >= ${inp2}) {\n\t\t\t${out1} = 1;\n\t\t} else {\n\t\t\t${out1} = 0;\n\t\t}\n\t} else {\n\t\tprevTime${timerCounter} = millis();\n\t\t${out1} = 0;\n\t}\n`;
      declareText += `unsigned long prevTime${timerCounter} = 0;\n`
      timerCounter++;
      break;
    case 'TOF':
      loopText += `\n\tif (${inp1}==1) {\n\t\t${out1} = 1;\n\t\tprevTime${timerCounter} = millis();\n\t} else if ((millis() - prevTime${timerCounter}) >= ${parseInt(inp2)}) {\n\t\t${out1} = 0;\n\t}\n`;
      declareText += `unsigned long prevTime${timerCounter} = 0;\n`
      timerCounter++;
      break;
    default:
      // idk
  }

  if (outputsArr.indexOf(out1) != -1) {
    loopText = loopText.replaceAll(`${out1} = 0`, `digitalWrite(${out1}, 0)`);
    loopText = loopText.replaceAll(`${out1} = 1`, `digitalWrite(${out1}, 1)`);
  }

  if (outputsArr.indexOf(out2) != -1) {
    loopText = loopText.replaceAll(`${out2} = 0`, `digitalWrite(${out2}, 0)`);
    loopText = loopText.replaceAll(`${out2} = 1`, `digitalWrite(${out2}, 1)`);
  }

}


function createLineCode(startVar, finishVar) {
  loopText += `\n\tif (${startVar}==1) {\n\t\t${finishVar} = 1;\n\t} else {\n\t\t${finishVar} = 0;\n\t}\n`;
}


function getVariables() {
  let inputsTable = document.getElementById("inputsTable");
  let outputsTable = document.getElementById("outputsTable");
  let inputFields = inputsTable.querySelectorAll("input");
  let outputFields = outputsTable.querySelectorAll("input");
  for (let i = 0; i < inputFields.length; i++) {
    if (i % 2 == 0) {
      declareText += `const int inputPin${i/2} = ${inputFields[i+1].value};\n`;
      setupText += `\tpinMode(inputPin${i/2}, INPUT);\n`;
      loopText += `\t${inputFields[i].value} = digitalRead(inputPin${i/2});\n`;
    }
  }
  for (let j = 0; j < outputFields.length; j++) {
    if (j % 2 == 0) {
      declareText += `const int ${outputFields[j].value} = ${outputFields[j+1].value};\n`;
      setupText += `\tpinMode(${outputFields[j].value}, OUTPUT);\n`;
      console.log(`digitalWrite(${outputFields[j].value}, 1)`);
    }
  }
}


function removeIO(e) {
  e.parentElement.parentElement.remove();
}


function addInp() {
  let inputRowText = '<tr><td><input type="text" value="input0"></td><td><input type="text" value="0"></td><td><button type="button" onclick="removeIO(this)" name="button">X</button></td></tr>';
  document.getElementById("inputsTable").insertAdjacentHTML('beforeend', inputRowText);
}

function addOut() {
  let outputRowText = '<tr><td><input type="text" value="output0"></td><td><input type="text" value="0"></td><td><button type="button" onclick="removeIO(this)" name="button">X</button></td></tr>';
  document.getElementById("outputsTable").insertAdjacentHTML('beforeend', outputRowText);
}

function copyCode() {
  let copyThis = document.getElementById('finishedCode');
  copyThis.select();
  copyThis.setSelectionRange(0, 99999);
  document.execCommand("copy");
}
