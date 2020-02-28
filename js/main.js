var app;

function move() {
    console.log('nove')
}

window.onload = () => {
    (() => {
        const path = {
            'title': 'data/title.txt',
            'list': "data/list.json"
        }
        function App() {
            this.stat = 0;
            this.titles = null;
            this.list = null;
            this.art = {
                page: 1,
                pageCnt: 0,
                pageArtCnt: 10
            },
                this.UI = {
                    main: document.getElementById('main_view'),
                    art: document.getElementById('art_view'),
                    event: document.getElementById('event_view'),
                    rela: document.getElementById('rela_view')
                };
        }
        App.prototype.chgUI = function (stat) {
            this.stat = stat;
            this.UI.main.style.display = 'none';
            this.UI.art.style.display = 'none';
            this.UI.event.style.display = 'none';
            this.UI.rela.style.display = 'none';
            if (this.stat < 10)
                switch (this.stat) {
                    case 0:
                        this.UI.main.style.display = 'block';
                        break;
                    case 1:
                        document.getElementById('arts').style.display = 'block';
                        document.getElementById('art').style.display = 'none';
                        this.UI.art.style.display = 'block';
                        break;
                    case 2:
                        //document.getElementById('arts').style.display = 'block';
                        //document.getElementById('art').style.display = 'none';
                        this.UI.rela.style.display = 'block';
                        break;
                }
            /*
        else {
            ~~(this.stat /= 10);
            console.log(this.stat)
            if (this.stat == 1) {
                document.getElementById('arts').style.display = 'block';
                document.getElementById('art').style.display = 'none';
            }
        }*/
        }
        setSize()
        app = new App();
        //
        document.getElementById('art_view').style.display = 'block';
        //showArt(142);
        //

        // ------------------------------
        // init
        // ------------------------------
        (async () => {
            await dataLoad(path.title).then(text => {
                app.titles = text.split('\n');
                app.titles.pop()
                app.art.pageCnt = app.titles.length / app.art.pageArtCnt % 1 == 0 ? app.titles.length / app.art.pageArtCnt : ~~(app.titles.length / app.art.pageArtCnt) + 1;
            });
            await dataLoad(path.list).then(text => app.list = JSON.parse(text));
            setEvent();
        })();



        function dataLoad(path) {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", path, true);
                xhr.onload = () => resolve(xhr.responseText);
                xhr.onerror = () => reject(xhr.statusText);
                xhr.send();
            });
        }
        // main page
        function setEvent() {
            document.getElementById('main_btn0').onclick = showTit;
            document.getElementById('page_new').onclick = setPage(1);
            document.getElementById('page_last').onclick = chgPage(-1);
            document.getElementById('page_next').onclick = chgPage(1);
            document.getElementById('page_the_last').onclick = setPage(app.art.pageCnt);
            document.getElementById('main_btn1').onclick = showRela;
            document.getElementById('back_btn').onclick = goBack;
        }
        function goBack() {
            if (app.stat < 10)
                app.chgUI(0)
            else {
                app.chgUI(~~(app.stat /= 10))
            }
        }
        // arcticle page
        function showTit() {
            var div = document.getElementById('arts')
            div.innerHTML = '';
            app.chgUI(1);
            let i = app.titles.length - (app.art.page - 1) * app.art.pageArtCnt;
            let end = app.titles.length - app.art.page * app.art.pageArtCnt;
            if (end < 0) end = 0;
            while (--i >= end) {
                let btn = document.createElement('Button');
                let div_no = document.createElement('div');
                div_no.innerHTML = app.titles[i];
                // btn.innerHTML = app.titles[i];
                btn.id = i.toString();
                btn.onclick = function () { showArt(this.id) };
                btn.style.display = 'block';
                btn.style.height = size.title + 'px';
                btn.style.fontSize = size.title_font + 'px';
                // span_no.style.position = 'relative';
                // span_no.style.left = 0 + 'px';
                div_no.style.textAlign = 'left';
                btn.append(div_no)
                div.append(btn)
            }
        }
        function showArt(id) {
            const COLOR = {
                user: '#FFFF33',
                miku: '#39c5bb',
                sa: '#FF3333',
                push: 'FFFFFF',
                speci: '#228B22',
                normal: '#cccccc'
            }
            var div = document.getElementById('art'),
                users = [];
            div.innerHTML = '';
            app.stat *= 10;
            document.getElementById('arts').style.display = 'none';
            document.getElementById('art').style.display = 'block';

            dataLoad('data/article/' + id + '.txt').then(text => {
                var arc = text.split('\n');
                //div = document.createElement('span');
                //div = document.body
                const keyw = ['作者', '看板', '標題', '時間']

                //return

                //div.appendChild(creSpan(arc[33]))


                // -----------------
                for (let i = 0; i < keyw.length; ++i) {
                    var pos1 = i == 0 ? 0 : arc[0].indexOf(keyw[i]),
                        pos2 = i == 3 ? arc[0].length : arc[0].indexOf(keyw[i + 1]),
                        str = arc[0].slice(pos1, pos2);
                    creSpan(str);
                }
                div.appendChild(document.createElement('hr'));
                div.appendChild(document.createElement('br'));
                for (let i = 1; i < arc.length; ++i)
                    creSpan(arc[i]);
                // -----------------

                for (let i = 0; i < users.length; ++i) {
                    let eles = document.getElementsByClassName(users[i]);
                    var userID = app.list.findIndex(e => e.name == users[i])
                    for (let j = 0; j < eles.length; ++j) {
                        //eles[j].onmousemove = function () { console.log(this.className); }
                        eles[j].onclick = _draw(userID);
                    }
                    function _draw(userID) {
                        return function () {
                            draw(userID);
                        }
                    }
                }
            });

            function creSpan(str) {
                if (str[0] == '※') {
                    let ele = document.createElement('span');
                    ele.innerHTML = str;
                    ele.style.color = COLOR.speci;
                    div.appendChild(ele);
                    div.appendChild(document.createElement('br'))
                    return
                }
                var cnt = 0,
                    arr = [],
                    userName = '',
                    userHasKeyw = false,
                    time = '',
                    imgSrc = '';
                if (str.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/))
                    str = str.slice(0, str.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/).index)
                if (str.match(/\b\d{1,2}\/\d{1,2}\ \d{1,2}\:\d{1,2}\b/)) {
                    time = str.slice(str.match(/\b\d{1,2}\/\d{1,2}\ \d{1,2}\:\d{1,2}\b/).index, str.length);
                    str = str.slice(0, str.match(/\b\d{1,2}\/\d{1,2}\ \d{1,2}\:\d{1,2}\b/).index)
                }
                while (cnt < str.length) {
                    let keyw1 = checkUser(str.slice(cnt, str.length)),
                        keyw2 = checkMiku(str.slice(cnt, str.length)),
                        keyw3 = checkUrl(str.slice(cnt, str.length));
                    if (keyw1 != null || keyw2 != null || keyw3 != null) {
                        if (keyw1 != null) arr.push(specSpan(0, keyw1));
                        else if (keyw2 != null) arr.push(specSpan(1, keyw2));
                        else arr.push(specSpan(2, keyw3));
                    }
                    else {
                        arr.push([
                            {
                                pos: str.length,
                                cmd: 0
                            }
                        ])
                        //div.innerHTML += str;
                        break;
                    }
                }
                cnt = 0;
                arr.forEach(e => {
                    e.forEach(f => {
                        let ele;
                        switch (f.cmd) {
                            case 0:
                                div.innerHTML = (div.innerHTML + str.slice(cnt, f.pos));
                                //span.innerHTML += str.slice(cnt, f.pos);
                                break;
                            case 1:
                                ele = document.createElement('span');
                                ele.style.color = COLOR.user;
                                if (userName != '') ele.className = userName;
                                ele.innerHTML = ele.innerHTML + str.slice(cnt, f.pos);
                                div.appendChild(ele);
                                flag = true
                                break;
                            case 2:
                                ele = document.createElement('span');
                                ele.innerHTML = ele.innerHTML + str.slice(cnt, f.pos);
                                ele.style.color = COLOR.miku;
                                if (userHasKeyw) ele.className = userName;
                                div.appendChild(ele);
                                break;
                            case 3:
                                let s = str.slice(cnt, f.pos);
                                ele = document.createElement('a');
                                //div.innerHTML += str.slice(0, keyw.pos1);
                                ele.innerHTML = s;
                                ele.href = s;
                                //str = str.slice(keyw.pos2, str.length);
                                ele.style.color = COLOR.normal;
                                div.appendChild(ele);
                                if (s.indexOf('png') != -1 || s.indexOf('jpg') != -1)
                                    imgSrc = s;
                                //span.innerHTML += str.slice(cnt, f.pos);
                                break;
                            case 4:
                                ele = document.createElement('span');
                                ele.innerHTML = str.slice(cnt, f.pos);
                                if (ele.innerHTML[0] == '推')
                                    ele.style.color = COLOR.push
                                else
                                    ele.style.color = COLOR.sa;
                                div.appendChild(ele);
                        }
                        /*
                        if(flag){
                            flag = false
                            console.log(ele.onmousemove)
                            console.log(ele.onclick)
                            console.log(document.getElementById('testss').onclick)
                        }*/

                        cnt = f.pos;
                    })
                })


                div.appendChild(document.createElement('br'))

                // if (userName != '') {
                //     let eles = document.getElementsByClassName(userName);
                //     for (let i = 0; i < eles.length; ++i) {
                //         eles[i].onmousemove = () => {
                //             console.log('move')
                //         }
                //     }
                // }
                if (time != '') {
                    let ele = document.createElement("span");
                    ele.innerHTML = ele.innerHTML + time;
                    ele.style.float = 'right';
                    div.appendChild(ele);
                }

                if (imgSrc != '') {
                    let middle_div = document.createElement('div')
                    let ele = document.createElement("img"),
                        img = new Image(),
                        cn = imgSrc;
                    ele.className = cn;
                    middle_div.className = 'middle_div'
                    div.appendChild(document.createElement("br"));
                    middle_div.append(ele)
                    div.appendChild(middle_div);
                    div.appendChild(document.createElement("br"));
                    img.onload = function () {
                        //console.log('id: ' + id + 'end')
                        //console.log(document.getElementById(id))
                        let ele = document.getElementsByClassName(cn);
                        for (let i = 0; i < ele.length; ++i) {
                            if (this.width / window.innerWidth > this.height / window.innerHeight)
                                ele[i].width = window.innerWidth * 0.7;
                            else
                                ele[i].height = window.innerHeight * 0.95;
                            ele[i].src = cn;
                        }
                    }
                    ele.src = 'img/Miku.png';
                    ele.onclick = () => console.log('img move');
                    img.src = imgSrc;
                }


                function checkUser(str) {
                    const keyws = ['推', '噓', '→'];
                    var flag = false;
                    keyws.forEach(e => {
                        if (e == str[0] && ' ' == str[1]) flag = true;
                    })
                    if (flag) {
                        userName = str.slice(2, str.indexOf(':'));
                        users.push(userName);
                        return {
                            pos1: 2,
                            pos2: str.indexOf(':')
                        };
                    }
                    return null;
                }
                function checkMiku(str) {
                    const keyws = ['初音', '咪哭', '咪苦', '39', 'miku', 'ミク'];
                    for (let i = 0; i < keyws.length; ++i) {
                        let pos = str.toLowerCase().indexOf(keyws[i]);
                        if (pos != -1)
                            return {
                                pos1: pos,
                                pos2: pos + keyws[i].length
                            };
                    }
                    return null;
                }
                function checkUrl(str) {
                    const keyws = ['https://', 'http://', '.jpg', '.png']
                    var stat = 0, pos1, pos2;
                    if (str.indexOf(keyws[0]) != -1 || str.indexOf(keyws[1]) != -1) {
                        // if(str.indexOf(keyws[0]) != -1)
                        // let i = str.indexOf(keyws[0]);
                        if (str.indexOf(keyws[0]) != -1)
                            pos1 = str.indexOf(keyws[0]);
                        else
                            pos1 = str.indexOf(keyws[1]);
                        // i += keyws[0].length;
                        /*
                        for (let j = 5; j < str.length; ++j)
                            if (str[j].match(/^[0-9a-zA-Z+:+\.?+\/]/) != null)
                                pos2 = j + 1;*/
                        pos2 = str.length;
                        //pos2 = str.match(' ') == null ? str.length : pos1 + str.match(' ').index;
                        stat = (str.indexOf(keyws[2]) != -1 || str.indexOf(keyws[3]) != -1) ? 2 : 1;
                    }
                    if (stat == 0)
                        return null;
                    return {
                        stat: stat,
                        pos1: pos1,
                        pos2: pos2
                    };
                }
                function specSpan(stat, keyw) {
                    let arr = [],
                        // 0-> normal
                        // 1-> user
                        // 2-> miku
                        // 3-> url
                        // 4-> p.s.a
                        ele;
                    switch (stat) {
                        case 0:
                            arr.push({
                                pos: keyw.pos1,
                                cmd: 4
                            })
                            ele = document.createElement('span');
                            hasMiku = checkMiku(str.slice(keyw.pos1, keyw.pos2));
                            if (hasMiku != null) {
                                userHasKeyw = true;
                                if (hasMiku.pos1 != 0) {
                                    arr.push({
                                        pos: keyw.pos1 + hasMiku.pos1,
                                        cmd: 1
                                    });
                                    arr.push({
                                        pos: keyw.pos1 + hasMiku.pos2,
                                        cmd: 2
                                    });
                                    arr.push({
                                        pos: keyw.pos2,
                                        cmd: 1
                                    });
                                }
                                else {
                                    arr.push({
                                        pos: keyw.pos1 + hasMiku.pos2,
                                        cmd: 2
                                    });
                                    arr.push({
                                        pos: keyw.pos2,
                                        cmd: 1
                                    });
                                }
                            }
                            else {
                                arr.push({
                                    pos: keyw.pos2,
                                    cmd: 1
                                });
                            }
                            break;
                        case 1:
                            arr.push({
                                pos: cnt + keyw.pos1,
                                cmd: 0
                            });
                            arr.push({
                                pos: cnt + keyw.pos2,
                                cmd: 2
                            });
                            break;
                        case 2:
                            arr.push({
                                pos: cnt + keyw.pos1,
                                cmd: 0
                            });
                            arr.push({
                                pos: cnt + keyw.pos2,
                                cmd: 3
                            });
                            break;
                    }
                    cnt += keyw.pos2;
                    return arr;
                }
            }
        }
        function setPage(val) {
            return function () {
                window.scrollTo(0, 0)
                app.art.page = val;
                showTit();
            };
        }
        function chgPage(val) {
            return function () {
                window.scrollTo(0, 0);
                if (app.art.page + val > 0 && app.art.page + val <= app.art.pageCnt)
                    app.art.page += val;
                showTit();
            };
        }
        // relation page
        function showRela() {
            var i = -1,
                div = document.getElementById('top_good'),
                div2 = document.getElementById('top_bad');

            app.chgUI(2);

            while (++i <= 4) {
                var btn = document.createElement('Button');
                btn.innerHTML = app.list[i].name;
                btn.id = i.toString();
                btn.onclick = function () { showRelaInfo(this.id) };
                div.append(btn)
            }
        }
        function showRelaInfo(id) {
            var div = document.getElementById('rela_cnt');
            div.innerHTML = '推: ' + app.list[id].val1 + '\n噓: ' + app.list[id].val2 + '\n箭頭: ' + app.list[id].val3;
            draw([app.list[id].val1, app.list[id].val2, app.list[id].val3])
        }
    })();
}
