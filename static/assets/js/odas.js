console.log('odas variant is running');

const body = document.body;
const idOrder = document.getElementById('slug').value;
const idGuest = document.getElementById('id_tamu').value;
const base_url = document.getElementById('url_api').value;
const scrollY = body.style.top;
body.style.position = 'fixed';

main();

function main() {
    getGrettingCard();
	if (idGuest) {
		fetch(base_url + '/update-views?idGuest=' + idGuest, {});
	}
}

function getGrettingCard() {
    if (idOrder) {
        (async () => {
            const rawResponse = await fetch(base_url + '/gretting-card?idOrder=' + idOrder, {});
            const content = await rawResponse.json();
            if (content['success']) {
                let listMsg = '';
                if (content.data.greeting.length > 0) {
                    document.getElementById('section-msg').style.display = 'block';
                    for (let i = 0; i < content.data.greeting.length; i++) {
						console.log(content.data.greeting[i].formatted_created_at)
                        listMsg += `
                            <div class="msg-item mb-10">
                                <div class="user-icon">
                                    <div class="circle">
                                        <span class="initials font-primary">${getInitial(content.data.greeting[i].name)}</span>
                                    </div>
                                </div>
                                <div class="user-content">
                                    <div class="font-primary fs-16">${content.data.greeting[i].name}</div>
                                    <div class="font-primary fs-10">${dateFormating(content.data.greeting[i].created_at)}</div>
                                    <div class="font-primary fs-14 fw-300">
                                        ${content.data.greeting[i].message}
                                    </div>
                                </div>
                            </div>
                        `;

						if (content.data.greeting[i].reply) {
                            listMsg += `
                                <div class="msg-item-reply mb-22">
									<div class="user-icon">
										<div class="circle">
											<span class="font-primary">
												<svg class="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
													<path fill-rule="evenodd" d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z" clip-rule="evenodd"/>
												</svg>
											</span>
										</div>
									</div>
									<div class="user-content">
										<div class="font-primary fs-16">${content.data.greeting[i].mempelai}</div>
										<div class="font-primary fs-10">${dateFormating(content.data.greeting[i].updated_at)}</div>
										<div class="font-primary fs-14 fw-300">
											${content.data.greeting[i].reply}
										</div>
									</div>
								</div>
                            `;
                        }
                    }
                } else {
                    listMsg = '<div class="font-primary fs-14 fw-300">Belum ada ucapan</div>';
                    document.getElementById('section-msg').style.display = 'block';
                }
                document.getElementById('msg-area').innerHTML = listMsg;
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
        idUser: document.getElementById('id_tamu').value,
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
	const dateFormat = new Date(date);
    return dateFormat.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', dateStyle: 'long', timeStyle: 'medium' });
	// return date
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
