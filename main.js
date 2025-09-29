$(function(){
    //표정에 따른 점수 변수
    let score;
    let eyeScore = 1;
    let eyebrowScore = 1;
    let mouthScore = 1;

    //Lp판 회전 관련 변수
    let degree = 0;
    let LpRotate;

    //음악 리스트
    let audios = [
        {
            audio: 'music/3.mp3',
            title: 'Clear Day',
            author: 'Benjamin Tissot'
        },
        {
            audio: 'music/4.mp3',
            title: 'Happy Rock',
            author: 'Benjamin Tissot'
        },
        {
            audio: 'music/5.mp3',
            title: 'Funday',
            author: 'Benjamin Tissot'
        },
        {
            audio: 'music/6.mp3',
            title: 'Going Higher',
            author: 'Benjamin Tissot'
        },
        {
            audio: 'music/7.mp3',
            title: 'Creative Minds',
            author: 'Benjamin Tissot'
        },
        {
            audio: 'music/8.mp3',
            title: 'Tomorrow',
            author: 'Benjamin Tissot'
        },
        {
            audio: 'music/9.mp3',
            title: 'Sad Day',
            author: 'Benjamin Tissot'
        }
    ]

    //현재 오디오
    let currentAudio = new Audio();

    //시작버튼 클릭
    $('#startBtn').click(function(){
        $('#start').addClass('start');
        $('#startLP').animate( {'left': 1280}, 2000);
        $('.start-container').delay(1700).fadeOut(300);
        $('#start').delay(1700).fadeOut(300);
        $('#LpFaceImg').delay(2000).animate( {'left': -736}, 600);
        $('.face').delay(2800).animate( {'opacity': 1}, 500);
        $('.removeRect').delay(2400).animate( {'opacity': 1}, 600);
    })

    //상단 화면 전환 아이콘 클릭(음표 아이콘, 눈알 아이콘)
    $('#playBtn, #stopBtn').click(function(){
        $('#LpImg').toggleClass('play');
        $('#LpFaceImg').toggleClass('play');
        $('#MusicInfo').toggleClass('play');
        $('#playBtn').toggleClass('play');
        $('#stopBtn').toggleClass('play');
        $('.face').toggleClass('play');
        $('#chooseSection').toggleClass('play');
        $('.secFace').toggleClass('play');
        $('#backColor').toggleClass('play');
        $('#light').toggleClass('play');
        $('#volumIcon').toggleClass('play');
        $('#rangeContainer').toggleClass('play');
        $('#backgroundLight').toggleClass('play');
        $('.removeRect').toggleClass('play');

        $('#MusicPlayBtn').attr('src', "images/playBtn.png");
        $('#LpImgRotate').removeClass('play');

        //점수 계산
        score = eyeScore + eyebrowScore + mouthScore;

        let audio = new Audio(audios[score - 3].audio);
        currentAudio.pause();
        currentAudio = audio;
        currentAudio.currentTime = 0;

        $("#MusicInfo h2").text(audios[score - 3].title);
        $("#MusicInfo p").text(audios[score - 3].author);

        //화면 전환시
        if($('#LpImg').hasClass('play')){
            $('#title').text('Enjoy the music!');
            $('#LpFaceColor').css('fill', '#FFFFFF');

            $('#LpFaceImg').animate( {'left': -296}, 0);
            $('.removeRect').delay(100).animate( {'opacity': 0}, 600);

            changeCharacter();
        }else{
            $('#title').text('Choose the face and listen to the music!');
            $('#content').css('background-color', '#4b4b4b');
            $('#LpFaceColor').css('fill', '#ECECEC');
            $('#Character').attr('src', 'images/character.png');

            $('#LpFaceImg').animate( {'left': -736}, 0);
            $('.removeRect').delay(100).animate( {'opacity': 1}, 100);
        };
    });


    //음악 재생 버튼 클릭
    $('#MusicPlayBtn').click(function(){
        if(currentAudio.paused == true){
            $('#LpImgRotate').addClass('play');
            currentAudio.play();
            $('#MusicPlayBtn').attr('src', "images/stopBtn.png");
            LpRotate = setInterval(function(){
                degree += 1;
                $('#LpImgRotate').css('transform', 'rotate(' + degree + 'deg)');
            }, 20);
            changeAnimation();
        }else{
            $('#LpImgRotate').removeClass('play');
            currentAudio.pause();
            $('#MusicPlayBtn').attr('src', "images/playBtn.png");
            clearTimeout(LpRotate);
            changeCharacter();
        };
    })

    //음악 진행바
    let barPercent;
    setInterval(function(){
        let barWidth = $('#MusicBar').innerWidth();
        barPercent = barWidth * currentAudio.currentTime / currentAudio.duration
        $('#MusicProgress').css('width',  barPercent)
        $('#MusicCircle').css('left', barPercent - 8 + 'px')
        if(currentAudio.currentTime == currentAudio.duration){ 
            console.log('end')
            currentAudio.paused = false;
            $('#MusicPlayBtn').attr('src', "images/playBtn.png");
            clearTimeout(LpRotate);
            changeCharacter();
        }
    }, 50);


    $('#MusicM10').click(function(){ // 10초 후
        currentAudio.currentTime -= 10
    })
    $('#MusicP10').click(function(){ // 10초 전
        currentAudio.currentTime += 10
    })

    let secSelected = 'none';
    $('.secEyebrow').click(function(){
        $('.LpSectionImg').css('transform', 'rotate(-60deg)');
        secSelected = 'eyebrow'
        $('.ring-display').css({
            'transform': 'rotate(88deg)',
            'transition': 'all 0.3s ease-in-out'
        });
        setTimeout(function () {
            $('.ring-display').css('transition', '');
        }, 300);
    })
    $('.secEye').click(function(){
        $('.LpSectionImg').css('transform', 'rotate(0deg)');
        secSelected = 'eye'
        $('.ring-display').css({
            'transform': 'rotate(-32deg)',
            'transition': 'all 0.3s ease-in-out'
        });
        setTimeout(function () {
            $('.ring-display').css('transition', '');
        }, 300);
    })
    $('.secMouth').click(function(){
        $('.LpSectionImg').css('transform', 'rotate(60deg)');
        secSelected = 'mouth';
            $('.ring-display').css({
            'transform': 'rotate(-152deg)',
            'transition': 'all 0.3s ease-in-out'
        });
        setTimeout(function () {
            $('.ring-display').css('transition', '');
        }, 300);
    });


    $('.secEyebrow').mouseover(function(){
        $('.LpSectionImgHover').css('transform', 'rotate(-60deg)');
    })
    $('.secEye').mouseover(function(){
        $('.LpSectionImgHover').css('transform', 'rotate(0deg)');
    })
    $('.secMouth').mouseover(function(){
        $('.LpSectionImgHover').css('transform', 'rotate(60deg)');
    })
    $('.secEyebrow, .secEye, .secMouth').mouseout(function(){
        if(secSelected == 'eyebrow'){
            $('.LpSectionImgHover').css('transform', 'rotate(-60deg)');
        }else if(secSelected == 'eye'){
            $('.LpSectionImgHover').css('transform', 'rotate(0deg)');
        }else if(secSelected == 'mouth'){
            $('.LpSectionImgHover').css('transform', 'rotate(60deg)');
        }
    })

    //표정 아이콘 돌리기
    let angles = [30, 30, 30, 14, 150, 150, 150, 18, -84, -86, -86, 22];

    $('.face-items li').each(function (index) {
        let angle = angles[index];

        $(this).css({
            'transform': 'rotate(' + angle + 'deg)',
            'transform-origin': 'center'
        });
    });

    let faceItems = $('.face-items li');
    let itemCount = faceItems.length;
    let radius = 460; // 원의 반지름
    let centerX = -80; // 중심 위치
    let centerY = -20;
    let angle = 360 / itemCount;

    faceItems.each(function(index) {
        let theta = (angle * index) * (Math.PI / 180);
        let x = centerX + radius * Math.cos(theta);
        let y = centerY + radius * Math.sin(theta);
        $(this).css({
            left: x + 'px',
            top: y + 'px',
        });
    });  

    let cloneElement;
    $('.face').draggable({
        revert: true,
        start: function (event, ui) {
            if (cloneElement) {
                cloneElement.remove();
                cloneElement = null;
            }
    
            cloneElement = ui.helper.clone().appendTo('#faceItemsContainer').css({
                'position': 'absolute',
                'z-index': 40,
                'margin-top': '420px'
            });
    
            $(this).data('initialPosition', {
                left: ui.helper.css('left'),
                top: ui.helper.css('top')
            });
    
            ui.helper.css('opacity', 0);
        },
        drag: function (event, ui) {
            if (!ui.helper.hasClass('picked')) {
                ui.helper.addClass('picked');
                cloneElement.addClass('cloneEdd');
            }
            cloneElement.css({
                left: ui.helper.css('left'),
                top: ui.helper.css('top')
            });
        },
        stop: function (event, ui) {
            cloneElement.remove();
            if (ui.helper.hasClass('picked')) {
                ui.helper.removeClass('picked');
    
                let initialPosition = $(this).data('initialPosition');
                $(this).css({
                    left: initialPosition.left,
                    top: initialPosition.top
                });
            }
    
            ui.helper.css('opacity', 1);
        }
    });

    //표정 바꾸기 드롭
    $('.current-eyebrow').droppable({
        drop: function(event, ui){
            cloneElement.remove();

            // 표정 이미지 바꾸기 (표정의 종류가 일치할 때만 드롭되도록)
            if ($(ui.helper).hasClass('eyebrow')){
                let droppedImage = $(ui.helper).find('img').attr('src');
                console.log(droppedImage);
                $(this).find('img').attr('src', droppedImage);
                if(droppedImage == "images/eyebrow1.png"){
                    eyebrowScore = 1;
                    console.log("1")
                }else if(droppedImage == "images/eyebrow2.png"){
                    eyebrowScore = 2;
                    console.log("2")
                }else{
                    eyebrowScore = 3;
                    console.log("3")
                }
                score = eyeScore + eyebrowScore + mouthScore;

                changeBackfill();
                changeFace();
            }
        }
    })
    $('.current-eye').droppable({
        drop: function(event, ui){
            cloneElement.remove();

            if ($(ui.helper).hasClass('eye')){
                let droppedImage = $(ui.helper).find('img').attr('src');
                console.log(droppedImage);
                $(this).find('img').attr('src', droppedImage);
                if(droppedImage == "images/eye1.png"){
                    eyeScore = 1;
                    console.log("1")
                }else if(droppedImage == "images/eye2.png"){
                    eyeScore = 2;
                    console.log("2")
                }else{
                    eyeScore = 3;
                    console.log("3")
                }
                score = eyeScore + eyebrowScore + mouthScore;

                changeBackfill();
                changeFace();
            }
        }
    })
    $('.current-mouth').droppable({
        drop: function(event, ui){
            cloneElement.remove();

            if ($(ui.helper).hasClass('mouth')){
                let droppedImage = $(ui.helper).find('img').attr('src');
                console.log(droppedImage);
                $(this).find('img').attr('src', droppedImage);
                if(droppedImage == "images/mouth1.png"){
                    mouthScore = 1;
                    console.log("1")
                }else if(droppedImage == "images/mouth2.png"){
                    mouthScore = 2;
                    console.log("2")
                }else{
                    mouthScore = 3;
                    console.log("3")
                }
                score = eyeScore + eyebrowScore + mouthScore;

                changeBackfill();
                changeFace();
            }
        }
    })

    //볼륨 및 조명 조절
    $('#volumRange').on('input', function() {
        let value = $(this).val() / 100;
        $('linearGradient stop:nth-child(2)').attr('offset', value);
        currentAudio.volume = value;

        if($(this).val() == 0){
            $('#volumIcon').attr('src', 'images/mute.png')
        }else if($(this).val() >= 50){
            $('#volumIcon').attr('src', 'images/volum2.png')
        }else{
            $('#volumIcon').attr('src', 'images/volum.png')
        }
    });


    // 도움말 버튼 클릭 시 팝업 창 보이기
    $('#openPopup').click(function() {
        $('#popup').fadeIn();
        $('#openPopup').fadeOut();
    });

    // 닫기 버튼 클릭 시 팝업 창 숨기기
    $('#closePopup').click(function() {
        $('#popup').fadeOut();
        $('#openPopup').fadeIn();
    });


    function changeFace(){
        if(3<=score && score<=5){
            $('#Character').attr('src', 'gif/changeFace1.gif');
        }else if(5<=score && score<=7){
            $('#Character').attr('src', 'gif/changeFace2.gif');
        }else if(7<=score && score<=9){
            $('#Character').attr('src', 'gif/changeFace3.gif');
        }
    }
    function changeCharacter(){
        switch(score){
            case 3:
                $('#content').css('background-color', '#FFBCB3');
                $('#Character').attr('src', 'images/character_red.png');
                break;
            case 4:
                $('#content').css('background-color', '#FFE1B3');
                $('#Character').attr('src', 'images/character_orange.png');
                break;
            case 5:
                $('#content').css('background-color', '#FFF7B3');
                $('#Character').attr('src', 'images/character_yellow.png');
                break;
            case 6:
                $('#content').css('background-color', '#B3EFB9');
                $('#Character').attr('src', 'images/character_green.png');
                break;
            case 7:
                $('#content').css('background-color', '#B3E8FF');
                $('#Character').attr('src', 'images/character_skyblue.png');
                break;
            case 8:
                $('#content').css('background-color', '#95C6FF');
                $('#Character').attr('src', 'images/character_blue.png');
                break;
            case 9:
                $('#content').css('background-color', '#D5B3FF');
                $('#Character').attr('src', 'images/character_purple.png');
                break;
        }
    }
    function changeAnimation(){
        switch(score){
            case 3:
                $('#content').css('background-color', '#FFBCB3');
                $('#Character').attr('src', 'gif/character_red.gif');
                break;
            case 4:
                $('#content').css('background-color', '#FFE1B3');
                $('#Character').attr('src', 'gif/character_orange.gif');
                break;
            case 5:
                $('#content').css('background-color', '#FFF7B3');
                $('#Character').attr('src', 'gif/character_yellow.gif');
                break;
            case 6:
                $('#content').css('background-color', '#B3EFB9');
                $('#Character').attr('src', 'gif/character_green.gif');
                break;
            case 7:
                $('#content').css('background-color', '#B3E8FF');
                $('#Character').attr('src', 'gif/character_skyblue.gif');
                break;
            case 8:
                $('#content').css('background-color', '#95C6FF');
                $('#Character').attr('src', 'gif/character_blue.gif');
                break;
            case 9:
                $('#content').css('background-color', '#D5B3FF');
                $('#Character').attr('src', 'gif/character_purple.gif');
                break;
        }
    }
    function changeBackfill(){
        switch(score){
            case 3:
                $('#backFill').css('fill', '#FFBCB3');
                break;
            case 4:
                $('#backFill').css('fill', '#FFE1B3');
                break;
            case 5:
                $('#backFill').css('fill', '#FFF7B3');
                break;
            case 6:
                $('#backFill').css('fill', '#B3EFB9');
                break;
            case 7:
                $('#backFill').css('fill', '#B3E8FF');
                break;
            case 8:
                $('#backFill').css('fill', '#95C6FF');
                break;
            case 9:
                $('#backFill').css('fill', '#D5B3FF');
                break;
        }
    }
})
