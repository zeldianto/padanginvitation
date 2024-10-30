document.addEventListener('DOMContentLoaded', function () {
    const viewerImages = document.querySelectorAll('.viewer-image');
    viewerImages.forEach(function (image) {
        const viewer = new Viewer(image, {
            toolbar: true,
            navbar: false,
            title: false
        });
    });
});
