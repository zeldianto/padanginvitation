document.addEventListener('DOMContentLoaded', function () {
	// const gallery = new Viewer(document.getElementById('imageKu')); // ini untuk menampilkan semua gambar di dalam gallery
    const viewerImages = document.querySelectorAll('.viewer-image');
    viewerImages.forEach(function (image) {
        const viewer = new Viewer(image, {
            toolbar: true,
            navbar: false,
            title: false
        });
    });
});
