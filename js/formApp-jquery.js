$(document).ready(function () {

	// process the form
	$('form').submit(function (event) {

		//		after clicking
		$('.form-group').removeClass('has-error'); // remove the error class
		$('.error-text').remove(); // remove the error text
		$('.submissionMessage').remove();   // remove the success text
		
		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = {
			'name'		: $('input[name=name]').val(),
			'email'		: $('input[name=email]').val(),
			'message'	: $('textarea[name=message]').val(),
			'exam'		: $('input[name=exam]').val()
		};

		// process the form
		$.ajax({
			type		: 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url			: 'process.php', // the url where we want to POST
			data		: formData, // our data object
			dataType	: 'json', // what type of data do we expect back from the server
			encode		: true
		})
			// using the done promise callback
			.done(function (data) {

				// log data to the console so we can see
				console.log(data);

				// here we will handle errors and validation messages
				if (!data.success) {
					
					$('form').append('<div class="submissionMessage">' + data.formError + '</div>');
					
					// handle errors for name ---------------
					if (data.errors.name) {
						$('#name-group').addClass('has-error'); // add the error class to show red input
						$('#name-group').append('<div class="error-text">' + data.errors.name + '</div>'); // add the actual error message under our input
					}

					// handle errors for email ---------------
					if (data.errors.email) {
						$('#email-group').addClass('has-error'); // add the error class to show red input
						$('#email-group').append('<div class="error-text">' + data.errors.email + '</div>'); // add the actual error message under our input
					}

					// handle errors for message  ---------------
					if (data.errors.message) {
						$('#message-group').addClass('has-error'); // add the error class to show red input
						$('#message-group').append('<div class="error-text">' + data.errors.message + '</div>'); // add the actual error message under our input
					}
					
					// handle errors for canned, pre-cooked meat  ---------------
					if (data.errors.exam) {
						$('#exam-group').addClass('has-error'); // add the error class to show red input
						$('#exam-group').append('<div>' + data.errors.exam + '</div>'); // add the actual error message under our input
					}

				} else {

					// ALL GOOD! just show the success message!
					$('form').append('<div class="submissionMessage">' + data.formSuccess + '</div>');

				}
			})

			// using the fail promise callback
			.fail(function (data) {

				// show any errors
				// best to remove for production
				console.log(data);
			});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});

});