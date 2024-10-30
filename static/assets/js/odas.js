console.log('odas variant is running');

const body = document.body;
const idOrder = document.getElementById('id_order').value;
const idGuest = document.getElementById('id-tamu').value;
const base_url = document.getElementById('url_api').value;
const scrollY = body.style.top;
body.style.position = 'fixed';
main();

function main() {
    getGrettingCard();
	fetch(base_url + '/update-views?idGuest=' + idGuest, {});
}

function getGrettingCard() {
    if (idOrder && idGuest) {
        (async () => {
            const rawResponse = await fetch(base_url + '/gretting-card?idOrder=' + idOrder, {});
            const content = await rawResponse.json();
            if (content['success']) {
                if (content.data.greeting[0]) {
                    let listMsg = '';
					document.getElementById('section-msg').style.display = 'block';
                    for (let i = 0; i < content.data.greeting.length; i++) {
                        listMsg += `
							<div class="msg-item mb-10">
								<div class="user-icon">
									<div class="circle">
										<span class="initials font-primary">${getInitial(content.data.greeting[i].name)}</span>
									</div>
								</div>
								<div class="user-content">
									<div class="font-primary fs-16">${content.data.greeting[i].name}</div>
									<div class="font-primary fs-10">${dateFormating(content.data.greeting[i].formatted_created_at)}</div>
									<div class="font-primary fs-14 fw-300">
										${content.data.greeting[i].message}
									</div>
								</div>
							</div>
						`;
                    }
                    document.getElementById('msg-area').innerHTML = listMsg;
                } else {
                    document.getElementById('section-msg').style.display = 'none';
                }
                document.getElementById('btn-kirim-disable').style.display = 'none';
                document.getElementById('btn-kirim').style.display = 'block';
            } else {
                console.log('Oops ada yg salah');
                document.getElementById('btn-kirim-disable').style.display = 'none';
                document.getElementById('btn-kirim').style.display = 'block';
            }
        })();
    }
}

function sendGretting() {
    document.getElementById('btn-kirim-disable').style.display = 'block';
    document.getElementById('btn-kirim').style.display = 'none';
    let form = {
        idOrder: idOrder,
        idUser: document.getElementById('id-tamu').value,
        name: document.getElementById('nama-tamu').value,
        message: document.getElementById('msg-tamu').value
    };
    if (form.name && form.message) {
        (async () => {
            const rawResponse = await fetch(base_url + '/gretting-card?idOrder=' + idOrder, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(form)
            });
            const content = await rawResponse.json();
            if (content['success']) {
                getGrettingCard();
                openSnackbar('Berhasil dikirim');
                document.getElementById('msg-tamu').value = '';
            } else {
                document.getElementById('btn-kirim-disable').style.display = 'none';
                document.getElementById('btn-kirim').style.display = 'block';
            }
        })();
    } else {
        console.log('lengkapi form');
        document.getElementById('btn-kirim-disable').style.display = 'none';
        document.getElementById('btn-kirim').style.display = 'block';
    }
}

function sendConfirm() {
    let form = {
        idUser: document.getElementById('id-tamu').value,
        confirm: getValueRadio('confirm'),
        numberOfGuest: document.getElementById('jml-tamu').value
    };
    if (form.confirm) {
        (async () => {
            const rawResponse = await fetch(base_url + '/confirm', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(form)
            });
            const content = await rawResponse.json();
            if (content['success']) {
                openSnackbar('Konfirmasi Berhasil');
                document.getElementById('btn-confirm').style.display = 'none';
                document.getElementById('btn-confirm-disable').style.display = 'block';
            }
        })();
    } else {
        console.log('lengkapi form');
    }
}

function getValueRadio(el) {
    var ele = document.getElementsByName(el);
    for (i = 0; i < ele.length; i++) {
        if ((ele[i].type = 'radio')) {
            if (ele[i].checked) return ele[i].value;
        }
    }
}

function getInitial(name) {
    let username = name.split(' ').slice(0, 2).join(' ');
    let parts = username.split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0];
        }
    }
    return initials.toUpperCase();
}

function dateFormating(date) {
	return date
}

function closeNav() {
    document.getElementById('cover').style.height = '0%';
    let scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
    playMusic();
}

function scrollToElement(elementId) {
    let element = document.getElementById(elementId);
    element.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    });
}

function playMusic() {
    const audio = document.querySelector('audio');
    audio.volume = 0.5;
    audio.play();
    document.getElementById('btn-play').style.display = 'block';
    document.getElementById('btn-stop').style.display = 'none';
}

function stopMusic() {
    const audio = document.querySelector('audio');
    audio.pause();
    document.getElementById('btn-play').style.display = 'none';
    document.getElementById('btn-stop').style.display = 'block';
}

function copyValue(arr) {
    navigator.clipboard.writeText(arr);
    openSnackbar('Berhasil disalin');
}

function openSnackbar(arr) {
    var x = document.getElementById('snackbar');
    x.className = 'snackbar show';
    x.innerHTML = arr;
    setTimeout(function () {
        x.className = x.className.replace('snackbar show', 'snackbar');
    }, 3000);
}
