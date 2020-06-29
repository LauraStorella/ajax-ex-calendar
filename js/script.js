$(document).ready(function () {

// **************************************************
// ******************** CALENDAR ********************
// **************************************************


/* 
Creare un calendario dinamico con le festività. 
Partiamo dal gennaio 2018 dando la possibilità di cambiare mese, 
gestendo il caso in cui l’API non possa ritornare festività. 
Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 
(unici dati disponibili sull’API).

Ogni volta che cambio mese dovrò:
1. Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
2. Controllare quanti days ha il mese scelto formando così una lista
3. Chiedere all’API quali sono le festività per il mese scelto
4. Evidenziare le festività nella lista
*/




// STEP #1
// Creo var con data di inizio (2018-01-01)
var currentDate=moment("2018-01-01");

// Chiamo funzione stampa giorni del mese 
printMonth(currentDate);



// ******************** FUNCTIONs ********************

// Funzione - stampa giorni del mese
function printMonth(currentDay){
  $('#monthDays').html();
  // Richiedo formato data
  var currentMonth = currentDay.format('MMMM');
  var currentYear = currentDay.format('YYYY');

  // Richiedo conteggio giorni in mese
  // ---> creo ciclo For e appendo elementi in html
  var daysInMonth = currentDay.daysInMonth();
  var source = $('#template-calendar').html();
  var template = Handlebars.compile(source);
  $('#current-month').text(currentMonth + " " + currentYear);

  for (var i = 1; i <= daysInMonth; i++) {
    var day = i;
    var context = {
      'days': day + " " + currentMonth,
    }
    $('#monthDays').append(template(context));
  }
  // Funzione per verificare se giorno è festività
}



// Funzione - verifico se giorno è festività
function checkHoliday() {
  // Chiamata ajax per comunicare con API  
}
























































}); // document ready
