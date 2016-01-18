function draw() {
    game.draw();
    canvas.fillStyle = '#ccc';
    ball.draw(); // шарик
    btn.draw();
};

function Rect(c, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.color = c;
    this.draw = function () {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    };
};

function Circle(x, y, radius, c) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = c;
    this.draw = function () {
        canvas.fillStyle = this.color;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        canvas.fill();
    };
};

function update() {
    var ballWidth = Math.floor(ball.radius);
    /*to right*/
    if (ball.x + ballWidth >= obj.width && ball.right) {
        ball.right = false;
        ball.x -= ball.vX;
    }
    if (ball.x + ballWidth < obj.width && ball.right) {
        ball.x += ball.vX;
    }
    /*to left*/
    if (ball.x - ballWidth <= 0 && !ball.right) {
        ball.right = true;
        ball.x += ball.vX;
    }
    if (ball.x - ballWidth > 0 && !ball.right) {
        ball.x -= ball.vX;
    }
    /*to top*/
    if (ball.y - ballWidth > 0 && !ball.down) {
        ball.y -= ball.vY;
    }
    if (ball.y - ballWidth <= 0 && !ball.down) {
        ball.down = true;
    }
    if (ball.y - ballWidth <= 0) {
        ball.y += ball.vY;
    }
    /*to bottom*/
    if (ball.y + ballWidth < obj.height && ball.down) {
        ball.y += ball.vY;
    }
    if (ball.y + ballWidth >= obj.height && ball.down) {
        ball.down = false;
    }
    if (ball.y + ballWidth >= obj.height) {
        ball.y -= ball.vY;
    }

    /*top btn*/
    if (((ball.y == btn.top) || (ball.y == btn.top + 1)) &&
        ((ball.x >= btn.left ) && (ball.x <= (btn.left + btn.width)))) {
        ball.down = !ball.down;
    }
    /*bottom btn*/
    if ((((ball.y ) == (btn.top + btn.height)) || ((ball.y ) == ((btn.top + btn.height) - 1))) &&
        (((ball.x ) >= btn.left ) && ((ball.x ) <= (btn.left + btn.width)))) {
        ball.down = !ball.down;
    }
    /*left btn*/
    if ((((ball.x ) == (btn.left)) || (ball.x == ((btn.left) + 1))) &&
        (((ball.y ) >= btn.top) && ((ball.y ) <= (btn.top + btn.height)))) {
        ball.right = !ball.right;
    }
    /*right btn*/
    if ((((ball.x ) == (btn.left + btn.width)) || ((ball.x ) == ((btn.left + btn.width) - 1))) &&
        (((ball.y ) >= btn.top ) && ((ball.y ) <= (btn.top + btn.height)))) {
        ball.right = !ball.right;
    }
};

function play() {
    draw();
    update();
}

function Btn() {
    var button = $("#btn");
    this.draw = function () {
        var ballWidth = Math.floor(ball.radius);
        this.height = parseInt(button.outerHeight()) + ballWidth * 2;
        this.width = parseInt(button.outerWidth()) + ballWidth;
        this.top = parseInt(button.offset().top) - ballWidth;
        this.left = parseInt(button.offset().left) - ballWidth;
    };
    this.draw();
}

function init() {
    var height = $(window).height();
    var width = $(window).width();
    obj = document.getElementById('mycanvas');
    canvas = obj.getContext("2d");
    obj.width = width;
    obj.height = height;
    game = new Rect('#000', 0, 0, width, height);
    ball = new Circle(Math.floor(obj.width / 2), Math.floor(obj.height / 2), 12.5, "red");
    btn = new Btn();

    ball.vX = 2;
    ball.vY = 2;
    ball.right = Math.random() < 0.5 ? true : false;
    ball.down = Math.random() < 0.5 ? true : false;
    gameInterval = '';
};

window.onload = function () {
    init();
    play();
    var start = document.getElementById("btn");
    start.onclick = function () {
        clearInterval(gameInterval);
        init();
        gameInterval = setInterval(play, 1000 / 230);
        window.onresize = function (event) {
            /*resizing after started*/
            function reDraw() {
                /*obects position in percent*/
                var oldCanvWidth = obj.width / 100;
                var oldCanvHeight = obj.height / 100;
                var oldBallWidth = ball.x / oldCanvWidth;
                var oldBallHeight = ball.y / oldCanvHeight;

                var height = $(window).height();
                var width = $(window).width();
                obj.width = width;
                obj.height = height;

                /*new ball position in percent*/
                var newCanvWidth = obj.width / 100;
                var oldCanvHeight = obj.height / 100;
                ball.x = Math.floor(newCanvWidth * oldBallWidth);
                ball.y = Math.floor(oldCanvHeight * oldBallHeight);

                game.height = height;
                game.width = width;
                draw();
            };
            reDraw();
        };
    };
};

window.onresize = function (event) {
    /*resizing before started*/
    function reDraw() {
        var height = $(window).height();
        var width = $(window).width();
        /*obects position in percent*/
        var canvWidth = width / 100;
        var canvHeight = height / 100;
        obj.width = width;
        obj.height = height;
        /*new ball position in percent*/
        ball.x = Math.floor(canvWidth * 50);
        ball.y = Math.floor(canvHeight * 50);
        game.height = height;
        game.width = width;
        draw();
    };
    reDraw();
};

