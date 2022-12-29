function calculate() {
    var number1 = parseFloat(document.getElementById("num1").value, 10);
    var number2 = parseFloat(document.getElementById("num2").value, 10);
    var number3 = parseFloat(document.getElementById("num3").value, 10);
    
    if ((isNaN(number1)) || (isNaN(number2)) || (isNaN(number3)))
    {
        window.alert("Please enter 3 numbers, put one complete integer in each of the 3 text fields");
    }

    var max = 0;
    var min = 0;
    var range = 0;
    var median = 0;
    var mean = 0;
    //min calculation
    if (number1 < number2) 
    {
        if (number1 < number3)
            min = number1;
        else
            min = number3;
    } 
    else if (number2 < number3)
        min = number2;
    else
        min = number3;
    //max calculation
    if (number1 > number2) 
    {
        if (number1 > number3)
            max = number1;
        else
            max = number3;
    } 
    else if (number2 > number3)
        max = number2;
    else
        max = number3
    //range calculation
    range = max - min;
    //mean calculation
    mean = (number1 + number2 + number3) / 3;
    //median calculation
    median = (number1 + number2 + number3) - (min + max);
    //changes html elements based on calculation results
    document.getElementById("min").innerHTML = "Min: " + "<br>" + min.toFixed(1);
    document.getElementById("max").innerHTML = "Max: " + "<br>" + max.toFixed(1);
    document.getElementById("range").innerHTML = "Range: " + "<br>" + range.toFixed(1);
    document.getElementById("mean").innerHTML = "Mean: " + "<br>" + mean.toFixed(1);
    document.getElementById("median").innerHTML = "Median: " + "<br>" + median.toFixed(1);
}