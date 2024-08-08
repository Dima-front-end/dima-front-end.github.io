document.addEventListener('DOMContentLoaded', function() {
    let modal = document.getElementById('myModal');
    let btn = document.getElementById('openModal');
    let span = document.getElementsByClassName('close')[0];

    btn.onclick = function() {
        modal.style.display = 'block';
        setTimeout(function() {
            modal.querySelector('.modal-content').style.opacity = 1;
        }, 10);
    }

    span.onclick = function() {
        modal.querySelector('.modal-content').style.opacity = 0;
        setTimeout(function() {
            modal.style.display = 'none';
        }, 500);
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.querySelector('.modal-content').style.opacity = 0;
            setTimeout(function() {
                modal.style.display = 'none';
            }, 500);
        }
    }
});