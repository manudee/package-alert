$(function() {

	$("body").on("click",".pickedUp", function(event) {
		event.preventDefault();
		var id = $(this).data("id");

		var residentPkgState = {

			pickUpDate: new Date(),
			status: 1

		}



		$.ajax("/api/residents/packages/" + id, {
			type: "PUT",
			data: residentPkgState
		}).then(
		function() {
			console.log("changed package state to ", residentPkgState);

        location.reload();
    });

	});

});