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
	var image;
	var prButtonH;
	var prButtonW;
	var prButtonLeft;
	
	if(self.getOrientation() === Ti.UI.PORTRAIT) {
		image = 'logoP.png';
		prButtonH = '8%';
		prButtonW = '11%';
		prButtonLeft = '10%';
	} else {
		image = 'logoL.png';
		prButtonH = '11%';
		prButtonW = '8%';
		prButtonLeft = '25%';
	}

	//-------------------------------------------------- CREATE IMAGE LOGO *
	var imageLogo = Titanium.UI.createImageView({
		backgroundImage : image,
		top : 0,
		height : 180,
		width : '100%',
		zIndex : 9
	});
	
	//-------------------------------------------------- CREATE LABEL COPYRIGHT *
	var labelCopyright = Ti.UI.createLabel({
		color : '#FFFF',
		font : {
			fontSize : 12
		},
		text : 'Produzido por: MegaMidia Group',
		right : 10,
		bottom : 10,
		zIndex : 12
	});
	
	//-------------------------------------------------- CREATE PAUSE AND RESUME BUTTON
	var pauseResumeButton = Titanium.UI.createButton({
		backgroundImage : 'play.png',
		enabled : false,
		heigth : prButtonH,
		width : prButtonW,
		left : prButtonLeft,
		bottom : 2,
		zIndex : 9
	});
	
	//-------------------------------------------------- CREATE LABEL SYMBOL +
	var labelMore = Ti.UI.createLabel({
		color : '#FFFF',
		font : {
			fontSize : 52
		},
		text : '+',
		right : '34%',
		bottom : 10,
		zIndex : 12
	});
	
	//-------------------------------------------------- CREATE LABEL SYMBOL -
	var labelLess = Ti.UI.createLabel({
		color : '#FFFF',
		font : {
			fontSize : 52
		},
		text : '-',
		left : '34%',
		bottom : 13,
		zIndex : 12
	});
	
	//-------------------------------------------------- CREATE VOLUME BUTTON
	var volumeSlider = Ti.UI.createSlider({
		width : '25%',
		bottom : 30,
		value : 100,
		min : 0,
		max : 100,
		zIndex : 9
	});
	
	//-------------------------------------------------- EVENTLISTENER ORIENTATION
	Titanium.Gesture.addEventListener('orientationchange', function(e){
		switch(e.orientation){
			case Ti.UI.PORTRAIT:
				imageLogo.backgroundImage = 'logoP.png';
				pauseResumeButton.height = '8%';
            	pauseResumeButton.width = '11%';
            	pauseResumeButton.left = '10%';
			break;
			case Ti.UI.LANDSCAPE_LEFT:
            case Ti.UI.LANDSCAPE_RIGHT:
            	imageLogo.backgroundImage = 'logoL.png';
            	pauseResumeButton.height = '11%';
            	pauseResumeButton.width = '8%';
            	pauseResumeButton.left = '25%';
            break;
       	}
	});
	
	self.add(imageLogo);
	self.add(labelCopyright);
	self.add(pauseResumeButton);
	self.add(labelMore);
	self.add(labelLess);
	self.add(volumeSlider);
	
	//--------------------------------------BACKGROUND INTERATIVO------------------------------------------
	// var dir = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory + 'images/').getDirectoryListing();
	// load images
	// var images = [];
	// for (var file in dir) {if (dir[file].split(".")[1] === "jpg") {images.push('images/' + dir[file]);};}
	//
	// CREATE IMAGE VIEW
	// var imageView = Titanium.UI.createImageView({images : images, duration : 60, repeatCount : 0, top : 0, right : 0, left : 0, width : '200%', height : '200%'});
	// imageView.start();
	// self.add(imageView);
	//------------------------------------------------------------------------------------------------------

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
			height : '13%',
			center : '50%',
			top : cont + '%',
			font : {
				fontSize : '38%',
				fontFamily : 'timesnewroman'
			},
			color : '#EDDA74',
			width : '30%'
		});

		cont += 15;
		self.add(objectButton);
		startStopButton.push(objectButton);
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
	}

	//--------------------------------------------------------------------------------------------
	return self;
}

module.exports = radio;
