$(function() {


	$("body").on("click",".notPickedUp", function(event) {
		event.preventDefault();
		var id = $(this).data("id");
		var buttonId = $(this).attr('id');
		console.log("buttonId is " + buttonId);


		var associatePkgState = {

			pickUpDate: new Date(),
			status: 1

		}



		$.ajax("/api/packages/associate/" + id, {
			type: "PUT",
			data: associatePkgState
		}).then(
		function() {
			console.log("changed package state to ", associatePkgState);



			location.reload();

		});

	});

});