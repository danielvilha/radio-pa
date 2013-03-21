function radio() {

	//-------------------------------------------------- CREATING TITANIUM.UI

	//-------------------------------------------------- CREATE WINDOW
	var self = Ti.UI.createWindow({
		exitOnClose : true,
		backgroundImage : 'background.jpg',
		width : 'auto',
		heigth : 'auto',
		fullscreen : true,
		navBarHidden : true
	});

	self.postlayout = false;

	var imageLogo = Titanium.UI.createImageView({
		top : 0,
		height : 180,
		width : '100%',
		zIndex : 9
	});

	//--------------------------------------------------//--------------------------------------------------
	var pauseResumeButton = Titanium.UI.createButton({
		enabled : false,
		zIndex : 9
	});

	var labelMore = Ti.UI.createLabel({
		color : '#FFFF',
		font : {
			fontSize : 52
		},
		text : '+',
		zIndex : 12
	});

	var labelLess = Ti.UI.createLabel({
		color : '#FFFF',
		font : {
			fontSize : 52
		},
		text : '-',
		zIndex : 12
	});

	var volumeSlider = Ti.UI.createSlider({
		value : 100,
		min : 0,
		max : 100,
		zIndex : 9
	});

	var viewButtons = Ti.UI.createView({
		width : '75%',
		height : '12%',
		bottom : 0
	})
	//--------------------------------------------------//--------------------------------------------------

	if (self.getOrientation() == Ti.UI.PORTRAIT) {
		imageLogo.backgroundImage = 'logoP.png';

		pauseResumeButton.backgroundImage = 'play.png';
		pauseResumeButton.height = '70%';
		pauseResumeButton.width = '20%';
		pauseResumeButton.left = '1%';

		labelMore.right = '2%';

		labelLess.left = '23%';

		volumeSlider.width = '59%';
		volumeSlider.right = '10%';
	} else {
		imageLogo.backgroundImage = 'logoL.png';

		pauseResumeButton.backgroundImage = 'play.png';
		pauseResumeButton.height = '95%';
		pauseResumeButton.width = '10%';
		pauseResumeButton.left = '4%';

		labelMore.right = '8%';

		labelLess.left = '16%';

		volumeSlider.width = '65%';
		volumeSlider.right = '14%';
	}

	//-------------------------------------------------- CREATE LABEL COPYRIGHT *
	var labelCopyright = Ti.UI.createLabel({
		color : '#FFFF',
		font : {
			fontSize : 12
		},
		text : 'Produzido por: MegaMidia Group',
		right : 10,
		bottom : 5,
		zIndex : 12
	});

	//-------------------------------------------------- EVENTLISTENER ORIENTATION
	Titanium.Gesture.addEventListener('orientationchange', function(e) {
		switch(e.orientation) {
			case Ti.UI.PORTRAIT:
				imageLogo.backgroundImage = 'logoP.png';

				pauseResumeButton.backgroundImage = 'play.png';
				pauseResumeButton.height = '70%';
				pauseResumeButton.width = '20%';
				pauseResumeButton.left = '1%';

				labelMore.right = '2%';

				labelLess.left = '23%';

				volumeSlider.width = '59%';
				volumeSlider.right = '10%';
				break;
			case Ti.UI.LANDSCAPE_LEFT:
			case Ti.UI.LANDSCAPE_RIGHT:
				imageLogo.backgroundImage = 'logoL.png';

				pauseResumeButton.backgroundImage = 'play.png';
				pauseResumeButton.height = '95%';
				pauseResumeButton.width = '10%';
				pauseResumeButton.left = '4%';

				labelMore.right = '8%';

				labelLess.left = '16%';

				volumeSlider.width = '65%';
				volumeSlider.right = '14%';
				break;
		}
	});

	viewButtons.add(pauseResumeButton);
	viewButtons.add(labelMore);
	viewButtons.add(labelLess);
	viewButtons.add(volumeSlider);
	self.add(imageLogo);
	self.add(labelCopyright);
	self.add(viewButtons);

	//-------------------------------------------------- EVENTLISTENER
	//-------------------------------------------------- PLAUSE---------------------------------------------------
	pauseResumeButton.addEventListener('click', function() {
		if (audioPlayer.paused) {
			pauseResumeButton.backgroundImage = 'pause.png';
			audioPlayer.start();
		} else {
			pauseResumeButton.backgroundImage = 'play.png';
			audioPlayer.pause();
		}
	});

	//-------------------------------------------------- VOLUME---------------------------------------------------
	volumeSlider.addEventListener('change', function(e) {
		audioPlayer.volume = e.value / 100
	});

	//-------------------------------------------------- PLAYER----------------------------------------------------
	var button = ['LOUNGE', 'ROCK', 'MPB', 'POP'];
	var startStopButton = [];
	var cont = 28;
	var top = [];

	var urlStream = ['http://200.195.168.12:9191', 'http://200.195.168.12:9292', 'http://200.195.168.12:9393', 'http://200.195.168.12:9494'];

	var audioPlayer = Ti.Media.createAudioPlayer({
		url : urlStream[0],
		allowBackground : true
	});

	for (var i = 0, s = button.length; i < s; i++) {
		var objectButton = Ti.UI.createButton({
			title : button[i],
			backgroundImage : 'buttonOff.jpg',
			selectedColor : '#EDDA74',
			top : cont + '%',
			font : {
				fontSize : '38%',
				fontFamily : 'timesnewroman'
			},
			color : '#EDDA74'
		});

		cont += 15;
		top[i] = objectButton.top;
		Ti.API.info('--------------------------------------> objectButton.getCenter ' + i + ' : ' + objectButton.getCenter);
		startStopButton.push(objectButton);

		if (self.getOrientation() == Ti.UI.PORTRAIT) {
			startStopButton[i].height = '14%';
			startStopButton[i].width = '75%';
			startStopButton[i].left = null;
			startStopButton[i].right = null;

			startStopButton[i].top = top[i];
		} else {
			startStopButton[i].height = '13%';
			startStopButton[i].width = '38%';
			switch(i) {
				case 0:
					startStopButton[i].top = top[1];
					startStopButton[i].left = '10%';
					break;
				case 1:
					startStopButton[i].top = top[1];
					startStopButton[i].right = '10%';
					break;
				case 2:
					startStopButton[i].top = top[2];
					startStopButton[i].left = '10%';
					break;
				case 3:
					startStopButton[i].top = top[2];
					startStopButton[i].right = '10%';
					break;
			}
		};

		startStopButton[i].urlStream = urlStream[i];
		startStopButton[i].addEventListener('click', function(e) {
			if (Ti.Network.online == false) {
				alert('Está aplicação necessita de uma conexão Internet para funcionar: Favor verefique sua conexão.');
			} else {
				for (var i = 0, s = startStopButton.length; i < s; i++) {
					startStopButton[i].backgroundImage = 'buttonOff.jpg';
				}
				if (audioPlayer.playing || audioPlayer.paused) {
					if (audioPlayer.url == e.source.urlStream) {
						audioPlayer.release();
						e.source.backgroundImage = 'buttonOff.jpg';
						pauseResumeButton.backgroundImage = 'play.png';
						pauseResumeButton.enabled = false;
					} else {
						audioPlayer.release();
						audioPlayer.url = e.source.urlStream;
						e.source.backgroundImage = 'buttonOn.jpg';
						pauseResumeButton.backgroundImage = 'pause.png';
						pauseResumeButton.enabled = true;
						audioPlayer.start();
					}
				} else {
					audioPlayer.url = e.source.urlStream;
					e.source.backgroundImage = 'buttonOn.jpg';
					pauseResumeButton.backgroundImage = 'pause.png';
					pauseResumeButton.enabled = true;
					audioPlayer.start();
				}
			}
		});

		self.add(startStopButton[i]);
	}

	Titanium.Gesture.addEventListener('orientationchange', function(e) {
		switch(e.orientation) {
			case Ti.UI.PORTRAIT:
				for (var i = 0, s = button.length; i < s; i++) {
					startStopButton[i].height = '14%';
					startStopButton[i].width = '75%';
					startStopButton[i].top = top[i];
					startStopButton[i].left = null;
					startStopButton[i].right = null;
				};
				break;

			case Ti.UI.LANDSCAPE_LEFT:
			case Ti.UI.LANDSCAPE_RIGHT:
				for (var i = 0, s = button.length; i < s; i++) {
					startStopButton[i].height = '13%';
					startStopButton[i].width = '38%';
				};
				startStopButton[0].top = top[1];
				startStopButton[1].top = top[1];
				startStopButton[2].top = top[2];
				startStopButton[3].top = top[2];
				startStopButton[0].left = '10%';
				startStopButton[1].right = '10%';
				startStopButton[2].left = '10%';
				startStopButton[3].right = '10%';
				break;
		}
	});

	//--------------------------------------------------------------------------------------------
	return self;
}

module.exports = radio;
