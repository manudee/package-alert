$('#loginForm').submit(function(event){
	console.log("hello!")
	event.preventDefault();
	
	var userName= $("#username").val().trim();
	var password= $("#password").val().trim();

	console.log(userName);
	console.log(password);

	$.ajax({

		url:'http://localhost:8081/authenticate',
		method:"POST",
		data: {
				userName:userName,
				password:password

		},

		dataType:'json'
	})




})