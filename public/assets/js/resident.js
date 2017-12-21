$(function() {


	$("body").on("click",".notPickedUp", function(event) {
		event.preventDefault();
		var id = $(this).data("id");
		var buttonId = $(this).attr('id');
		console.log("buttonId is " + buttonId);
		var url = "/api/residents/packages/" + id;

		var residentPkgState = {

			pickUpDate: new Date(),
			status: 1

		}



		$.ajax(url, {
			type: "PUT",
			data: residentPkgState
		}).then(
		function() {
			console.log("changed package state to ", residentPkgState);



			location.reload();

		});

	});

});