export default function cycleImage() {
    let nowNumber;
    let timeoutID;
    //輪播
    $(document).ready(function() {
        moveImage(0);
        $(".button").fadeOut("slow");
        timeoutID = setTimeout(slideOnce, 3000);
    })

    //滑鼠移動到圖片後
    $(".flex-viewport").mouseenter(function() {
        $(".button").fadeIn("slow");
    });

    $(".flex-viewport").mouseleave(function() {
        $(".button").fadeOut("slow");
    })

    $(".left").click(function() {
        nowNumber--;
        if (nowNumber < 0) nowNumber = 2;

        clearTimeout(timeoutID);
        timeoutID = setTimeout(slideOnce, 3000);
        moveImage(nowNumber);
    });

    $(".right").click(function() {
        nowNumber++;
        if (nowNumber > 2) nowNumber = 0;

        clearTimeout(timeoutID);
        timeoutID = setTimeout(slideOnce, 3000);
        moveImage(nowNumber);
    });

    $(".point li").click(function () {
        let id = $(this).attr("id");
        id = id.match(/\d/);

        clearTimeout(timeoutID);
        timeoutID = setTimeout(slideOnce, 3000);
        changePoint(id);
        moveImage(id);
    });

    function slideOnce() {
        nowNumber++;
        if (nowNumber > 2) nowNumber = 0;

        clearTimeout(timeoutID);
        timeoutID = setTimeout(slideOnce, 3000);
        moveImage(nowNumber);
    }

    function moveImage(number) {
        nowNumber = number;

        let posLeft = number * -350;
        $(".slides").stop(true, false);
        $(".slides").animate({ marginLeft: posLeft + 'px' }, 1000, changePoint(number));
    }

    function changePoint(number) {
        $(".point li").css({ "background-color": "#cccccc" });
        $(".point #point-" + number).css("background-color", "black");
    }
}