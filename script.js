(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});


/* Contact Form */
$("#contactForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        cformError();
        csubmitMSG(false, "Please fill all fields!");
    } else {
        // everything looks good!
        event.preventDefault();
        csubmitForm();
    }
});

function csubmitForm() {
    // initiate variables with form content
    var name = $("#cname").val();
    var email = $("#cemail").val();
    var message = $("#cmessage").val();
    var terms = $("#cterms").val();
    $.ajax({
        type: "POST",
        url: "php/contactform-process.php",
        data: "name=" + name + "&email=" + email + "&message=" + message + "&terms=" + terms, 
        success: function(text) {
            if (text == "success") {
                cformSuccess();
            } else {
                cformError();
                csubmitMSG(false, text);
            }
        }
    });
}

function cformSuccess() {
    $("#contactForm")[0].reset();
    csubmitMSG(true, "Message Submitted!");
    $("input").removeClass('notEmpty'); // resets the field label after submission
    $("textarea").removeClass('notEmpty'); // resets the field label after submission
}

function cformError() {
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass();
    });
}

function csubmitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated";
    } else {
        var msgClasses = "h3 text-center";
    }
    $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
}


/* Privacy Form */
$("#privacyForm").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        pformError();
        psubmitMSG(false, "Please fill all fields!");
    } else {
        // everything looks good!
        event.preventDefault();
        psubmitForm();
    }
});

function psubmitForm() {
    // initiate variables with form content
    var name = $("#pname").val();
    var email = $("#pemail").val();
    var select = $("#pselect").val();
    var terms = $("#pterms").val();
    
    $.ajax({
        type: "POST",
        url: "php/privacyform-process.php",
        data: "name=" + name + "&email=" + email + "&select=" + select + "&terms=" + terms, 
        success: function(text) {
            if (text == "success") {
                pformSuccess();
            } else {
                pformError();
                psubmitMSG(false, text);
            }
        }
    });
}

function pformSuccess() {
    $("#privacyForm")[0].reset();
    psubmitMSG(true, "Request Submitted!");
    $("input").removeClass('notEmpty'); // resets the field label after submission
}

function pformError() {
    $("#privacyForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass();
    });
}

function psubmitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated";
    } else {
        var msgClasses = "h3 text-center";
    }
    $("#pmsgSubmit").removeClass().addClass(msgClasses).text(msg);
}


/* Back To Top Button */
// create the back to top button
$('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
var amountScrolled = 700;
$(window).scroll(function() {
    if ($(window).scrollTop() > amountScrolled) {
        $('a.back-to-top').fadeIn('500');
    } else {
        $('a.back-to-top').fadeOut('500');
    }
});


/* Removes Long Focus On Buttons */
$(".button, a, button").mouseup(function() {
    $(this).blur();
});

})(jQuery);

