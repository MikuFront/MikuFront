function draw(userId) {
    const user = app.list[userId];
    const data = [user.val1, user.val2, user.val3];
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    // var width = ~~((window.innerWidth + window.innerHeight) / 80);
    // canvas.width = width;
    // canvas.height = width;

    var chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['推', '箭頭', '噓'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: ['rgb(0, 220, 0)', 'rgb(220, 220, 0)', 'rgb(220, 0, 0)'],
                hoverBackgroundColor: ['rgb(0, 255, 0)', 'rgb(255, 255, 0)', 'rgb(255, 0, 0)'],
                borderColor: 'rgb(0, 0, 0)',
                data: data,
            }]
        },
    });
}

