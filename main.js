/*
 * Gmail Message Length Checker
 * (c) Neil Gupta 2011
 * https://github.com/neilgupta/Gmail-Message-Length-Checker/
 *
 * Displays how long your email will take to read.
 *
 */

// calculates reading length of email, 
// using equation from http://www.leancrew.com/all-this/2011/06/reading-time-in-textmate/
$("textarea[name='body']").live("keyup blur",function() {
	var	str = $.trim($(this).val()),
		wc = str === "" ? 0 : str.split(" ").length, // calculate word count
		min = Math.floor(wc/250),
		sec = pad(new Number((wc % 250)/250*60).toFixed(), "0", 2),
		$container = $(this).parents("table").prev().find("tr").children().last(),
		$time = $container.find("span#metamorphium-time");
	
	if ($time.length === 0)
		// add our notice element to the DOM, right next to the "Check Spelling" button in Gmail
		$time = $("<span id='metamorphium-lengthnotice'>Email will take <span id='metamorphium-time'></span> to read.</span>")
					.prependTo($container).find("span#metamorphium-time");

	// update text
	$time.text(min+":"+sec);

	// show red warning if email will take more than 30 seconds to read
	if (min > 0 || (wc % 250)/250 > 0.5)
		$time.addClass("metamorphium-warning");
	else
		$time.removeClass("metamorphium-warning");
});

var pad = function (val, pad, size) { while (val.length < size) val = pad + val; return val; };

// Commented out because I could not figure out how to prevent Gmail from sending the email 
// after send button had been pushed.
/*
$("div[role='navigation'] div[role='button']:contains('Send')").live("click", function() {
	var	str = $.trim($(this).val()),
		wc = str === "" ? 0 : str.split(" ").length, // calculate word count
		min = Math.floor(wc/250),
		sec = pad(new Number((wc % 250)/250*60).toFixed(), "0", 2),

	if (min > 0 || (wc % 250)/250 > 0.5)
		return !confirm("Your email will take "+min+":"+sec+" to read! Consider making it shorter?"+'\n'+
						'\n'+"Press OK to edit your email, press Cancel to send anyway.");
});
*/