var size = {
    title: 0,
    title_font: 0,
}

function setSize() {
    const w = window.innerWidth
    const h = window.innerHeight

    size.title = h * 0.08
    size.title_font = h * 0.03

    document.getElementById('art').style.fontSize = (w + h) * 0.013 + 'px'
    for (let i = 0; i < 4; ++i)
        document.getElementById('main_btn' + i).style.height = h * 0.15 + 'px'
    let page_btn = document.getElementsByClassName('page_btn');
    for (let i = 0; i < page_btn.length; ++i) {
        page_btn[i].style.width = w * 0.08 + 'px'
        page_btn[i].style.height = w * 0.08 * 0.6 + 'px'
        page_btn[i].style.fontSize = (w + h) * 0.01 + 'px'
    }
}