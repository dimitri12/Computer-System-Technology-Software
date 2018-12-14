app.get('/evaluationQ1', function(req,res){
	var q1 = question.getEvaluationQuestion(req.reference, 1);
	//var q2 = question.getEvaluationQuestion(req.reference, 2);
	//var q3 = question.getEvaluationQuestion(req.reference, 3);
	//var q4 = question.getEvaluationQuestion(req.reference, 4);
	//var q5 = question.getEvaluationQuestion(req.reference, 5);

res.write('<html> '+
+'<head>'+
+'<SCRIPT type="text/javascript">'+
    +'window.history.forward();'+
    +'function noBack() { window.history.forward(); }'+
+'</SCRIPT>'+
+'</head>'+
+'<BODY onload="noBack();" '+
    +'onpageshow="if (event.persisted) noBack();" onunload="">');

res.write('<B>Utvärdeingar med emojis, Högskolan i Halmstad av Dimitri Gharam</B><P>"';
res.write('<FORM action="/question1" href="/evaluationQ2">');
if(question.getEvaluationQuestionLength==0){
	res.write("<B>Tycker du att föreläsningen var intressant?</B><P>");
}
else{
res.write("<B> "+ q1 +"?""</B><P>");
}
res.write('<INPUT TYPE="radio" NAME="answer" value="1" id="a1">&#x1F600<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="2" id="a2">&#x1F611<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="3" id="a3">&#x1F615<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="4" id="a4">&#x1F627<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="5" id="a5">&#x1F621<BR>');
res.write('<input type="submit" value="Nästa fråga" />');
res.write("</FORM>");
res.write("</body>
</html>");
});

app.post('/question1', function(req,res){
	if(req.body.answer == 1){
		var answer = req.body.answer;
	}
	if(req.body.answer == 2){
		var answer = req.body.answer;
	}
	if(req.body.answer == 3){
		var answer = req.body.answer;
	}
	if(req.body.answer == 4){
		var answer = req.body.answer;
	}
	if(req.body.answer == 5){
		var answer = req.body.answer;
	}
	
    app.set('answer1', answer);
	//insertEvaluationResults(evData.information, user.local.username, 1, answer);
});

app.get('/evaluationQ2', function(req,res){
	//var q1 = question.getEvaluationQuestion(req.reference, 1);
	var q2 = question.getEvaluationQuestion(req.reference, 2);
	//var q3 = question.getEvaluationQuestion(req.reference, 3);
	//var q4 = question.getEvaluationQuestion(req.reference, 4);
	//var q5 = question.getEvaluationQuestion(req.reference, 5);

res.write('<html> '+
+'<head>'+
+'<SCRIPT type="text/javascript">'+
    +'window.history.forward();'+
    +'function noBack() { window.history.forward(); }'+
+'</SCRIPT>'+
+'</head>'+
+'<BODY onload="noBack();" '+
    +'onpageshow="if (event.persisted) noBack();" onunload="">');

res.write('<FORM action="/question2" href="/evaluationQ3">');
if(question.getEvaluationQuestionLength<1){
	res.write("<B>Beskriv föreläsningen med ett svarsalternativ</B><P>");
}
else{
res.write("<B> "+ q2 +"?""</B><P>");
}
res.write('<INPUT TYPE="radio" NAME="answer" value="1" id="a1">&#x1F600<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="2" id="a2">&#x1F611<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="3" id="a3">&#x1F615<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="4" id="a4">&#x1F627<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="5" id="a5">&#x1F621<BR>');
res.write('<input type="submit" value="Nästa fråga" />');
res.write("</FORM>");
res.write("</body>
</html>");
});

app.post('/question2', function(req,res){
	if(req.body.answer == 1){
		var answer = req.body.answer;
	}
	if(req.body.answer == 2){
		var answer = req.body.answer;
	}
	if(req.body.answer == 3){
		var answer = req.body.answer;
	}
	if(req.body.answer == 4){
		var answer = req.body.answer;
	}
	if(req.body.answer == 5){
		var answer = req.body.answer;
	}
	app.set('answer2', answer);
	//insertEvaluationResults(evData.information, user.local.username, 2, answer);
});

app.get('/evaluationQ3', function(req,res){
	//var q1 = question.getEvaluationQuestion(req.reference, 1);
	//var q2 = question.getEvaluationQuestion(req.reference, 2);
	var q3 = question.getEvaluationQuestion(req.reference, 3);
	//var q4 = question.getEvaluationQuestion(req.reference, 4);
	//var q5 = question.getEvaluationQuestion(req.reference, 5);

res.write('<html> '+
+'<head>'+
+'<SCRIPT type="text/javascript">'+
    +'window.history.forward();'+
    +'function noBack() { window.history.forward(); }'+
+'</SCRIPT>'+
+'</head>'+
+'<BODY onload="noBack();" '+
    +'onpageshow="if (event.persisted) noBack();" onunload="">');

res.write('<FORM action="/question3" href="/evaluationQ4">');
if(question.getEvaluationQuestionLength<2 || question.getEvaluationQuestionLength==0){
	res.write("<B>Beskriv lärarens undervisning med ett svarsalternativ</B><P>");
}
else{
res.write("<B> "+ q3 +"?""</B><P>");
}
res.write('<INPUT TYPE="radio" NAME="answer" value="1" id="a1">&#x1F600<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="2" id="a2">&#x1F611<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="3" id="a3">&#x1F615<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="4" id="a4">&#x1F627<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="5" id="a5">&#x1F621<BR>');
res.write('<input type="submit" value="Nästa fråga" />');
res.write("</FORM>");
res.write("</body>
</html>");
});

app.post('/question3', function(req,res){
	if(req.body.answer == 1){
		var answer = req.body.answer;
	}
	if(req.body.answer == 2){
		var answer = req.body.answer;
	}
	if(req.body.answer == 3){
		var answer = req.body.answer;
	}
	if(req.body.answer == 4){
		var answer = req.body.answer;
	}
	if(req.body.answer == 5){
		var answer = req.body.answer;
	}
	app.set('answer3', answer);
	//insertEvaluationResults(evData.information, user.local.username, 3, answer);
});

app.get('/evaluationQ4', function(req,res){
	//var q1 = question.getEvaluationQuestion(req.reference, 1);
	//var q2 = question.getEvaluationQuestion(req.reference, 2);
	//var q3 = question.getEvaluationQuestion(req.reference, 3);
	var q4 = question.getEvaluationQuestion(req.reference, 4);
	//var q5 = question.getEvaluationQuestion(req.reference, 5);

res.write('<html> '+
+'<head>'+
+'<SCRIPT type="text/javascript">'+
    +'window.history.forward();'+
    +'function noBack() { window.history.forward(); }'+
+'</SCRIPT>'+
+'</head>'+
+'<BODY onload="noBack();" '+
    +'onpageshow="if (event.persisted) noBack();" onunload="">');

res.write('<FORM action="/question4" href="/evaluationQ5">');
if(question.getEvaluationQuestionLength<3 || question.getEvaluationQuestionLength==0){
	res.write("<B>Beskriv föreläsningen med ett svarsalternativ</B><P>");
}
else{
res.write("<B> "+ q4 +"?""</B><P>");
}
res.write('<INPUT TYPE="radio" NAME="answer" value="1" id="a1">&#x1F600<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="2" id="a2">&#x1F611<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="3" id="a3">&#x1F615<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="4" id="a4">&#x1F627<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="5" id="a5">&#x1F621<BR>');
res.write('<input type="submit" value="Nästa fråga" />');
res.write("</FORM>");
res.write("</body>
</html>");
});

app.post('/question4', function(req,res){
	if(req.body.answer == 1){
		var answer = req.body.answer;
	}
	if(req.body.answer == 2){
		var answer = req.body.answer;
	}
	if(req.body.answer == 3){
		var answer = req.body.answer;
	}
	if(req.body.answer == 4){
		var answer = req.body.answer;
	}
	if(req.body.answer == 5){
		var answer = req.body.answer;
	}
	app.set('answer4', answer);
	//insertEvaluationResults(evData.information, user.local.username, 4, answer);
});

app.get('/evaluationQ5', function(req,res){
	//var q1 = question.getEvaluationQuestion(req.reference, 1);
	//var q2 = question.getEvaluationQuestion(req.reference, 2);
	//var q3 = question.getEvaluationQuestion(req.reference, 3);
	var q4 = question.getEvaluationQuestion(req.reference, 4);
	//var q5 = question.getEvaluationQuestion(req.reference, 5);

res.write('<html> '+
+'<head>'+
+'<SCRIPT type="text/javascript">'+
	+'window.history.forward();'+
	+'function noBack() { window.history.forward(); }'+
+'</SCRIPT>'+
+'</head>'+
+'<BODY onload="noBack();" '+
	+'onpageshow="if (event.persisted) noBack();" onunload="">');

res.write('<FORM action="/question5" href="/logout">');
if(question.getEvaluationQuestionLength<4 || question.getEvaluationQuestionLength==0){
	res.write("<B>Beskriv föreläsningen med ett svarsalternativ</B><P>");
}
else{
res.write("<B> "+ q5 +"</B><P>");
}
res.write('<INPUT TYPE="radio" NAME="answer" value="1" id="a1">&#x1F600<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="2" id="a2">&#x1F611<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="3" id="a3">&#x1F615<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="4" id="a4">&#x1F627<BR>');
res.write('<INPUT TYPE="radio" NAME="answer" value="5" id="a5">&#x1F621<BR>');
res.write('<input type="submit" value="Nästa fråga" />');
res.write("</FORM>");
res.write("</body>
</html>");
});

app.post('/question5', function(req,res){
	if(req.body.answer == 1){
		var answer = req.body.answer;
	}
	if(req.body.answer == 2){
		var answer = req.body.answer;
	}
	if(req.body.answer == 3){
		var answer = req.body.answer;
	}
	if(req.body.answer == 4){
		var answer = req.body.answer;
	}
	if(req.body.answer == 5){
		var answer = req.body.answer;
	}
	evAnswers.insertEvaluationResults(reference, user.local.username, req.app.get('answer1'), req.app.get('answer2'), req.app.get('answer3'), req.app.get('answer4'),answer);
	drive.insertStudentHasAnswered(reference,user.local.username);

});


app.get('/evResults', function(req,res){

	res.write('<html>'+
		+'<head>'+
		+'<Link rel="stylesheet" type="text/css" href="/views/evaluate.css" />'+
		+'<script src="general.js"></script>'+
		+'</head>'+
	+'<body>');
	res.write(''+
		+'<div id="header">'+
       +' <div class="logo"><a HREF="#"">Project <span>Evalu8</span></a></div>'+
   +' </div>'+
    +'<a class="mobile" href="#"">MENU</a>'+
    +'<div id="container">'+
        +'<div class="sidebar">'+
            +'<ul id="nav">'+
                +'<li><a class="selected" href="/profile">Start</a></li>'+
                +'<li><a href="/kurser">Kurser</a></li>'+
                +'<li><a href="/frågor">Frågor</a></li>'+
                +'<li><a href="evaluation.html">Utvärderingar</a></li>'+
            +'</ul>'+
       +' </div>');
	res.write('<div class="content">');
	res.write('<div id="box">');
	res.write("</div>");
	res.write('<div class="box-panel">')
	res.write('<form action="/plotGraph" method="post">'+
       +' <label for="EvaluationResult">Skapa Lösenord:</label>'+
        +'<input name="textbox1" type="text" id="var1" />'+
       +' <input type="submit" value="Enter" />'+
    +'</form>');
	res.write("</div>");
	res.write('<canvas id="myChart1" width="400" height="400"></canvas>');
	res.write('<script>'+
    +'var ctx = document.getElementById("myChart1");'+
    +'var myChart = new Chart(ctx, {'+
    +'type: "bar",'+
    +'data: {'+
        +'labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],'+
        +'datasets: [{'+
            +'label: "# of Votes",'+
            +'data: '+ req.result[0] +','+
            +'backgroundColor: ['+
                +'"rgba(255, 99, 132, 0.2)",'+
                +'"rgba(54, 162, 235, 0.2)",'+
                +'"rgba(255, 206, 86, 0.2)",'+
                +'"rgba(75, 192, 192, 0.2)",'+
                +'"rgba(153, 102, 255, 0.2)",'+
                +'"rgba(255, 159, 64, 0.2)"'+
            +'],'+
            +'borderColor: ['+
                +'"rgba(255,99,132,1)",'+
                +'"rgba(54, 162, 235, 1)",'+
                +'"rgba(255, 206, 86, 1)",'+
                +'"rgba(75, 192, 192, 1)",'+
                +'"rgba(153, 102, 255, 1)",'+
                +'"rgba(255, 159, 64, 1)"'+
            +'],'+
            +'borderWidth: 1'+
        +'}]'+
    +'},'+
    +'options: {'+
        +'scales: {'+
            +'yAxes: [{'+
                +'ticks: {'+
                    +'beginAtZero:true'+
                +'}'+
            +'}]'+
       +'}'+
    +'}'+
+'});'+
	+'</script>');
	res.write('<canvas id="myChart2" width="400" height="400"></canvas>');
	res.write('<script>'+
    +'var ctx = document.getElementById("myChart2");'+
    +'var myChart = new Chart(ctx, {'+
    +'type: "bar",'+
    +'data: {'+
        +'labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],'+
        +'datasets: [{'+
            +'label: "# of Votes",'+
            +'data: '+ req.result[1] +','+
            +'backgroundColor: ['+
                +'"rgba(255, 99, 132, 0.2)",'+
                +'"rgba(54, 162, 235, 0.2)",'+
                +'"rgba(255, 206, 86, 0.2)",'+
                +'"rgba(75, 192, 192, 0.2)",'+
                +'"rgba(153, 102, 255, 0.2)",'+
                +'"rgba(255, 159, 64, 0.2)"'+
            +'],'+
            +'borderColor: ['+
                +'"rgba(255,99,132,1)",'+
                +'"rgba(54, 162, 235, 1)",'+
                +'"rgba(255, 206, 86, 1)",'+
                +'"rgba(75, 192, 192, 1)",'+
                +'"rgba(153, 102, 255, 1)",'+
                +'"rgba(255, 159, 64, 1)"'+
            +'],'+
            +'borderWidth: 1'+
        +'}]'+
    +'},'+
    +'options: {'+
        +'scales: {'+
            +'yAxes: [{'+
                +'ticks: {'+
                    +'beginAtZero:true'+
                +'}'+
            +'}]'+
       +'}'+
    +'}'+
+'});'+
    +'</script>');
	res.write('<canvas id="myChart3" width="400" height="400"></canvas>');
	res.write('<script>'+
    +'var ctx = document.getElementById("myChart3");'+
    +'var myChart = new Chart(ctx, {'+
    +'type: "bar",'+
    +'data: {'+
        +'labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],'+
        +'datasets: [{'+
            +'label: "# of Votes",'+
            +'data: '+ req.result[2] +','+
            +'backgroundColor: ['+
                +'"rgba(255, 99, 132, 0.2)",'+
                +'"rgba(54, 162, 235, 0.2)",'+
                +'"rgba(255, 206, 86, 0.2)",'+
                +'"rgba(75, 192, 192, 0.2)",'+
                +'"rgba(153, 102, 255, 0.2)",'+
                +'"rgba(255, 159, 64, 0.2)"'+
            +'],'+
            +'borderColor: ['+
                +'"rgba(255,99,132,1)",'+
                +'"rgba(54, 162, 235, 1)",'+
                +'"rgba(255, 206, 86, 1)",'+
                +'"rgba(75, 192, 192, 1)",'+
                +'"rgba(153, 102, 255, 1)",'+
                +'"rgba(255, 159, 64, 1)"'+
            +'],'+
            +'borderWidth: 1'+
        +'}]'+
    +'},'+
    +'options: {'+
        +'scales: {'+
            +'yAxes: [{'+
                +'ticks: {'+
                    +'beginAtZero:true'+
                +'}'+
            +'}]'+
       +'}'+
    +'}'+
+'});'+
    +'</script>');
	res.write('<canvas id="myChart4" width="400" height="400"></canvas>');
res.write('<script>'+
    +'var ctx = document.getElementById("myChart4");'+
    +'var myChart = new Chart(ctx, {'+
    +'type: "bar",'+
    +'data: {'+
        +'labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],'+
        +'datasets: [{'+
            +'label: "# of Votes",'+
            +'data: '+ req.result[3] +','+
            +'backgroundColor: ['+
                +'"rgba(255, 99, 132, 0.2)",'+
                +'"rgba(54, 162, 235, 0.2)",'+
                +'"rgba(255, 206, 86, 0.2)",'+
                +'"rgba(75, 192, 192, 0.2)",'+
                +'"rgba(153, 102, 255, 0.2)",'+
                +'"rgba(255, 159, 64, 0.2)"'+
            +'],'+
            +'borderColor: ['+
                +'"rgba(255,99,132,1)",'+
                +'"rgba(54, 162, 235, 1)",'+
                +'"rgba(255, 206, 86, 1)",'+
                +'"rgba(75, 192, 192, 1)",'+
                +'"rgba(153, 102, 255, 1)",'+
                +'"rgba(255, 159, 64, 1)"'+
            +'],'+
            +'borderWidth: 1'+
        +'}]'+
    +'},'+
    +'options: {'+
        +'scales: {'+
            +'yAxes: [{'+
                +'ticks: {'+
                    +'beginAtZero:true'+
                +'}'+
            +'}]'+
       +'}'+
    +'}'+
+'});'+
    +'</script>');
	res.write('<canvas id="myChart5" width="400" height="400"></canvas>');	
	res.write('<script>'+
    +'var ctx = document.getElementById("myChart5");'+
    +'var myChart = new Chart(ctx, {'+
    +'type: "bar",'+
    +'data: {'+
        +'labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],'+
        +'datasets: [{'+
            +'label: "# of Votes",'+
            +'data: '+ req.result[4] +','+
            +'backgroundColor: ['+
                +'"rgba(255, 99, 132, 0.2)",'+
                +'"rgba(54, 162, 235, 0.2)",'+
                +'"rgba(255, 206, 86, 0.2)",'+
                +'"rgba(75, 192, 192, 0.2)",'+
                +'"rgba(153, 102, 255, 0.2)",'+
                +'"rgba(255, 159, 64, 0.2)"'+
            +'],'+
            +'borderColor: ['+
                +'"rgba(255,99,132,1)",'+
                +'"rgba(54, 162, 235, 1)",'+
                +'"rgba(255, 206, 86, 1)",'+
                +'"rgba(75, 192, 192, 1)",'+
                +'"rgba(153, 102, 255, 1)",'+
                +'"rgba(255, 159, 64, 1)"'+
            +'],'+
            +'borderWidth: 1'+
        +'}]'+
    +'},'+
    +'options: {'+
        +'scales: {'+
            +'yAxes: [{'+
                +'ticks: {'+
                    +'beginAtZero:true'+
                +'}'+
            +'}]'+
       +'}'+
    +'}'+
+'});'+
    +'</script>');

	res.write("</div>");
	res.write("</div>");
	res.write("</body>"+
	+"</html>");
});

app.post('/plotGraph', function(req,res){
		var result = evAnswers.getEvaluationResults(req.body.textbox1);
		var req.result = result;
});