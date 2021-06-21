var ac = {
// Let's initialize the alarm clock

	init : function() {
/* First we get the current time */

ac.chr = document.getElementById("chr");
ac.cmin = document.getElementById('cmin');
ac.csec = document.getElementById('csec');

		/* here we create the time picker - The hours, the minutes and the seconds */

		ac.thr = ac.createSel(23);
		document.getElementById('tpick-h').appendChild(ac.thr);
		ac.thm = ac.createSel(59);
		document.getElementById('tpick-m').appendChild(ac.thm);
		ac.ths = ac.createSel(59);
		document.getElementById('tpick-s').appendChild(ac.ths);

		// Creating the time picker - Set and Reset

		ac.tset = document.getElementById('tset');
		ac.tset.addEventListener('click', ac.set);
		ac.treset = document.getElementById('treset');
		ac.treset.addEventListener('click', ac.reset);

		// Alarm sound

		ac.sound = document.getElementById('alarm-sound');

		// Start the clock

		ac.alarm = null;
		setInterval(ac.tick, 1000);


	},

	// Support function - Create selector for Hour, Minutes, Seconds

	createSel : function (max) {

var selector = document.createElement('select');
		for(var i = 0; i <= max; i++){
var opt = document.createElement('option');
			i = ac.padzero(i);
			opt.value = i;
			opt.innerHTML = i;
			selector.appendChild(opt);
		}
		return selector
	},

// Support function - prepend hour, minutes, seconds with 0 if < 10

	padzero: function (num) {
if(num < 10) { num = "0" + num; }
		else { num = num.toString(); }
		return num;
	},

	// Updating the current time

	tick: function(){
//Current time
		var now = new Date();
		var hr = ac.padzero(now.getHours());
		var min = ac.padzero(now.getMinutes());
		var sec = ac.padzero(now.getSeconds());

		// Update the clock - HTML 

		ac.chr.innerHTML = hr;
		ac.cmin.innerHTML = min;
		ac.csec.innerHTML = sec;

		// Check and sound alarm

		if(ac.alarm != null){
now = hr + min + sec;
			if(now == ac.alarm){
if(ac.sound.paused) { ac.sound.play(); }
			}
		}



	},

	// Setting alarm

	set : function () {
ac.alarm = ac.thr.value + ac.thm.value + ac.ths.value;
		ac.thr.disabled = true;
		ac.thm.disabled = true;
		ac.ths.disabled = true;
		ac.tset.disabled = true;
		ac.treset.disabled = false;
	},

	// Reset Alarm

	reset : function() {
if(!ac.sound.paused) { ac.sound.pause(); }
		ac.alarm = null;
		ac.thr.disabled = false;
		ac.thm.disabled = false;
		ac.ths.disabled = false;
		ac.tset.disabled = false;
		ac.treset.disabled = true;
	}

};

// Start clock on Page Load
window.addEventListener('load', ac.init);
//  setTimeout( function(){ac.init()}, 4000);
