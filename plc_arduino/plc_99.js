const gateWidth = 200;
const gateHeight = 100;
const gateMarginTop = 10;
const gateMarginSide = 10;
const pointerRadius = 6;


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
    pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" data-ri="f" data-ci="f" style="left:${pointerRadius}px;top:${2}px;" class="pointer-body"></span>`);
  } else {
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].childElementCount; j++) {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" data-ri="${i}" data-ci="${j+1}" style="left:${gateWidth*(j+1) - pointerRadius}px;top:${gateHeight/2 + (i*gateHeight) - pointerRadius}px;" class="pointer-body"></span>`);
      }
      pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" data-ri="${i}" data-ci="f" style="left:${-pointerRadius}px;top:${gateHeight/2 + (i*gateHeight) - pointerRadius}px;" class="pointer-body"></span>`);
      pointers.insertAdjacentHTML('beforeend', `<span onclick="makeActive(this)" data-ri="${i}" data-ci="0" style="left:${gateWidth/2 - pointerRadius}px;top:${gateHeight*(i+1) - pointerRadius}px;" class="pointer-body"></span>`);
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
  let rowIndex = activePointer.dataset.ri;
  let colIndex = activePointer.dataset.ci;
  let labelStr = '<p><input type="text"></p>';
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
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="i11" style="left:${j*gateWidth + gateMarginSide+50-2*pointerRadius}px;top:${i*gateHeight + gateHeight/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="o111" style="left:${j*gateWidth + gateWidth-gateMarginSide-50}px;top:${i*gateHeight + gateHeight/2-pointerRadius}px;" class="pointer-body"></span>`);
      } else if (childrenArray[j].classList[1] == 'plc-gate-2-1') {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="i21" style="left:${j*gateWidth + gateMarginSide+50-2*pointerRadius}px;top:${i*gateHeight + gateHeight/4+gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="i22" style="left:${j*gateWidth + gateMarginSide+50-2*pointerRadius}px;top:${i*gateHeight + gateHeight*3/4-gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="o112" style="left:${j*gateWidth + gateWidth-gateMarginSide-50}px;top:${i*gateHeight + gateHeight/2-pointerRadius}px;" class="pointer-body"></span>`);
      } else if (childrenArray[j].classList[1] == 'plc-gate-1-2') {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="i11" style="left:${j*gateWidth + gateMarginSide+50-2*pointerRadius}px;top:${i*gateHeight + gateHeight/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="o211" style="left:${j*gateWidth + gateWidth-gateMarginSide-50}px;top:${i*gateHeight + gateHeight/4+gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="o221" style="left:${j*gateWidth + gateWidth-gateMarginSide-50}px;top:${i*gateHeight + gateHeight*3/4-gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
      } else if (childrenArray[j].classList[1] == 'plc-gate-2-2') {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="i21" style="left:${j*gateWidth + gateMarginSide+50-2*pointerRadius}px;top:${i*gateHeight + gateHeight/4+gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="i22" style="left:${j*gateWidth + gateMarginSide+50-2*pointerRadius}px;top:${i*gateHeight + gateHeight*3/4-gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="o212" style="left:${j*gateWidth + gateWidth-gateMarginSide-50}px;top:${i*gateHeight + gateHeight/4+gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
        pointers.insertAdjacentHTML('beforeend', `<span onclick="makeTheLine(this)" data-ri="${i}" data-ci="${j}" data-gd="o222" style="left:${j*gateWidth + gateWidth-gateMarginSide-50}px;top:${i*gateHeight + gateHeight*3/4-gateMarginTop/2-pointerRadius}px;" class="pointer-body"></span>`);
      }
    }
  }
}


let step = 0;
let firstPointerRow, firstPointerCol, firstPointerDesc;
let secondPointerRow, secondPointerCol, secondPointerDesc;

function makeTheLine(e) {

  let rowIndex = e.dataset.ri;
  let colIndex = e.dataset.ci;
  let gateDesc = e.dataset.gd;

  if (step == 0 && gateDesc.charAt(0) === 'o') {
    e.classList.toggle("active");
    firstPointerRow = rowIndex;
    firstPointerCol = colIndex;
    firstPointerDesc = gateDesc;
    step = 1;
  } else if (step == 1 && gateDesc.charAt(0) === 'i') {
    secondPointerRow = rowIndex;
    secondPointerCol = colIndex;
    secondPointerDesc = gateDesc;
    step = 0;
    let linesContainer = document.querySelector(".lines svg");
    let startFromThisMany = firstPointerDesc.charAt(1);
    let startThisIndex = firstPointerDesc.charAt(2);
    let startX = firstPointerCol * gateWidth + gateWidth - gateMarginSide - 50;
    let startY = firstPointerRow * gateHeight + (gateHeight - 2 * gateMarginTop) / (2 * startFromThisMany) * (startThisIndex * 2 - 1) + gateMarginTop;
    let endFromThisMany = secondPointerDesc.charAt(1);
    let endThisIndex = secondPointerDesc.charAt(2);
    let endX = secondPointerCol * gateWidth + gateMarginSide + 50;
    let endY = secondPointerRow * gateHeight + (gateHeight - 2 * gateMarginTop) / (2 * endFromThisMany) * (endThisIndex * 2 - 1) + gateMarginTop;
    linesContainer.insertAdjacentHTML('beforeend', `<path data-fri="${firstPointerRow}" data-fci="${firstPointerCol}" data-fgd="${firstPointerDesc}" data-sri="${secondPointerRow}" data-sci="${secondPointerCol}" data-sgd="${secondPointerDesc}" id="${firstPointerRow}${firstPointerCol}${firstPointerDesc}&${secondPointerRow}${secondPointerCol}${secondPointerDesc}" d="M ${startX} ${startY} C ${(endX+startX)/2} ${startY}, ${(endX+startX)/2} ${endY}, ${endX} ${endY}" />`)
    document.querySelectorAll('.pointer-body').forEach(pointer => pointer.remove());
  }

}



function scan() {

  declareText = '';
  setupText = '';
  loopText = '';

  latchCounter = 0;
  timerCounter = 0;
  incCounter = 0;


  getVariables();

  const rows = document.querySelectorAll(".plc-network-row");
  const paths = document.querySelectorAll(".lines path");
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

    let fri = paths[k].dataset.fri;
    let fci = paths[k].dataset.fci;
    let fgd = paths[k].dataset.fgd;
    let sri = paths[k].dataset.sri;
    let sci = paths[k].dataset.sci;
    let sgd = paths[k].dataset.sgd;

    let pathStartVar = `v${fri}${fci}${parseInt(fgd.charAt(2))+parseInt(fgd.charAt(3))}`;
    let pathFinishVar = `v${sri}${sci}${sgd.charAt(2)}`;
    createLineCode(pathStartVar, pathFinishVar);
  }

  declareText = declareText.split("\n").filter((varLine, index, allVarLines) => {
    return index === allVarLines.indexOf(varLine);
  }).join("\n");

  document.getElementById('finishedCode').innerHTML = `${declareText}\nvoid setup() {\n\n${setupText}\n}\n\nvoid loop() {\n\n${loopText}\n}`;


}

let latchCounter = 0;
let timerCounter = 0;
let incCounter = 0;

function createGateCode(gateName, inp1, out1, inp2, out2) {





  let outputFields = document.getElementById("outputsTable").querySelectorAll('input');
  let outputsArr = [];

  for (let i = 0; i < outputFields.length; i++) {

    if (i % 2 == 0) {
      outputsArr[i / 2] = outputFields[i].value;
    }

  }

  if (inp1 && isNaN(inp1)) {
    declareText += `int ${inp1} = 0;\n`;
  }

  if (inp2 && isNaN(inp2)) {
    declareText += `int ${inp2} = 0;\n`;
    //console.log(`int ${inp2} = 0;`);
  }

  if (out1 && outputsArr.indexOf(out1) == -1 && isNaN(out1)) {
    declareText += `int ${out1} = 0;\n`;
    //console.log(`int ${out1} = 0;`);
  }

  if (out2 && outputsArr.indexOf(out2) == -1 && isNaN(out2)) {
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
    case 'INC':
      loopText += `\n\tif (${inp2}==1) {\n\t\t${out1} = 0;\n\t} else if (${inp1} != prevIncState${incCounter} && ${inp1}==1) {\n\t\t${out1} += 1;\n\t}\n\tprevIncState${incCounter} = ${inp1};\n`;
      declareText += `int prevIncState${incCounter} = 0;\n`
      incCounter++;
      break;
    case 'DT3':
      loopText += `\n\tif (${inp1}%2==1) {\n\t\tA${out1} = 1;\n\t} else { A${out1} = 0; }\n\tif (${inp1}%4 > 1) {\n\t\tB${out1} = 1;\n\t} else { B${out1} = 0; }\n\tif (${inp1}%8 > 3) {\n\t\tC${out1} = 1;\n\t} else { C${out1} = 0; }\n`;
      break;
    case 'DT4':
      loopText += `\n\tif (${inp1}%2==1) {\n\t\tA${out1} = 1;\n\t} else { A${out1} = 0; }\n\tif (${inp1}%4 > 1) {\n\t\tB${out1} = 1;\n\t} else { B${out1} = 0; }\n\tif (${inp1}%8 > 3) {\n\t\tC${out1} = 1;\n\t} else { C${out1} = 0; }\n\tif (${inp1}%16 > 7) {\n\t\tD${out1} = 1;\n\t} else { D${out1} = 0; }\n`;
      break;
    case 'GT':
      loopText += `\n\tif (${inp1}>${inp2}) {\n\t\t${out1} = 1;\n\t} else {\n\t\t${out1} = 0;\n\t}\n`;
      break;
    case 'LT':
      loopText += `\n\tif (${inp1}<${inp2}) {\n\t\t${out1} = 1;\n\t} else {\n\t\t${out1} = 0;\n\t}\n`;
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
  //loopText += `\n\tif (${startVar}==1) {\n\t\t${finishVar} = 1;\n\t} else {\n\t\t${finishVar} = 0;\n\t}\n`;
  loopText += `\n\t${finishVar}=${startVar};\n`;
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









function addPointersToDelete() {
  let rows = document.querySelectorAll(".plc-network-row");
  let paths = document.querySelectorAll(".lines path");
  let pointers = document.querySelector(".pointers");
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].childElementCount; j++) {
      if (rows[i].childElementCount == 1) {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="deleteBlock(this)" data-ri="${i}" data-ci="${j+1}"  data-last="T" style="left:${gateWidth*(j) - pointerRadius + gateWidth/2}px;top:${gateHeight/2 + (i*gateHeight) - pointerRadius}px;" class="pointer-body"></span>`);
      } else {
        pointers.insertAdjacentHTML('beforeend', `<span onclick="deleteBlock(this)" data-ri="${i}" data-ci="${j+1}" style="left:${gateWidth*(j) - pointerRadius + gateWidth/2}px;top:${gateHeight/2 + (i*gateHeight) - pointerRadius}px;" class="pointer-body"></span>`);
      }
    }
  }


  for (let k = 0; k < paths.length; k++) {
    let coords = paths[k].getAttribute("d").split(" ");

    let l = coords.length;


    //  JAVITANI
    pointers.insertAdjacentHTML('beforeend', `<span onclick="deleteLine(this)" id="${paths[k].id}" style="left:${(parseInt(coords[1])+parseInt(coords[l-2]))/2-pointerRadius}px;top:${(parseInt(coords[l-1])+parseInt(coords[2]))/2-pointerRadius}px;" class="pointer-body"></span>`);


  }


}


function deleteBlock(e) {
  let rowIndex = e.dataset.ri;
  let colIndex = e.dataset.ci;
  let rows = document.querySelectorAll(".plc-network-row");
  let deleteThisGate = rows[rowIndex].querySelector(`.plc-gate:nth-child(${colIndex})`);
  if (e.dataset.last && rows.length!=1) {
    rows[rowIndex].remove();
  } else {
    deleteThisGate.remove();
  }
  document.querySelectorAll('.pointer-body').forEach(pointer => pointer.remove());
}


function deleteLine(e) {

  let deleteThisPath = document.getElementById(e.id);

  deleteThisPath.remove();

  document.querySelectorAll('.pointer-body').forEach(pointer => pointer.remove());
}


document.querySelector('#download').addEventListener('click', (event) => {
  let inputs = document.querySelectorAll(".plc-network-row input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('value', inputs[i].value);
  }
  event.target.href = `data:text/plain;charset=utf-8,${document.getElementById('networkCode').innerHTML}`;
});

async function loadFile(f) {
    let text = await f.text();
    document.getElementById('networkCode').innerHTML = text;
}
