$(function() {


	$("body").on("click",".notPickedUp", function(event) {
		event.preventDefault();
		var id = $(this).data("id");
		var buttonId = $(this).attr('id');
		console.log("buttonId is " + buttonId);
		var url = '/api/packages/associate/'+ id;

		var associatePkgState = {

			pickUpDate: new Date(),
			status: 1

		}




		$.ajax(url, {

			type: "PUT",
			data: associatePkgState
		}).then(
		function() {
			console.log("changed package state to ", associatePkgState);



			// location.reload();

		});

	});

	$("body").on('click','#sendAll',function(event){
		event.preventDefault();
		$.ajax('/api/packages/sendAlert',{
			type: "GET"
		}).then(function(){
			console.log('email send');
		})
	})

});