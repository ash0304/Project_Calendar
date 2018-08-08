/*  calendar.js   */
var daysInMonthLeap = [31,29,31,30,31,30,31,31,30,31,30,31];  //潤年
var daysInMonthNormal=[31,28,31,30,31,30,31,31,30,31,30,31];  // 非潤年
var monthName=["January","Febrary","March","April","May","June","July","Auguest","September","October","November","December"];
var container = document.getElementById("days");
var titleMonth = document.getElementById("calendarmonth");
var titleYear = document.getElementById("calendaryear");
var prevMonth = document.getElementById("prev");
var nextMonth = document.getElementById("next");
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();

//得到某年某月的第一天是星期幾 ,使用getDay()方法 , 星期天到星期六，對應到0 - 6 
// 語法 :  Date.getDay()
function startDay(year, month){        
    var tmp = new Date(year, month, 1);
    return (tmp.getDay());
}
//判断是否為潤年，得到該月有幾日
//能被4整除而不能被100整除的，或者是能被400整除的
//設定兩個判定條件的原因：如1800年不是潤年，但能被4整除
function daysOfMonth(year, month){
    if( (year%4==0 && year%100!=0 )|| year%400==0 ){
        return (daysInMonthLeap[month]);
    }else{
        return (daysInMonthNormal[month]);
    }
}
function generateDate(){
    var displayStr="";
    var daysSum = daysOfMonth(my_year, my_month);
    var firstDay = startDay(my_year, my_month);
    var myclass;
    for(var i=0; i<firstDay; i++){
        displayStr += "<li></li>"; 
    }
    for(var i=1; i<=daysSum; i++){
        if( (i<my_day && my_year==my_date.getFullYear()&&my_month==my_date.getMonth()) ||my_year<my_date.getFullYear() ||(my_year==my_date.getFullYear()&&my_month<my_date.getMonth())){
            myclass = " class='darkpink'";   //當天之前
        }else if ( i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
            myclass = " class='darkpink todaybox'";    //當天
        }else{
            myclass = " class='darkpink'";       // 當天之後
        }
        displayStr += "<li" + myclass + ">" + i +"</li>"; 
    }
    container.innerHTML = displayStr;
    titleMonth.innerHTML = monthName[my_month];
    titleYear.innerHTML= my_year;
}
generateDate();

// Prev & Next Setting
prevMonth.onclick = function(ev){
    ev.preventDefault();
    my_month--;
    if(my_month<0){
        my_year--;
        my_month = 11;
    }
    generateDate();
}
nextMonth.onclick = function(ev){
    ev.preventDefault();
    my_month++;
    if(my_month>11){
        my_year++;
        my_month=0;
    }
    generateDate();
}