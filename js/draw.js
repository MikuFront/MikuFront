function draw(userId) {
    const user = app.list[userId];
    const val = [user.val1, user.val2, user.val3];
    var stat = [],
        index = 0;
    stat.push(val[0] * 100 / (val[0] + val[1] + val[2]))
    stat.push((val[0] + val[1]) * 100 / (val[0] + val[1] + val[2]))
    if(stat[0] == 0) stat[0] = -1;
    if(stat[1] == 0) stat[1] = -1;
    
    //stat.push(~~(val[1] * 100 / (val[0] + val[1] + val[2])));
    //stat.push(~~(val[2] * 100 / (val[0] + val[1] + val[2])));
    console.log(val)
    console.log('cnt : ' + stat)
    if(val[0] + val[1] + val[2] < 10) {
        console.log('初音不認識他')
        return;
    }
    var canvas = document.getElementById('canvas')
    var ctx = canvas.getContext('2d');
    var width = ~~((window.innerWidth + window.innerHeight) / 8);
    canvas.width = width;
    canvas.height = width;
    var r = ~~(width / 2);
    var ang = 1.48;
    var cnt = 0;


    var imgData = ctx.createImageData(width, width);
    for (let i = 0; i < imgData.data.length; i += 4) {
        imgData.data[i + 0] = 255
        imgData.data[i + 1] = 255
        imgData.data[i + 2] = 255
        imgData.data[i + 3] = 255
    }

    chgColor();
    function loop() {
        chgColor();
        /*
        if (cnt > v * 100 / (val[0] + val[1] + val[2]))
            ++stat;*/


        ctx.beginPath();
        var ang1 = (cnt == 99) ? ang * Math.PI : (ang - 0.01) * Math.PI,
            ang2 = (ang + 0.02) * Math.PI;
        ctx.arc(r, r, r, ang1, ang2);
        ctx.lineTo(r, r);
        ctx.fill();
        ang -= 0.02
        ++cnt;


        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(r, r, ~~(r / 2), 0, 2 * Math.PI);
        ctx.lineTo(r, r);
        ctx.fill();
        /*
                ctx.beginPath();
                ctx.fillStyle = "#000000";
                ctx.fillRect(r, 0, 1, 500)*/


        if (cnt >= 100) {
            clearInterval(inter);
            /*
            console.log(cnt)
            console.log(ang)
            console.log(ang1)
            console.log(ang2)*/
            return;
        }
    }
    var inter = setInterval(loop, 1);

    function chgColor() {
        if (cnt > stat[index])
            ++index;
        if (cnt > stat[index])
            ++index;
        if (index == 0)
            ctx.fillStyle = "#00ff00";
        else if (index == 1)
            ctx.fillStyle = "#ff0000";
        else
            ctx.fillStyle = "#00ffff";
    }
}