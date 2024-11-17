document.addEventListener("DOMContentLoaded", function () {
	const text = "nvitation";
	const element = document.getElementById("typing-effect");
	let index = 0;
	let isDeleting = false;

	function typeWriter() {
		if (!isDeleting && index < text.length) {
			// Menambahkan karakter satu per satu saat mengetik
			element.innerHTML += text.charAt(index);
			index++;
			setTimeout(typeWriter, 100); // Kecepatan mengetik
		} else if (isDeleting && index > 0) {
			// Menghapus karakter satu per satu saat menghapus
			element.innerHTML = text.substring(0, index - 1);
			index--;
			setTimeout(typeWriter, 50); // Kecepatan menghapus
		} else if (index === text.length) {
			// Jeda sebelum mulai menghapus
			setTimeout(() => {
				isDeleting = true;
				typeWriter();
			}, 1000); // Jeda 2 detik setelah selesai mengetik
		} else if (isDeleting && index === 0) {
			// Reset dan mulai mengetik lagi setelah selesai menghapus
			isDeleting = false;
			setTimeout(typeWriter, 500); // Jeda 0.5 detik sebelum mulai mengetik lagi
		}
	}

	typeWriter(); // Memulai efek mengetik
});