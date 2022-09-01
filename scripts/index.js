const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');


menuButton.addEventListener('click', showMenu);


function showMenu() {
  menu.classList.toggle("menu-active");
  menuButton.classList.toggle("menu-button-active");
}

function atvalt() {

      let array = [-12,-9,-6,-3,-2,-1,0,1,2,3,6,9,12];
      let dropDown1 = document.getElementById("dropDown1");
      let dropDown2 = document.getElementById("dropDown2");
      var dropVal1 = dropDown1.options[dropDown1.selectedIndex].value;
      var dropVal2 = dropDown2.options[dropDown2.selectedIndex].value;
      var beviteliErtek = document.getElementById("beviteliErtek").value;
      let calculated = beviteliErtek.replace(",", ".") *  Math.pow(10,(array[dropVal1]-array[dropVal2]))
      let calculatedExp = calculated.toExponential().split('e');
      calculatedExp[1] = calculatedExp[1].startsWith("+") ? calculatedExp[1].replace("+", "") : calculatedExp[1] ;
      document.getElementById("eredmenyText").innerHTML = `${calculated} vagy ${calculatedExp[0]} × 10<sup>${calculatedExp[1]}</sup>`;

    }
