$(function() {
	var $pwdInput = $('#password'),
		$owl = $("#owl");

	$pwdInput.on('focus', function() {
		$owl.addClass('password');
	});
	$pwdInput.on('blur', function() {
		$owl.removeClass('password');
	});

});