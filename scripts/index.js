const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');


menuButton.addEventListener('click', showMenu);


function showMenu() {
  menu.classList.toggle("menu-active");
  menuButton.classList.toggle("menu-button-active");
}


// array1 = [0.1,1,10,100,100000,2.54,30.48,91.44,160934.4];
// array2 = [0.001, 1, 10, 1000, 1000000, 453.59237, 28.349523125];
// array3 = [0.01, 0.1, 1, 2, 3 , , 37.85412, 0.05 , 0.15, 2.4];


function atvalt() {

      //var lista = [array1, array2, array3];
      let array = [-12,-9,-6,-3,-2,-1,0,1,2,3,6,9,12];
      let dropDown1 = document.getElementById("dropDown1");
      let dropDown2 = document.getElementById("dropDown2");
      var dropVal1 = dropDown1.options[dropDown1.selectedIndex].value;
      var dropVal2 = dropDown2.options[dropDown2.selectedIndex].value;
      var beviteliErtek = document.getElementById("beviteliErtek").value;
      //document.getElementById("eredmenyText").innerHTML = Math.round((beviteliErtek.replace(",", ".") * ( Math.pow(10, array[dropVal1]) / Math.pow(10, array[dropVal2]) ) + Number.EPSILON) * 1000) / 1000;
      //document.getElementById("eredmenyText").innerHTML = beviteliErtek.replace(",", ".") * ( Math.pow(10, array[dropVal1]) / Math.pow(10, array[dropVal2]) ) ;
      document.getElementById("eredmenyText").innerHTML = beviteliErtek.replace(",", ".") *  Math.pow(10,(array[dropVal1]-array[dropVal2])) ;

    }
