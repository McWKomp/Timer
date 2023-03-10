var display = document.querySelector(".display")

var timeBlock = document.createElement("div");
$(timeBlock).addClass("current-time");
display.append(timeBlock);

var hour = 0;
var minute = 0;
var second = 0;

var currentTime = document.createTextNode(`${hour}:${minute}:${second}`);
timeBlock.append(currentTime);

class UI {
    static dropVariables() {
        currentTime = (`${hour = 0}:${minute = 0}:${second = 0}`);
    }

    static alertShow(bg, message) {
        const div = document.createElement("div");
        const text = document.createTextNode(message);
        div.append(text);
        display.append(div);

        $(div).css({

            "background": `${bg}`,
            "color": "white",
            "borderRadius": "10px",
            "position": "absolute",
            "top": "150px",
            "right": "200px",
            "width": "200px",
            "padding": "10px",
            "fontSize": "20px"

        });

        setTimeout(() => {
            $(div).fadeOut();
        }, 3500);

    }
}

$("#submit").click(function () {

    var start = document.querySelector("#start").value;
    var end = document.querySelector("#end").value;

    start = Number(start - 1);
    end = Number(end);

    if (end <= start || isNaN(start) || isNaN(end) || start == 0 || end == 0) {
        if (end <= start) {
            UI.alertShow("#FF3D81", "Start must be smaller than end")
            return;
        }
        if (isNaN(start) || isNaN(end)) {
            UI.alertShow("#FF3D81", "Insert a number, not a string")
            return;
        }
        if (start == 0 || end == 0) {
            UI.alertShow("#FF3D81", "Insert a number")
            return;
        }

    } else {
        second = start;
    }

    function counter(startValue, endValue) {

        document.querySelector("#submit").disabled = true;
        second += 1;

        if (second >= 60) {
            while (second >= 60) {
                second -= 60;
                minute += 1;
                while (minute >= 60) {
                    minute -= 60;
                    hour += 1;
                }
            }
        } else {
            second = second;
        }

        if (startValue === endValue) {
            UI.dropVariables();
            document.querySelector("#submit").disabled = false;
            return;
        }

        var currentTime = document.createTextNode(`${hour}:${minute}:${second}`);

        timeBlock.append(currentTime);

        $(currentTime.previousSibling).remove();

        setTimeout(function () {
            counter(startValue + 1, endValue);
        }, 1000);

    }

    counter(start, end);

});