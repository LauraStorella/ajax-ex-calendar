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




// MILESTONE #1
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
      'holiday': currentDay.format('YYYY-MM-')+addzero(i)
    }
    $('#monthDays').append(template(context));
  }
  // Funzione per verificare giorni festività
  var numMonth= currentDay.format('M');
  checkHoliday(numMonth)
}


// Funzione - aggiungo 0 se giorno mese < 10
function addzero(day){
  if (day < 10) {
    return '0' + day;
  }
  else {
    return day;
  }
}



// Funzione - verifico le festività per il mese scelto
function checkHoliday(selectedMonth) {
  // Chiamata ajax per comunicare con API
  $.ajax(
    {
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      data: {
        'year': 2018,
        'month': selectedMonth - 1
      },
      success: function (data) {
      var result = data.response;
      console.log(result);

      for (var i = 0; i < result.length; i++) {
        var holidayDate=result[i].date;
        console.log(holidayDate);
        
        var holidayName=result[i].name;
        console.log(holidayName);
        
      }

      $('li[data-holiday]').each(function(){
        if ($(this).attr('data-holiday')==holidayDate) {
          var holidayDay = $(this).text();
          $(this).text(holidayDay+ " "+holidayName)
          $(this).addClass("red");
        }
      });

      },
      error: function () {
        alert('Ops! Si è verificato un errore.');
      }
    }
   ); // ajax  
} // fun checkHoliday



// MILESTONE #2

// Funzione - visualizzo mesi successivi a quello corrente
// Creo evento click su freccia .next
//    ---> vado al mese successivo (aggiungo +1 mese)
//    ---> chiamo funzione che stampa i giorni del mese
//    ---> chiamo funzione che stampa le festività
$('.next').click(function () {
  if ( currentDate.month() < 11 ) {
    $('#monthDays').children().remove();
    currentDate = currentDate.add(1, 'M');
    printMonth(currentDate);
    checkHoliday(currentDate);  
  }  
}); // fun next month


// Funzione - visualizzo mesi precedenti a quello corrente
// Creo evento click su freccia .prev
//    ---> vado al mese precedente (sottraggo -1 mese)
//    ---> chiamo funzione che stampa i giorni del mese
//    ---> chiamo funzione che stampa le festività
$('.prev').click(function () {
  if ( currentDate.month() > 0 ) {
    $('#monthDays').children().remove();
    currentDate = currentDate.subtract(1, 'M');
    printMonth(currentDate);
    checkHoliday(currentDate);  
  }  
}); // fun previous month
















  

}); // document ready
