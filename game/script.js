// let options = {
//   ank: [],
//   jodi: [],
//   spana: [],
//   dpana: [],
//   tpana: [],
//   fpana: []
// };

// for (let num = 0; num < 1000; num++) {
//   if (num < 10) {
//     options.ank.push(num.toString());
//     options.jodi.push(num.toString().padStart(2, "0"));
//   }
//   if (num >= 10 && num < 100) {
//     options.jodi.push(num.toString());
//   }
//   const pana = num.toString().padEnd(3, "0").split("");
//   // console.log(pana);
//   if (pana[0] != "0" && pana[1] != "0" && pana[2] != "0") {
//     if (pana[0] <= pana[1] && pana[1] <= pana[2]) {
//       if (pana[0] == pana[1] && pana[1] == pana[2]) {
//         options.tpana.push(pana.join(""));
//         continue;
//       }
//       if (pana[0] != pana[1] && pana[1] != pana[2] && pana[0] != pana[2]) {
//         options.spana.push(pana.join(""));
//         continue;
//       }
//       options.dpana.push(pana.join(""));
//       continue;
//     }
//     continue;
//   }
//   if (pana[0] == "0" && pana[1] == "0" && pana[2] == "0") {
//     options.tpana.push(pana.join(""));
//     continue;
//   }

//   if (pana[1] == "0" && pana[2] == "0") {
//     options.dpana.push(pana.join(""));
//     continue;
//   }

//   if (pana[2] == "0") {
//     if (pana[0] == pana[1]) {
//       options.dpana.push(pana.join(""));
//     } else {
//       if (pana[0] <= pana[1]) {
//         options.spana.push(pana.join(""));
//       }
//     }
//     continue;
//   }
//   if (num == 1) {
//     console.log(`salaam ${num}`);
//   }
// }
// options.ank = [...new Set(options.ank)];
// options.jodi = [...new Set(options.jodi)];
// options.spana = [...new Set(options.spana)];
// options.dpana = [...new Set(options.dpana)];
// options.tpana = [...new Set(options.tpana)];
// options.fpana = [...options.spana,...options.dpana,...options.tpana];
// options.fpana = [...new Set(options.fpana)]


// let panaSuggestions = options['spana']
// let panaT = 'spana', gameTypee = 'ank', jodiT = 'single-jodi';

// // getting all required elements
// const selectedGameTypeArr = document.querySelectorAll('input[name="game-type"]');
// const selectedSessionArr = document.querySelectorAll('input[name="session"]');

// const panaTypeArr = document.querySelectorAll('input[name="pana"]');
// const jodiTypeArr = document.querySelectorAll('input[name="jodi"');

// const searchInput = document.querySelector(".searchInput");
// const input = searchInput.querySelector(".input-digits");
// const resultBox = searchInput.querySelector(".resultBox");

// const searchInput2 = document.querySelector(".searchInput2");
// const input2 = searchInput2.querySelector(".input-digits2");
// const resultBox2 = searchInput2.querySelector(".resultBox2");

// const searchInput3 = document.querySelector(".searchInput3");
// const input3 = searchInput3.querySelector(".input-digits3");
// const resultBox3 = searchInput3.querySelector(".resultBox3");

// const section1 = document.querySelector('.section-1');
// const section2 = document.querySelector('.section-2');
// const section3 = document.querySelector('.section-3');

// const spOpenOption = document.getElementById('sp-open');
// const dpOpenOption = document.getElementById('dp-open');
// const tpOpenOption = document.getElementById('tp-open');
// const spCloseOption = document.getElementById('sp-close');
// const dpCloseOption = document.getElementById('dp-close');
// const tpCloseOption = document.getElementById('tp-close');
// const familyOpenOption = document.getElementById('family-open');
// const familyCloseOption = document.getElementById('family-close');
// const panaBidType3 = document.getElementById('BidType3');

// const book_game_button = document.getElementById('book-game-btn');


// const addCFButton = document.querySelector('.addCF');

// const pErrorMessage = document.querySelector('.p-error-message');


// const inputDigits = document.querySelectorAll('.input-digits');



// Array.from(inputDigits).forEach(inputD => {
//   inputD.addEventListener('focus', () => {
//       // console.log('heyey');
//       // var scrollY = window.scrollY || window.pageYOffset;
//       // console.log(scrollY);
//       // window.scrollTo(0, Math.max(scrollY + 100, 0));
//   })
// })

// Array.from(jodiTypeArr).forEach(jodiType => {
//   jodiType.addEventListener('click',e => {
//       jodiT = e.target.value;
//   })
// });

// document.addEventListener('click',e => {
//   if(e.target !== searchInput) {
//       searchInput.classList.remove("active");
//   }
//   if(e.target !== searchInput2) {
//       searchInput2.classList.remove("active");
//   }
//   if(e.target !== searchInput3) {
//       searchInput3.classList.remove("active");
//   }
// })


// Array.from(panaTypeArr).forEach(panaType => {
//   panaType.addEventListener('click',e => {
//       console.log(e.target.value);
//       panaT = e.target.value;
//       panaSuggestions = options[e.target.value];
//       searchInput3.classList.remove("active");
//       input3.value = ""
//       spCloseOption.style.display = 'none';
//       dpCloseOption.style.display = 'none';
//       tpCloseOption.style.display = 'none';
//       familyCloseOption.style.display = 'none';
//       if(spOpenOption) {
//           tpOpenOption.style.display = 'none';
//           familyOpenOption.style.display = 'none';
//           spOpenOption.style.display = 'none';
//           dpOpenOption.style.display = 'none';
//       }

      
//       if(e.target.value === 'spana') {
//           spCloseOption.style.display = 'block';
//           panaBidType3.value = 'SpClose';
//           if(spOpenOption) {
//               spOpenOption.style.display = 'block';
//               panaBidType3.value = 'SpOpen';
//           }
//       }
//       else if (e.target.value === 'dpana') {
//           dpCloseOption.style.display = 'block';
//           panaBidType3.value = 'DpClose';
//           if(spOpenOption) {
//               dpOpenOption.style.display = 'block';
//               panaBidType3.value = 'DpOpen';
//           }

//       }
//       else if (e.target.value === 'tpana') {
//           tpCloseOption.style.display = 'block';
//           panaBidType3.value = 'TpClose';
//           if(spOpenOption) {
//               tpOpenOption.style.display = 'block';
//               panaBidType3.value = 'TpOpen';
//           }

//       }
//       else if (e.target.value === 'fpana') {
//           familyCloseOption.style.display = 'block';
//           panaBidType3.value = 'Close';
//           if(spOpenOption) {
//               familyOpenOption.style.display = 'block';
//               panaBidType3.value = 'Open';
//           }

//       }

//   })
// })

// Array.from(selectedGameTypeArr).forEach(gameT => {
//   gameT.addEventListener('click' , e => {
//       pErrorMessage.innerText = '';
//       gameTypee = e.target.value;
//       if(e.target.value == 'ank') {   
//           section1.style.display = 'block'
//           section2.style.display = 'none'
//           section3.style.display = 'none'
//       }   
//       if(e.target.value == 'jodi') {   
//           section1.style.display = 'none'
//           section2.style.display = 'block'
//           section3.style.display = 'none'
//       }   
//       if(e.target.value == 'pana') {   
//           section1.style.display = 'none'
//           section2.style.display = 'none'
//           section3.style.display = 'block'
//       }   
//   })
// })


// input.onkeyup = (e) => {
//   let suggestions = [];
//   let userData = e.target.value;
//   suggestions = options.ank;
//   let emptyArray = [];
//   pErrorMessage.innerText = '';
//   // console.log(panaT)
//   if(userData){
//       emptyArray = suggestions.filter((data)=>{
//           return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
//       });
//       emptyArray = emptyArray.map((data)=>{
//           return data = '<li>'+ data +'</li>';
//       });
//       searchInput.classList.add("active"); //show autocomplete box
//       showSuggestions(emptyArray,resultBox);
//       digits = null;
//       let allList = resultBox.querySelectorAll("li");
//       // To put validation over here
//       for (let i = 0; i < allList.length; i++) {
//           allList[i].addEventListener('click',e => {
//               // console.log(allList[i].innerText);
//               input.value = allList[i].innerText;
//               digits = allList[i].innerText;
//               searchInput.classList.remove("active"); //hide autocomplete box
//           });

//       }
//   }else{
//       searchInput.classList.remove("active"); //hide autocomplete box
//   }
// }

// input2.onkeyup = (e) => {
//   console.log(e)
//   let suggestions = [];
//   let userData = e.target.value;
//   pErrorMessage.innerText = '';
//   suggestions = options['jodi'];
//   // console.log(suggestions)
//   let emptyArray = [];
//   if(userData){
//       emptyArray = suggestions.filter((data)=>{
//           return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
//       });
//       emptyArray = emptyArray.map((data)=>{
//           return data = '<li>'+ data +'</li>';
//       });
//       searchInput2.classList.add("active"); //show autocomplete box
//       showSuggestions(emptyArray, resultBox2);
//       digits = null;
//       let allList = resultBox2.querySelectorAll("li");
//       // To put validation over here
//       for (let i = 0; i < allList.length; i++) {
//           allList[i].addEventListener('click',e => {
//               // console.log(allList[i].innerText);
//               input2.value = allList[i].innerText;
//               digits = allList[i].innerText;
//               searchInput2.classList.remove("active"); //hide autocomplete box
//           });

//       }
//   }else{
//       searchInput2.classList.remove("active"); //hide autocomplete box
//   }
// }

// input3.onkeyup = (e) => {
//   console.log(e)
//   let suggestions = [];
//   let userData = e.target.value;
//   suggestions = panaSuggestions;
//   pErrorMessage.innerText = '';
//   console.log(suggestions)
//   let emptyArray = [];
//   if(userData){
//       emptyArray = suggestions.filter((data)=>{
//           return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()); 
//       });
//       emptyArray = emptyArray.map((data)=>{
//           return data = '<li>'+ data +'</li>';
//       });
//       searchInput3.classList.add("active"); //show autocomplete box
//       showSuggestions(emptyArray, resultBox3);
//       digits = null;
//       let allList = resultBox3.querySelectorAll("li");
//       // To put validation over here
//       for (let i = 0; i < allList.length; i++) {
//           allList[i].addEventListener('click',e => {
//               // console.log(allList[i].innerText);
//               input3.value = allList[i].innerText;
//               digits = allList[i].innerText;
//               searchInput3.classList.remove("active"); //hide autocomplete box
//           });

//       }
//   }else{
//       searchInput3.classList.remove("active"); //hide autocomplete box
//   }
// }


// function showSuggestions(list, resultBox = resultBox){
//   let listData;
//   if(!list.length){
//       userValue = inputBox.value;
//       listData = '<li>'+ userValue +'</li>';
//   }else{
//       listData = list.join('');
//   }
//   resultBox.innerHTML = listData;
// }

// function run_validation_book_game() {
//   const idHide = document.getElementById('idHide');
  
//   console.log(idHide);
//   console.log(idHide.value);
//   const vall = idHide.value || "";
//   const vallArr = vall.split(',');
  
//   console.log(vallArr);
  
//   if(vallArr.length > 0 && vallArr[0] != '') {
//       return true;
//   }
//   pErrorMessage.innerText = 'Please add atleast 1 bid!'
//   return false;
// }

// $(function() {
//   $("#StDate").datepicker();
//   var CurrPoints = parseInt($("#PointsAdd").val());

//   var BidAarry = new Array();
//   var PointsArray = new Array();
//   var BidTypeArray = new Array();



//   myCt = 0;
//   $(".addCF").click(function() {
//       var points = parseInt($("#points").val());
//       var BidNo = $("#BidNo").val();
//       var BidType = $("#BidType").val();

//       var points2 = parseInt($("#points2").val());
//       var BidNo2 = $("#BidNo2").val();
//       var BidType2 = $("#BidType2").val();

//       var points3 = parseInt($("#points3").val());
//       var BidNo3 = $("#BidNo3").val();
//       var BidType3 = $("#BidType3").val();
//       var Pana = $("#Pana").val();

//       // console.log(parseInt(BidNo),options.ank);
//       if(gameTypee === 'ank' && BidNo && !options.ank.includes(BidNo)) {
//           pErrorMessage.innerText = 'Please enter the valid ank!'
//           return;
//       }

//       if(gameTypee === 'jodi' && BidNo2 && !options.jodi.includes(BidNo2)) {
//           pErrorMessage.innerText = 'Please enter the valid jodi!'
//           return;
//           // return alert('');
//       }

//       if(gameTypee === 'pana' && BidNo3 && !panaSuggestions.includes(BidNo3)) {
//           pErrorMessage.innerText = 'Please enter the valid pana!'
//           return;
//       }
//       // console.log(typeof BidNo,typeof BidNo2,typeof BidNo3);


//       if (gameTypee === 'ank' && (($("#BidNo").val()) != "")) {
//           if ((($("#BidNo").val()) != "") && ($.isNumeric($("#points").val())) && (($("#BidType").val()) != "")) {
//               if (CurrPoints <= points) {
//                   if (true) {
//                       CurrPoints = parseInt(CurrPoints - points);
//                       $("#customFields").append('<tr><td>' + BidNo + '</td><td>' + BidType + '</td> <td>' + points + '</td><td><a href="javascript:void(0);"  id="' + BidNo + ',' + BidType + ',' + points + '" class="remCF"><img src="/icon/delete.png"  width="25"></a></td></tr>');
//                       $("#ShowPoints").html("" + CurrPoints);
//                       $("#BidNo").val("");
//                       $("#points").val("");
//                       // $("#BidType").val("");
//                       BidAarry.push(BidNo);
//                       PointsArray.push(points);
//                       BidTypeArray.push(BidType);
//                   } else {
//                       pErrorMessage.innerText = 'Please enter the valid ank!'
//                       $(".id_100 select").val("").change();
//                       $("#BidNo").val("");
//                       $("#points").val("");
//                       // $("#BidType").val("");
//                   }
//               } else {
//                   pErrorMessage.innerText = 'Sorry available points are less!'
//               }
//           } else {
//               pErrorMessage.innerText = "Error! Select points to play!"; 
//               $("#BidNo").val("");
//               $("#points").val("");
//               // $("#BidType").val("");
//           }

//       }
//       if (gameTypee === 'jodi' && (($("#BidNo2").val()) != "")) {
//           if ((($("#BidNo2").val()) != "") && ($.isNumeric($("#points2").val())) && (($("#BidType2").val()) != "")) {
//               if (CurrPoints >= points2) {
//                   if (points2 >= 50) {
                      

//                       if(jodiT === 'family-jodi') {
//                           const getFamily = getjodiFamilyHelper(BidNo2);
//                           const total_cost = getFamily.length * points2;
                          
//                           console.log("Total Cost : ", total_cost);
//                           console.log("Current Points : ", CurrPoints);
                          
//                           if(parseInt(CurrPoints) - parseInt(total_cost) < 0) {
//                               console.log("ENTERING DEAD ZONE");
//                               const left_points = total_cost - CurrPoints;
//                               pErrorMessage.innerText = `Sorry available points are less! add more ${left_points} to play family!`
//                               return;
//                           }
//                           CurrPoints = CurrPoints - total_cost;
//                           console.log("ENTERING NORMAL ZONE");
//                           getFamily.forEach(fam => {
//                               $("#customFields").append('<tr><td>' + fam.bidNo + '</td><td>' + fam.bidType + '</td> <td>' + points2 + '</td><td><a href="javascript:void(0);"  id="' + fam.bidNo + ',' + fam.bidType + ',' + points2 + '" class="remCF"><img src="icon/delete.png"  width="25"></a></td></tr>');
//                               BidAarry.push(fam.bidNo);
//                               PointsArray.push(points2);
//                               BidTypeArray.push(fam.bidType);
//                           })
//                           $("#ShowPoints").html("" + CurrPoints);
//                           $("#BidNo2").val("");
//                           $("#points2").val("");
//                           $("#BidType2").val("jodi");

//                       }
//                       else {
//                           CurrPoints = parseInt(CurrPoints - points2);
//                           $("#customFields").append('<tr><td>' + BidNo2 + '</td><td>' + BidType2 + '</td> <td>' + points2 + '</td><td><a href="javascript:void(0);"  id="' + BidNo2 + ',' + BidType2 + ',' + points2 + '" class="remCF"><img src="icon/delete.png"  width="25"></a></td></tr>');
  
//                           $("#ShowPoints").html("" + CurrPoints);
//                           $("#BidNo2").val("");
//                           $("#points2").val("");
//                           $("#BidType2").val("jodi");
//                           BidAarry.push(BidNo2);
//                           PointsArray.push(points2);
//                           BidTypeArray.push(BidType2);
//                       }

//                   } else {
//                       alert("Beta Sudhar Ja");
//                       $(".id_100 select").val("").change();
//                       $("#BidNo2").val("");
//                       $("#points2").val("");
//                       $("#BidType2").val("jodi");
//                   }
//               } else {
//                   console.log("ENTERING DEAD ZONE");
//                   console.log("Current Points : ", CurrPoints);
//                   pErrorMessage.innerText = 'Sorry available points are less!'
//               }
//           } else {
//               pErrorMessage.innerText = "Error! Select points to play!";  //Select Bid no & also enter points");  
//               $("#BidNo2").val("");
//               $("#points2").val("");
//               $("#BidType2").val("jodi");
//           }
//       }

//       if (gameTypee === 'pana' && (($("#BidNo3").val()) != "")) {
//           if ((($("#BidNo3").val()) != "") && ($.isNumeric($("#points3").val())) && (($("#BidType3").val()) != "") && (($("#Pana").val()) != "")) {
//               if (CurrPoints >= points3) {
//                   if (points3 >= 50) {

//                       if(panaT === 'fpana') {
//                           const getFamily = getFamilyHelper(BidNo3);
                          
//                           const total_cost = getFamily.length * points3;
                          
//                           console.log("Total Cost : ", total_cost);
//                           console.log("Current Points : ", CurrPoints);
                          
//                           if(parseInt(CurrPoints) - parseInt(total_cost) < 0) {
//                               console.log("ENTERING DEAD ZONE");
//                               const left_points = total_cost - CurrPoints;
//                               pErrorMessage.innerText = `Sorry available points are less! add more ${left_points} to play pana family!`
//                               return;
//                           }
//                           CurrPoints = CurrPoints - total_cost;
                          
                          
//                           getFamily.forEach(fam => {
//                               $("#customFields").append('<tr><td>' + fam.bidNo + '</td><td>' + fam.bidType + '</td> <td>' + points3 + '</td><td><a href="javascript:void(0);"  id="' + fam.bidNo + ',' + fam.bidType + ',' + points3 + '" class="remCF"><img src="icon/delete.png"  width="25"></a></td></tr>');
//                               BidAarry.push(fam.bidNo);
//                               PointsArray.push(points3);
//                               BidTypeArray.push(fam.bidType);
//                           })
//                           $("#ShowPoints").html("" + CurrPoints);
//                           $("#BidNo3").val("");
//                           $("#points3").val("");
//                           // $("#BidType3").val("");
//                           $("#Pana").val("");

//                           // console.log(BidAarry,PointsArray,BidTypeArray);
//                           // return;
//                       }
//                       else {
//                           CurrPoints = parseInt(CurrPoints - points3);
//                           $("#customFields").append('<tr><td>' + BidNo3 + '</td><td>' + BidType3 + '</td> <td>' + points3 + '</td><td><a href="javascript:void(0);"  id="' + BidNo3 + ',' + BidType3 + ',' + points3 + '" class="remCF"><img src="icon/delete.png"  width="25"></a></td></tr>');
//                           $("#ShowPoints").html("" + CurrPoints);
//                           $("#BidNo3").val("");
//                           $("#points3").val("");
//                           // $("#BidType3").val("");
//                           $("#Pana").val("");
//                           BidAarry.push(BidNo3);
//                           PointsArray.push(points3);
//                           BidTypeArray.push(BidType3);
//                       }

//                   } else {
//                       alert("Beta Sudhar Ja");
//                       $(".id_100 select").val("").change();
//                       $("#BidNo3").val("");
//                       $("#points3").val("");
//                       // $("#BidType3").val("");
//                       $("#Pana").val("");
//                   }
//               } else {
//                   pErrorMessage.innerText = 'Sorry available points are less!'
//               }
//           } else {
//               pErrorMessage.innerText = "Error! Select points to play!";  //Select Bid no & also enter points");  
//               $("#BidNo3").val("");
//               $("#points3").val("");
//               // $("#BidType3").val("");
//               $("#Pana").val("");
//           }
//       }


//       pointsHide = BidAarry.toString();
//       $("#pointsHide").val(pointsHide);

//       BidTypeHide = BidTypeArray.toString();
//       $("#BidTypeHide").val(BidTypeHide);

//       PtHide = PointsArray.toString();
//       $("#idHide").val(PtHide);
//       myCt++;




//   });
//   $("#customFields").on('click', '.remCF', function() {
//       myArr = this.id.split(",");
//       var Parseval = myArr["0"];
//       var BdPt = parseInt(myArr[2]);
//       var BdType = myArr["1"];


//       $(this).parent().parent().remove();
//       CurrPoints = CurrPoints + BdPt;
//       $("#ShowPoints").html("" + CurrPoints);
//       BidAarry.splice($.inArray(Parseval, BidAarry), 1);
//       BidTypeArray.splice($.inArray(BdType, BidTypeArray), 1);
//       PointsArray.splice($.inArray(BdPt, PointsArray), 1);

//       pointsHide = BidAarry.toString();
//       $("#pointsHide").val(pointsHide);

//       BidTypeHide = BidTypeArray.toString();
//       $("#BidTypeHide").val(BidTypeHide);

//       PtHide = PointsArray.toString();
//       $("#idHide").val(PtHide);

//       //$("#TotalCt").val(pointsHide);  
//   });


// });

// function getjodiFamilyHelper(bidNo) {
//   const digits = bidNo.split('');
//   console.log(digits);
//   const reversedDigits = digits.reverse();
  
//   console.log("reversedDigits  : ", reversedDigits);
  

//   let ans = [];

//   for (let i = 0; i < 4; i++) {
//       let newD = [];
//       for (let j = 0; j < 2; j++) {
//           if (i & (1 << j)) {
//               const d = parseInt(digits[j]);
//               console.log(d)
//               newD.push(((d + 5) % 10).toString());
//           }
//           else {
//               const d = parseInt(digits[j]);
//               newD.push(d.toString());
//           }
//       }
//       ans.push(newD.join(''));
//   }
  
//   const fans = ans.map(dig => dig.split('').reverse().join(''));
//   ans = [...ans,...fans];
  
//   console.log("FInal ANS : ", ans);

//   const finalAns = [...new Set(ans)].map(bNo => {
//       return {
//           bidNo : bNo,
//           bidType : 'jodi'
//       };
//   });
//   console.log(finalAns);
//   return finalAns;

// }

// function getFamilyHelper(bidNo) {
//   const digits = bidNo.split('');
//   console.log(digits);
//   const ans = [];

//   for (let i = 0; i < 8; i++) {
//       let newD = [];
//       for (let j = 0; j < 3; j++) {
//           if (i & (1 << j)) {
//               const d = parseInt(digits[j]);
//               console.log(d)
//               newD.push(((d + 5) % 10).toString());
//           }
//           else {
//               const d = parseInt(digits[j]);
//               newD.push(d.toString());
//           }
//       }
//       newD.sort();
//       for(let k = 0; k < 3; k++) {
//           if(newD[0] == '0') {
//               newD.shift();
//               newD.push('0');
//           }
//           else {
//               break;
//           }
//       }
//       ans.push(newD.join(''));
//   }

//   console.log('this is sample : ' + panaBidType3.value);

//   const finalAns = [...new Set(ans)].map(bNo => {
//       if(options.spana.includes(bNo)) {
//           return {bidNo : bNo, bidType : panaBidType3.value == 'Open' ? 'SpOpen' : 'SpClose'};
//       }
//       else if(options.dpana.includes(bNo)) {
//           return {bidNo : bNo, bidType : panaBidType3.value == 'Open' ? 'DpOpen' : 'DpClose'};
//       }
//       else if(options.tpana.includes(bNo)) {
//           return {bidNo : bNo, bidType :  panaBidType3.value == 'Open' ? 'TpOpen' : 'TpClose'};
//       }
//       else {
//           return {bidNo : bNo, bidType : 'Family'};
//       }
//   });
//   console.log(finalAns);
//   return finalAns;
// }