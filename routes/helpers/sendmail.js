var helper = require('sendgrid').mail;
var sg = require('sendgrid').SendGrid("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");


function getWelcomeMail(data) {
	
}

function getRegistrationMail(data){
	var reglink = "localhost:3000/login/register/"+data.register;

	var h = "<h3>Hej!</h3>"+
			"<br><p>Ett konto i ditt namn har skapats följ länk fall du vill fortsätta annars ignorera så tas kontot bort</p>"+
			"<a href='"+reglink+"'>"+reglink+"</a>";

	return h;
}

exports.send = function(data, done){
	var from_email, to_email, subject, content, mail;

	to_email = new helper.Email();
	to_email.email = data.to;

	if(data.register == undefined) { //welcome
		from_email = new helper.Email("norr@gmail.com");
		subject = "Välkommen till Norr!";
		content = new helper.Content("text/html", getWelcomeMail(data));
	}
	else { //registration
		from_email = new helper.Email("noreply@norr.se");
		subject = "Registrering länk";
		content = new helper.Content("text/html", getRegistrationMail(data));
	}
	mail = new helper.Mail(from_email, subject, to_email, content);

	var errors = {
		400: "400 - BAD REQUEST",
		401: "401 - UNAUTHORIZED",
		403: "403 - FORBIDDEN",
		404: "404 - NOT FOUND",
		405: "405 - METHOD NOT ALLOWED",
		413: "413 - PAYLOAD TOO LARGE",
		429: "429 - TOO MANY REQUESTS",
		500: "500 - SERVER ERROR",
		503: "503 - SEVICE NOT AVAILABLE"
	}
	
	var requestBody = mail.toJSON()

	var request = sg.emptyRequest()
	request.method = 'POST'
	request.path = '/v3/mail/send'
	request.body = requestBody
	sg.API(request, function (response) {
		if(response.statusCode >= 400){
	      //error
	      done(errors[response.statusCode])
	    } else done(null);
	});
}